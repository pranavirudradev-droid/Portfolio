import { getPortfolioData, savePortfolioData } from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const portfolio = await getPortfolioData();

  if (req.method === 'GET') {
    return res.status(200).json({ about: portfolio.about || {} });
  }

  if (req.method === 'POST') {
    const { headline, intro, curiosity, imageSrc } = req.body || {};

    if (!portfolio.about) portfolio.about = {};
    if (!portfolio.about.meta) portfolio.about.meta = {};
    if (!portfolio.about.whoAmI) portfolio.about.whoAmI = {};

    if (headline) portfolio.about.meta.headline = headline;
    if (intro) portfolio.about.whoAmI.intro = intro;
    if (curiosity) portfolio.about.whoAmI.curiosity = curiosity;
    if (imageSrc !== undefined) portfolio.about.imageSrc = imageSrc;

    await savePortfolioData(portfolio);

    try {
      const fs = await import('fs');
      const path = await import('path');
      const aboutJsPath = path.resolve(process.cwd(), 'content/about/index.js');
      let aboutFile = fs.readFileSync(aboutJsPath, 'utf8');

      if (headline) aboutFile = aboutFile.replace(/headline:\s*['"`](.*?)['"`]/, `headline: ${JSON.stringify(headline)}`);
      if (intro) aboutFile = aboutFile.replace(/intro:\s*['"`](.*?)['"`]/, `intro: ${JSON.stringify(intro)}`);
      if (curiosity) aboutFile = aboutFile.replace(/curiosity:\s*['"`](.*?)['"`]/, `curiosity: ${JSON.stringify(curiosity)}`);
      if (imageSrc !== undefined) {
        if (/imageSrc:\s*(null|'[^']*'|"[^"]*")/.test(aboutFile)) {
          aboutFile = aboutFile.replace(/imageSrc:\s*(null|'[^']*'|"[^"]*")/, `imageSrc: ${imageSrc ? JSON.stringify(imageSrc) : 'null'}`);
        } else {
          aboutFile = aboutFile.replace(/export const ABOUT_CONTENT = Object\.freeze\(\{/, `export const ABOUT_CONTENT = Object.freeze({\n  imageSrc: ${imageSrc ? JSON.stringify(imageSrc) : 'null'},`);
        }
      }
      fs.writeFileSync(aboutJsPath, aboutFile, 'utf8');

      const aboutHtmlPath = path.resolve(process.cwd(), 'about/index.html');
      if (fs.existsSync(aboutHtmlPath)) {
        let aboutHtml = fs.readFileSync(aboutHtmlPath, 'utf8');
        if (imageSrc) {
          const relImg = imageSrc.startsWith('assets') ? '../' + imageSrc : imageSrc;
          aboutHtml = aboutHtml.replace(
            /<div class="image-placeholder-frame">[\s\S]*?<\/div>\s*<\/aside>/,
            `<div class="image-placeholder-frame">\n              <img src="${relImg}" alt="Pranavi Rudradev" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" />\n            </div>\n          </aside>`
          );
        } else if (imageSrc === null) {
          const placeholderSvg = `<div class="image-placeholder-frame">\n              <div class="image-placeholder-inner" role="img" aria-label="Portrait photograph placeholder">\n                <svg class="placeholder-sample-icon" width="76" height="56" viewBox="0 0 76 56" fill="none" stroke="#F5EFC6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\n                  <circle cx="56" cy="16" r="7" />\n                  <polygon points="8,48 34,16 60,48" />\n                  <polygon points="34,48 50,26 66,48" />\n                </svg>\n              </div>\n            </div>\n          </aside>`;
          aboutHtml = aboutHtml.replace(
            /<div class="image-placeholder-frame">[\s\S]*?<\/div>\s*<\/aside>/,
            placeholderSvg
          );
        }
        fs.writeFileSync(aboutHtmlPath, aboutHtml, 'utf8');
      }
    } catch (_) {}

    return res.status(200).json({
      success: true,
      message: 'About page updated successfully',
      about: portfolio.about
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
