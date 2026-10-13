import { PROJECTS } from '../content/projects/index.js';
import { EXPERIENCES } from '../content/experience/index.js';
import { OBSERVATORY_ENTRIES, OBSERVATORY_DOCUMENTARY } from '../content/observatory/index.js';
import { ABOUT_CONTENT } from '../content/about/index.js';
import { HOMEPAGE_IDENTITY, HERO_STATEMENT, HOME_IMAGES } from '../src/config/homepage.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  return res.status(200).json({
    projects: PROJECTS || [],
    experiences: EXPERIENCES || [],
    observatory: OBSERVATORY_ENTRIES || [],
    documentary: OBSERVATORY_DOCUMENTARY || {},
    about: ABOUT_CONTENT || {},
    homepage: {
      identity: HOMEPAGE_IDENTITY || {},
      hero: HERO_STATEMENT || {},
      images: HOME_IMAGES || []
    }
  });
}
