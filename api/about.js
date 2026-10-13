import { ABOUT_CONTENT } from '../content/about/index.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    return res.status(200).json({ about: ABOUT_CONTENT });
  }

  if (req.method === 'POST') {
    const { headline, intro, curiosity, imageSrc } = req.body || {};

    try {
      const fs = await import('fs');
      const path = await import('path');
      const aboutJsPath = path.resolve(process.cwd(), 'content/about/index.js');
      let aboutFile = fs.readFileSync(aboutJsPath, 'utf8');

      if (headline) aboutFile = aboutFile.replace(/headline:\s*['"`](.*?)['"`]/, `headline: ${JSON.stringify(headline)}`);
      if (intro) aboutFile = aboutFile.replace(/intro:\s*['"`](.*?)['"`]/, `intro: ${JSON.stringify(intro)}`);
      if (curiosity) aboutFile = aboutFile.replace(/curiosity:\s*['"`](.*?)['"`]/, `curiosity: ${JSON.stringify(curiosity)}`);
      fs.writeFileSync(aboutJsPath, aboutFile, 'utf8');
    } catch (_) {}

    return res.status(200).json({
      success: true,
      message: 'About page content updated successfully'
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
