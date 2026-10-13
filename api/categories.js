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
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ categories: UPLOAD_CATEGORIES });
}
