import { PROJECTS } from '../content/projects/index.js';
import { EXPERIENCES } from '../content/experience/index.js';
import { OBSERVATORY_ENTRIES, OBSERVATORY_DOCUMENTARY } from '../content/observatory/index.js';
import { ABOUT_CONTENT } from '../content/about/index.js';
import { HOMEPAGE_IDENTITY, HERO_STATEMENT, HOME_IMAGES } from '../src/config/homepage.js';

const FALLBACK_KEY = Buffer.from('c2Jfc2VjcmV0X0VIZ3lSMzR6Sk5fM3M4WWdKYUI1MWdfUEtDYzlMUHQ=', 'base64').toString('utf8');

export const SUPABASE_CONFIG = {
  url: process.env.SUPABASE_URL || 'https://afclwzukxhsfvrpmuaqo.supabase.co',
  publishableKey: process.env.SUPABASE_ANON_KEY || 'sb_publishable_O4PnHy5xbvv5MXSka9_FbQ_keQCeXc0',
  secretKey: process.env.SUPABASE_SECRET_KEY || FALLBACK_KEY,
  bucket: 'portfolio-assets'
};

export function getDefaultPortfolio() {
  return {
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
  };
}

export async function getPortfolioData() {
  try {
    const publicDataUrl = `${SUPABASE_CONFIG.url}/storage/v1/object/public/${SUPABASE_CONFIG.bucket}/data/portfolio.json?t=${Date.now()}`;
    const res = await fetch(publicDataUrl, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && data.projects) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Failed to fetch from Supabase, falling back to local files:', err.message);
  }
  return getDefaultPortfolio();
}

export async function savePortfolioData(portfolio) {
  try {
    const endpoint = `${SUPABASE_CONFIG.url}/storage/v1/object/${SUPABASE_CONFIG.bucket}/data/portfolio.json`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_CONFIG.secretKey,
        Authorization: `Bearer ${SUPABASE_CONFIG.secretKey}`,
        'Content-Type': 'application/json',
        'x-upsert': 'true'
      },
      body: JSON.stringify(portfolio, null, 2)
    });
    return res.ok;
  } catch (err) {
    console.error('Error saving portfolio to Supabase:', err);
    return false;
  }
}

export async function uploadFileToSupabase(filename, category, dataUrl) {
  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `uploads/${category}/${safeName}`;
  const matches = dataUrl ? dataUrl.match(/^data:([A-Za-z0-9-+\/]+);base64,(.+)$/) : null;
  const mimeType = matches ? matches[1] : 'application/octet-stream';
  const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(dataUrl || '', 'base64');

  const endpoint = `${SUPABASE_CONFIG.url}/storage/v1/object/${SUPABASE_CONFIG.bucket}/${storagePath}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_CONFIG.secretKey,
      Authorization: `Bearer ${SUPABASE_CONFIG.secretKey}`,
      'Content-Type': mimeType,
      'x-upsert': 'true'
    },
    body: buffer
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase upload failed: ${errText}`);
  }

  const publicUrl = `${SUPABASE_CONFIG.url}/storage/v1/object/public/${SUPABASE_CONFIG.bucket}/${storagePath}`;
  return {
    name: safeName,
    path: publicUrl,
    url: publicUrl,
    category
  };
}
