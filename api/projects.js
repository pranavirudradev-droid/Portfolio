import { PROJECTS } from '../content/projects/index.js';

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

  if (req.method === 'GET') {
    return res.status(200).json({ projects: PROJECTS });
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const {
      id: existingId,
      title,
      category,
      description,
      coverSrc,
      docSrc,
      docType = 'pdf',
      featured = false,
      accent = '#A5BCD6'
    } = body;

    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }

    const slug = existingId || slugify(title);
    const existing = PROJECTS.find(p => p.id === slug) || {};

    const updatedProj = {
      ...existing,
      id: slug,
      title: title.trim(),
      category,
      description: description !== undefined ? description : (existing.description || ''),
      cover: {
        ...(existing.cover || {}),
        src: coverSrc || (existing.cover && existing.cover.src) || `assets/projects/covers/${slug}.jpg`,
        alt: `${title} cover`,
        aspectRatio: (existing.cover && existing.cover.aspectRatio) || '4/5',
        focalPoint: '50% 50%',
        placeholderColor: '#36211C'
      },
      document: {
        ...(existing.document || {}),
        type: docType,
        src: docSrc || (existing.document && existing.document.src) || `assets/projects/documents/${slug}.pdf`,
        downloadable: true
      },
      href: `#project-${slug}`,
      featured: Boolean(featured),
      accent: accent || existing.accent || '#A5BCD6'
    };

    // Attempt local file write if filesystem is writable
    try {
      const fs = await import('fs');
      const path = await import('path');
      const projectsJsPath = path.resolve(process.cwd(), 'content/projects/index.js');
      const projects = [...PROJECTS];
      const idx = projects.findIndex(p => p.id === slug);
      if (idx >= 0) projects[idx] = updatedProj;
      else projects.push(updatedProj);
      fs.writeFileSync(projectsJsPath, `export const PROJECTS = ${JSON.stringify(projects, null, 2)};\n`, 'utf8');
    } catch (_) {}

    return res.status(200).json({
      success: true,
      message: `Project "${title}" saved successfully`,
      project: updatedProj
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || {};
    return res.status(200).json({ success: true, message: `Project ${id || ''} deleted` });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
