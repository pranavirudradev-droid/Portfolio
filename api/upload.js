import { uploadFileToSupabase } from './_supabase.js';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
};

const CATEGORY_PATHS = {
  'projects-covers': 'assets/projects/covers',
  'projects-documents': 'assets/projects/documents',
  'experience-documents': 'assets/experience/documents',
  'observatory-images': 'assets/observatory/images',
  'observatory-videos': 'assets/observatory/videos',
  'home': 'assets/home',
  'about': 'assets/about',
  'general': 'assets/images/ui'
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { filename, category, dataUrl } = req.body || {};
    if (!filename || !category) {
      return res.status(400).json({ error: 'Missing filename or category' });
    }

    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const folder = CATEGORY_PATHS[category] || `assets/${category.replace('-', '/')}`;
    const relPath = `${folder}/${safeName}`;

    let supabaseFile = null;
    try {
      supabaseFile = await uploadFileToSupabase(safeName, category, dataUrl);
    } catch (sbErr) {
      console.warn('Supabase upload warning:', sbErr.message);
    }

    // Attempt local file write if filesystem is writable (local dev)
    try {
      const fs = await import('fs');
      const path = await import('path');
      const targetDir = path.resolve(process.cwd(), folder);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      if (dataUrl) {
        const matches = dataUrl.match(/^data:([A-Za-z0-9-+\/]+);base64,(.+)$/);
        const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(dataUrl, 'base64');
        fs.writeFileSync(path.join(targetDir, safeName), buffer);
      }
    } catch (_) {}

    const fileUrl = supabaseFile?.url || dataUrl || `/${relPath}`;

    return res.status(200).json({
      success: true,
      message: `File "${safeName}" uploaded successfully`,
      file: {
        name: safeName,
        path: fileUrl,
        url: fileUrl,
        category
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
}
