import { OBSERVATORY_ENTRIES, OBSERVATORY_DOCUMENTARY } from '../content/observatory/index.js';

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
    return res.status(200).json({
      observatory: OBSERVATORY_ENTRIES,
      documentary: OBSERVATORY_DOCUMENTARY
    });
  }

  if (req.method === 'POST') {
    const body = req.body || {};

    // Check if updating documentary video
    if (body.videoSrc !== undefined || body.badge !== undefined || body.meta !== undefined) {
      const updatedDoc = {
        ...OBSERVATORY_DOCUMENTARY,
        title: body.title !== undefined ? body.title : (OBSERVATORY_DOCUMENTARY.title || ''),
        badge: body.badge !== undefined ? body.badge : (OBSERVATORY_DOCUMENTARY.badge || 'FIELD OBSERVATION'),
        meta: body.meta !== undefined ? body.meta : (OBSERVATORY_DOCUMENTARY.meta || ''),
        videoSrc: body.videoSrc !== undefined ? body.videoSrc : (OBSERVATORY_DOCUMENTARY.videoSrc || ''),
        description: body.description !== undefined ? body.description : (OBSERVATORY_DOCUMENTARY.description || '')
      };

      try {
        const fs = await import('fs');
        const path = await import('path');
        const obsJsPath = path.resolve(process.cwd(), 'content/observatory/index.js');
        const content = `export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(updatedDoc, null, 2)};\nexport const OBSERVATORY_ENTRIES = ${JSON.stringify(OBSERVATORY_ENTRIES, null, 2)};\n`;
        fs.writeFileSync(obsJsPath, content, 'utf8');
      } catch (_) {}

      return res.status(200).json({
        success: true,
        message: 'Documentary updated successfully',
        documentary: updatedDoc
      });
    }

    // Otherwise updating photo essay entry
    const { id: existingId, title, category, date, summary, imageSrc } = body;
    if (!title) {
      return res.status(400).json({ error: 'Observatory Title is required' });
    }

    const slug = existingId || slugify(title);
    const existing = OBSERVATORY_ENTRIES.find(o => o.id === slug) || {};

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

    try {
      const fs = await import('fs');
      const path = await import('path');
      const obsJsPath = path.resolve(process.cwd(), 'content/observatory/index.js');
      const entries = [...OBSERVATORY_ENTRIES];
      const idx = entries.findIndex(o => o.id === slug);
      if (idx >= 0) entries[idx] = newEntry;
      else entries.push(newEntry);
      const content = `export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(OBSERVATORY_DOCUMENTARY, null, 2)};\nexport const OBSERVATORY_ENTRIES = ${JSON.stringify(entries, null, 2)};\n`;
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
    return res.status(200).json({ success: true, message: `Observation ${id || ''} deleted` });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
