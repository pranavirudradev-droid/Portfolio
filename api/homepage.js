import { getPortfolioData, savePortfolioData } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const portfolio = await getPortfolioData();

  if (req.method === 'GET') {
    return res.status(200).json(portfolio.homepage || {});
  }

  if (req.method === 'POST') {
    const { slotId, imageSrc, heroStatement, tagline } = req.body || {};

    if (!portfolio.homepage) portfolio.homepage = {};
    if (!portfolio.homepage.hero) portfolio.homepage.hero = {};
    if (!portfolio.homepage.images) portfolio.homepage.images = [];

    if (slotId) {
      const s = portfolio.homepage.images.find(x => x.id === slotId);
      if (s) {
        s.src = imageSrc || null;
      } else {
        portfolio.homepage.images.push({ id: slotId, src: imageSrc || null });
      }
    }

    if (heroStatement !== undefined) {
      portfolio.homepage.hero.statement = heroStatement;
    }
    if (tagline !== undefined) {
      portfolio.homepage.hero.tagline = tagline;
    }

    await savePortfolioData(portfolio);

    try {
      const fs = await import('fs');
      const path = await import('path');
      const homeJsPath = path.resolve(process.cwd(), 'src/config/homepage.js');
      let homeFile = fs.readFileSync(homeJsPath, 'utf8');

      if (slotId) {
        if (imageSrc) {
          const relImg = imageSrc.startsWith('http') ? imageSrc : (imageSrc.startsWith('/') ? imageSrc : '/' + imageSrc);
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
      message: imageSrc ? 'Homepage updated successfully' : `Photo removed from ${slotId}`,
      homepage: portfolio.homepage
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
