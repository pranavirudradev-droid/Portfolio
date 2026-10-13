import { getPortfolioData, savePortfolioData } from './_supabase.js';

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const portfolio = await getPortfolioData();

  if (req.method === 'GET') {
    return res.status(200).json({ experiences: portfolio.experiences || [] });
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const {
      id: existingId,
      title,
      organisation,
      orgSub = 'BRAND STRATEGY',
      category = 'BRAND STRATEGY',
      period,
      location,
      shortDescription,
      bulletPoints = [],
      documentSrc,
      imageSrc,
      tags = []
    } = body;

    if (!title || !organisation) {
      return res.status(400).json({ error: 'Role Title and Organisation are required' });
    }

    const orgMatch = (portfolio.experiences || []).find(e => e.organisation && e.organisation.toLowerCase().trim() === organisation.toLowerCase().trim());
    const slug = existingId || (orgMatch ? orgMatch.id : slugify(organisation));
    const existing = (portfolio.experiences || []).find(e => e.id === slug) || {};

    const updatedExp = {
      ...existing,
      id: slug,
      index: existing.index || '01',
      title: title.trim(),
      organisation: organisation.trim(),
      orgDisplay: organisation.trim().toUpperCase(),
      orgSub: (orgSub || category).trim().toUpperCase(),
      category: (category || orgSub).trim().toUpperCase(),
      period: period || existing.period || 'Present',
      location: location || existing.location || 'Bengaluru',
      type: documentSrc ? 'document' : (existing.type || 'narrative'),
      ...(documentSrc ? {
        document: {
          type: (documentSrc && documentSrc.toLowerCase().includes('.pdf')) ? 'pdf' : 'presentation',
          src: documentSrc,
          title: `${organisation} Documentation`,
          downloadable: true
        }
      } : (existing.document ? { document: existing.document } : {})),
      shortDescription: shortDescription !== undefined ? shortDescription : (existing.shortDescription || ''),
      bulletPoints: Array.isArray(bulletPoints) ? bulletPoints : (bulletPoints ? bulletPoints.split('\n').filter(Boolean) : (existing.bulletPoints || [])),
      image: {
        src: imageSrc || (existing.image && existing.image.src) || `assets/experience/documents/${slug}-cover.jpg`,
        alt: `${organisation} documentation`
      },
      accent: '#A5BCD6',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim().toUpperCase()).filter(Boolean) : (existing.tags || ['BRAND STRATEGY']))
    };

    const experiences = [...(portfolio.experiences || [])];
    const idx = experiences.findIndex(e => e.id === slug);
    if (idx >= 0) experiences[idx] = updatedExp;
    else experiences.push(updatedExp);
    portfolio.experiences = experiences;

    await savePortfolioData(portfolio);

    try {
      const fs = await import('fs');
      const path = await import('path');
      const expJsPath = path.resolve(process.cwd(), 'content/experience/index.js');
      fs.writeFileSync(expJsPath, `export const EXPERIENCES = ${JSON.stringify(experiences, null, 2)};\n`, 'utf8');
    } catch (_) {}

    return res.status(200).json({
      success: true,
      message: `Experience "${organisation}" saved successfully`,
      experience: updatedExp
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || {};
    if (id) {
      portfolio.experiences = (portfolio.experiences || []).filter(e => e.id !== id);
      await savePortfolioData(portfolio);
      try {
        const fs = await import('fs');
        const path = await import('path');
        const expJsPath = path.resolve(process.cwd(), 'content/experience/index.js');
        fs.writeFileSync(expJsPath, `export const EXPERIENCES = ${JSON.stringify(portfolio.experiences, null, 2)};\n`, 'utf8');
      } catch (_) {}
    }
    return res.status(200).json({ success: true, message: `Experience ${id || ''} deleted` });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
