import { HOMEPAGE_IDENTITY, HERO_STATEMENT, HOME_IMAGES } from '../src/config/homepage.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method === 'GET') {
    return res.status(200).json({
      identity: HOMEPAGE_IDENTITY,
      hero: HERO_STATEMENT,
      images: HOME_IMAGES
    });
  }

  if (req.method === 'POST') {
    const { slotId, imageSrc, heroStatement, tagline } = req.body || {};

    try {
      const fs = await import('fs');
      const path = await import('path');
      const homeJsPath = path.resolve(process.cwd(), 'src/config/homepage.js');
      let homeFile = fs.readFileSync(homeJsPath, 'utf8');

      if (slotId) {
        if (imageSrc) {
          const relImg = imageSrc.startsWith('/') ? imageSrc : '/' + imageSrc;
          const slotRegex = new RegExp(`(id:\\s*['"]${slotId}['"],[\\s\\S]*?src:\\s*)(null|'[^']*'|"[^"]*")`);
          if (slotRegex.test(homeFile)) {
            homeFile = homeFile.replace(slotRegex, `$1'${relImg}'`);
          }
        } else {
          const slotRegex = new RegExp(`(id:\\s*['"]${slotId}['"],[\\s\\S]*?src:\\s*)('[^']*'|"[^"]*"|null)`);
          if (slotRegex.test(homeFile)) {
            homeFile = homeFile.replace(slotRegex, `$1null`);
          }
        }
      }

      if (heroStatement) {
        homeFile = homeFile.replace(/statement:\s*['"`](.*?)['"`]/, `statement: ${JSON.stringify(heroStatement)}`);
      }
      if (tagline) {
        homeFile = homeFile.replace(/tagline:\s*['"`](.*?)['"`]/, `tagline: ${JSON.stringify(tagline)}`);
      }

      fs.writeFileSync(homeJsPath, homeFile, 'utf8');
    } catch (_) {}

    return res.status(200).json({
      success: true,
      message: imageSrc ? 'Homepage updated successfully' : `Photo removed from ${slotId}`
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
