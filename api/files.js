import fs from 'fs';
import path from 'path';

const UPLOAD_CATEGORIES = [
  { id: 'projects-covers', label: 'Projects — Cover Images', path: 'assets/projects/covers', type: 'image' },
  { id: 'projects-documents', label: 'Projects — Documents & PDFs', path: 'assets/projects/documents', type: 'document' },
  { id: 'experience-documents', label: 'Experience — Documents & Presentations', path: 'assets/experience/documents', type: 'document' },
  { id: 'observatory-images', label: 'The Observatory — Photography & Images', path: 'assets/observatory/images', type: 'image' },
  { id: 'observatory-videos', label: 'The Observatory — Video Clips', path: 'assets/observatory/videos', type: 'video' },
  { id: 'home', label: 'Homepage — Photos & Fragments', path: 'assets/home', type: 'image' },
  { id: 'about', label: 'About Me — Photos & Media', path: 'assets/about', type: 'image' },
  { id: 'general', label: 'General UI Assets', path: 'assets/images/ui', type: 'image' }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    return res.status(403).json({
      error: 'File modifications are disabled in deployed cloud environments. Run "npm start" locally to upload or delete files.'
    });
  }

  const { category: catId } = req.query || {};
  const cat = UPLOAD_CATEGORIES.find(c => c.id === catId);
  if (!cat) {
    return res.status(400).json({ error: 'Invalid or missing category', files: [] });
  }

  const dir = path.resolve(process.cwd(), cat.path);
  if (!fs.existsSync(dir)) {
    return res.status(200).json({ files: [] });
  }

  try {
    const files = fs.readdirSync(dir).map(name => {
      try {
        const stats = fs.statSync(path.join(dir, name));
        return { name, path: `${cat.path}/${name}`, size: stats.size, mtime: stats.mtime };
      } catch (_) {
        return { name, path: `${cat.path}/${name}`, size: 0, mtime: new Date() };
      }
    });
    return res.status(200).json({ files });
  } catch (err) {
    return res.status(500).json({ error: err.message, files: [] });
  }
}
