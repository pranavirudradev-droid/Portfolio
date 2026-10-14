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
    return res.status(200).json({
      observatory: portfolio.observatory || [],
      documentary: portfolio.documentary || {}
    });
  }

  if (req.method === 'POST') {
    const body = req.body || {};

    // Documentary video update
    if (body.videoSrc !== undefined || body.badge !== undefined || body.meta !== undefined) {
      const existingDoc = portfolio.documentary || {};
      const updatedDoc = {
        ...existingDoc,
        title: body.title !== undefined ? body.title : (existingDoc.title || ''),
        badge: body.badge !== undefined ? body.badge : (existingDoc.badge || 'FIELD OBSERVATION'),
        meta: body.meta !== undefined ? body.meta : (existingDoc.meta || ''),
        videoSrc: body.videoSrc !== undefined ? body.videoSrc : (existingDoc.videoSrc || ''),
        description: body.description !== undefined ? body.description : (existingDoc.description || '')
      };

      portfolio.documentary = updatedDoc;
      await savePortfolioData(portfolio);

      try {
        const fs = await import('fs');
        const path = await import('path');
        const obsJsPath = path.resolve(process.cwd(), 'content/observatory/index.js');
        const content = `export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(updatedDoc, null, 2)};\nexport const OBSERVATORY_ENTRIES = ${JSON.stringify(portfolio.observatory || [], null, 2)};\nexport const OBSERVATORY_PHOTOS = OBSERVATORY_ENTRIES;\n`;
        fs.writeFileSync(obsJsPath, content, 'utf8');
      } catch (_) {}

      return res.status(200).json({
        success: true,
        message: 'Documentary updated successfully',
        documentary: updatedDoc
      });
    }

    // Photo essay entry update
    const { id: existingId, title, category, date, summary, imageSrc } = body;
    if (!title) {
      return res.status(400).json({ error: 'Observatory Title is required' });
    }

    const slug = body.slotId || existingId || (title ? slugify(title) : 'pic-1');
    const existing = (portfolio.observatory || []).find(o => o.id === slug) || {};

    const newEntry = {
      ...existing,
      id: slug,
      title: title.trim(),
      category: category || existing.category || 'PHOTOGRAPHY',
      date: date || existing.date || '2024',
      format: 'photo-essay',
      summary: summary || existing.summary || '',
      media: {
        type: 'image',
        src: imageSrc || (existing.media && existing.media.src) || `assets/observatory/images/${slug}.jpg`,
        aspectRatio: '4/5',
        alt: title
      },
      accent: '#4D0E12'
    };

    const entries = [...(portfolio.observatory || [])];
    const idx = entries.findIndex(o => o.id === slug);
    if (idx >= 0) entries[idx] = newEntry;
    else entries.push(newEntry);
    portfolio.observatory = entries;

    await savePortfolioData(portfolio);

    try {
      const fs = await import('fs');
      const path = await import('path');
      const obsJsPath = path.resolve(process.cwd(), 'content/observatory/index.js');
      const content = `export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(portfolio.documentary || {}, null, 2)};\nexport const OBSERVATORY_ENTRIES = ${JSON.stringify(entries, null, 2)};\nexport const OBSERVATORY_PHOTOS = OBSERVATORY_ENTRIES;\n`;
      fs.writeFileSync(obsJsPath, content, 'utf8');
    } catch (_) {}

    return res.status(200).json({
      success: true,
      message: `Observation "${title}" saved successfully`,
      entry: newEntry
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || {};
    if (id) {
      portfolio.observatory = (portfolio.observatory || []).filter(o => o.id !== id);
      await savePortfolioData(portfolio);
      try {
        const fs = await import('fs');
        const path = await import('path');
        const obsJsPath = path.resolve(process.cwd(), 'content/observatory/index.js');
        const content = `export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(portfolio.documentary || {}, null, 2)};\nexport const OBSERVATORY_ENTRIES = ${JSON.stringify(portfolio.observatory, null, 2)};\n`;
        fs.writeFileSync(obsJsPath, content, 'utf8');
      } catch (_) {}
    }
    return res.status(200).json({ success: true, message: `Observation ${id || ''} deleted` });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
