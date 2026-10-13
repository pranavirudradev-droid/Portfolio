/**
 * PRANAVI RUDRADEV PORTFOLIO — COMPREHENSIVE ADMIN SERVER & API
 * Zero external dependencies — runs directly with standard Node.js
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 8000;

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

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml; charset=UTF-8',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon'
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 60 * 1024 * 1024) { // 60MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Ensure all upload directories exist
for (const cat of UPLOAD_CATEGORIES) {
  const fullPath = path.join(ROOT_DIR, cat.path);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // ==========================================
  // API ROUTING
  // ==========================================
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Get Categories
      if (pathname === '/api/categories' && req.method === 'GET') {
        return sendJson(res, 200, { categories: UPLOAD_CATEGORIES });
      }

      // 2. Upload File
      if (pathname === '/api/upload' && req.method === 'POST') {
        const body = await parseBody(req);
        const { filename, category, dataUrl } = body;

        if (!filename || !category || !dataUrl) {
          return sendJson(res, 400, { error: 'Missing filename, category, or dataUrl' });
        }

        const cat = UPLOAD_CATEGORIES.find(c => c.id === category);
        if (!cat) {
          return sendJson(res, 400, { error: 'Unknown category: ' + category });
        }

        const safeName = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
        const targetDir = path.join(ROOT_DIR, cat.path);
        fs.mkdirSync(targetDir, { recursive: true });

        const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const buffer = matches ? Buffer.from(matches[2], 'base64') : Buffer.from(dataUrl, 'base64');

        const filePath = path.join(targetDir, safeName);
        fs.writeFileSync(filePath, buffer);

        const relativePath = `${cat.path}/${safeName}`;
        return sendJson(res, 200, {
          success: true,
          message: 'File uploaded successfully',
          file: {
            name: safeName,
            path: relativePath,
            url: `/${relativePath}`,
            category: cat.id
          }
        });
      }

      // 3. Delete File
      if (pathname === '/api/files' && (req.method === 'DELETE' || req.method === 'POST')) {
        const body = req.method === 'DELETE' 
          ? { filePath: parsedUrl.searchParams.get('filePath') } 
          : await parseBody(req);
        const targetRelPath = body.filePath;

        if (!targetRelPath) {
          return sendJson(res, 400, { error: 'File path required' });
        }

        const resolvedTarget = path.resolve(ROOT_DIR, targetRelPath);
        if (!resolvedTarget.startsWith(path.resolve(ROOT_DIR, 'assets'))) {
          return sendJson(res, 403, { error: 'Forbidden: Can only delete files inside assets/' });
        }

        if (fs.existsSync(resolvedTarget)) {
          fs.unlinkSync(resolvedTarget);
          return sendJson(res, 200, { success: true, message: 'File deleted successfully' });
        } else {
          return sendJson(res, 404, { error: 'File not found on disk' });
        }
      }

      // 4. List Files for Category
      if (pathname === '/api/files' && req.method === 'GET') {
        const catId = parsedUrl.searchParams.get('category');
        const cat = UPLOAD_CATEGORIES.find(c => c.id === catId);
        if (!cat) return sendJson(res, 400, { error: 'Invalid category' });
        const dir = path.join(ROOT_DIR, cat.path);
        if (!fs.existsSync(dir)) return sendJson(res, 200, { files: [] });
        const files = fs.readdirSync(dir).map(name => {
          const stats = fs.statSync(path.join(dir, name));
          return { name, path: `${cat.path}/${name}`, size: stats.size, mtime: stats.mtime };
        });
        return sendJson(res, 200, { files });
      }

      // 5. Get Complete Portfolio Content
      if (pathname === '/api/content' && req.method === 'GET') {
        const [projModule, expModule, obsModule, aboutModule, homeModule] = await Promise.all([
          import(`file://${path.join(ROOT_DIR, 'content/projects/index.js')}?t=${Date.now()}`),
          import(`file://${path.join(ROOT_DIR, 'content/experience/index.js')}?t=${Date.now()}`),
          import(`file://${path.join(ROOT_DIR, 'content/observatory/index.js')}?t=${Date.now()}`),
          import(`file://${path.join(ROOT_DIR, 'content/about/index.js')}?t=${Date.now()}`),
          import(`file://${path.join(ROOT_DIR, 'src/config/homepage.js')}?t=${Date.now()}`)
        ]);

        return sendJson(res, 200, {
          projects: projModule.PROJECTS || [],
          experiences: expModule.EXPERIENCES || [],
          observatory: obsModule.OBSERVATORY_ENTRIES || [],
          documentary: obsModule.OBSERVATORY_DOCUMENTARY || {},
          about: aboutModule.ABOUT_CONTENT || {},
          homepage: {
            identity: homeModule.HOMEPAGE_IDENTITY || {},
            hero: homeModule.HERO_STATEMENT || {},
            images: homeModule.HOME_IMAGES || []
          }
        });
      }

      // 6. Save / Update Project
      if (pathname === '/api/projects' && req.method === 'POST') {
        const body = await parseBody(req);
        const {
          id: existingId,
          title,
          category,
          description,
          coverSrc,
          docSrc,
          docType = 'pdf',
          href,
          featured = false,
          accent = '#A5BCD6'
        } = body;

        if (!title || !category) {
          return sendJson(res, 400, { error: 'Project Title and Category are required' });
        }

        const slug = existingId || slugify(title);
        const projModule = await import(`file://${path.join(ROOT_DIR, 'content/projects/index.js')}?t=${Date.now()}`);
        const projects = [...(projModule.PROJECTS || [])];

        const existingIdx = projects.findIndex(p => p.id === slug);
        const baseProject = existingIdx >= 0 ? projects[existingIdx] : {};

        const updatedProj = {
          ...baseProject,
          id: slug,
          title: title.trim(),
          category: category,
          description: description !== undefined ? description : (baseProject.description || ''),
          cover: {
            ...(baseProject.cover || {}),
            src: coverSrc || (baseProject.cover && baseProject.cover.src) || `assets/projects/covers/${slug}.jpg`,
            alt: `${title} cover`,
            aspectRatio: (baseProject.cover && baseProject.cover.aspectRatio) || '4/5',
            focalPoint: '50% 50%',
            placeholderColor: '#36211C'
          },
          document: {
            ...(baseProject.document || {}),
            type: docType || (baseProject.document && baseProject.document.type) || 'pdf',
            src: docSrc || (baseProject.document && baseProject.document.src) || `assets/projects/documents/${slug}.pdf`,
            pageCount: null,
            downloadable: true
          },
          href: href || baseProject.href || `#project-${slug}`,
          featured: Boolean(featured),
          homepagePosition: baseProject.homepagePosition || { colStart: 1, colSpan: 6, topOffset: '20px', align: 'start' },
          homepageSize: baseProject.homepageSize || 'standard',
          rotation: baseProject.rotation !== undefined ? baseProject.rotation : 0.5,
          zIndex: baseProject.zIndex || 2,
          parallax: baseProject.parallax || 0.12,
          accent: accent || baseProject.accent || '#A5BCD6'
        };

        if (existingIdx >= 0) {
          projects[existingIdx] = updatedProj;
        } else {
          projects.push(updatedProj);
        }

        // Save content/projects/index.js
        const projectsJsPath = path.join(ROOT_DIR, 'content/projects/index.js');
        const serialized = `/**
 * PRANAVI RUDRADEV PORTFOLIO — PROJECTS REGISTRY
 * Maintained via /admin
 */

import { PROJECT_CATEGORIES, validateProjectSchema } from './types.js';
import { PALETTE } from '../../config/colors.js';

export const PROJECTS = ${JSON.stringify(projects, null, 2)};

PROJECTS.forEach(validateProjectSchema);

export function getFeaturedProjects() {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectsByCategory(category) {
  return PROJECTS.filter((p) => p.category === category);
}

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id);
}
`;
        fs.writeFileSync(projectsJsPath, serialized, 'utf8');

        // Write standalone project page
        const projectPageDir = path.join(ROOT_DIR, 'projects', slug);
        const projectPageFile = path.join(projectPageDir, 'index.html');
        fs.mkdirSync(projectPageDir, { recursive: true });
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} — Pranavi Rudradev</title>
  <link rel="stylesheet" href="../../assets/fonts/satoshi.css" />
  <link rel="stylesheet" href="../../styles/reset.css" />
  <link rel="stylesheet" href="../../styles/tokens.css" />
  <link rel="stylesheet" href="../../styles/typography.css" />
  <link rel="stylesheet" href="../../styles/layout.css" />
  <link rel="stylesheet" href="../../styles/editorial-image.css" />
</head>
<body style="background: var(--bg-primary, #4A2E27); color: var(--text-primary, #F5EFC6); min-height: 100vh; display: flex; flex-direction: column;">
  <nav style="padding: 24px var(--space-margin, 40px); display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid rgba(245, 239, 198, 0.15);">
    <a href="../../" class="text-caption text-mono" style="color: #F5EFC6; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
      <span>←</span> <span>RETURN TO PROJECT FIELD</span>
    </a>
    <span class="text-caption text-mono" style="color: ${accent};">${escapeHtml(category)}</span>
  </nav>

  <main class="site-container" style="flex: 1; padding: clamp(48px, 8vw, 96px) clamp(24px, 5vw, 64px); max-width: 980px; margin: 0 auto; width: 100%; box-sizing: border-box;">
    <span class="text-caption text-mono" style="display: block; margin-bottom: 12px; color: rgba(245,239,198,0.6);">PERMANENT ROUTE: /projects/${slug}/</span>
    <h1 class="text-h1" style="color: #F5EFC6; margin-bottom: 24px; font-size: clamp(2rem, 4vw, 3.2rem);">${escapeHtml(title)}</h1>
    
    <div style="border-left: 2px solid ${accent}; padding-left: 20px; margin-bottom: 48px;">
      <p class="text-caption text-mono" style="color: ${accent}; margin-bottom: 6px;">[ CASE STUDY ARCHIVE ]</p>
      <p class="text-body" style="color: #F5EFC6; font-size: 1.1rem; line-height: 1.6;">
        ${escapeHtml(description || 'Project archive and case study inquiry.')}
      </p>
    </div>

    ${updatedProj.cover.src ? `<div class="editorial-image-frame aspect-16-10" style="max-width: 820px; background-color: #231815; border: 1px solid rgba(245, 239, 198, 0.16); margin-bottom: 24px;">
      <img src="../../${updatedProj.cover.src}" alt="${escapeHtml(title)}" class="editorial-image-element" />
    </div>` : ''}

    ${updatedProj.document.src ? `<div>
      <a href="../../${updatedProj.document.src}" target="_blank" style="display: inline-block; padding: 14px 28px; background-color: ${accent}; color: #231815; font-weight: 700; text-decoration: none; border-radius: 4px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;">
        View Document (${docType.toUpperCase()}) →
      </a>
    </div>` : ''}
  </main>

  <footer style="padding: 32px var(--space-margin, 40px); border-top: 1px solid rgba(245, 239, 198, 0.15); display: flex; justify-content: space-between; align-items: center;">
    <span class="text-caption" style="color: rgba(245,239,198,0.6); font-size: 12px;">PRANAVI RUDRADEV · BRAND STRATEGY · CONSUMER PSYCHOLOGY · QUALITATIVE THINKING</span>
    <a href="../../" class="text-caption text-mono" style="color: #F5EFC6; text-decoration: none;">BACK TO HOME ↑</a>
  </footer>
</body>
</html>`;
        fs.writeFileSync(projectPageFile, template, 'utf8');

        // Sync projects/index.html
        try {
          const mainProjHtmlPath = path.join(ROOT_DIR, 'projects/index.html');
          if (fs.existsSync(mainProjHtmlPath)) {
            let mainHtml = fs.readFileSync(mainProjHtmlPath, 'utf8');
            const relDoc = updatedProj.document.src ? (updatedProj.document.src.startsWith('assets') ? '../' + updatedProj.document.src : updatedProj.document.src) : '';
            const relCover = updatedProj.cover.src ? (updatedProj.cover.src.startsWith('assets') ? '../' + updatedProj.cover.src : updatedProj.cover.src) : '';
            
            const regex = new RegExp(`('${slug}':\\s*{[\\s\\S]*?src:\\s*')[^']+(')`);
            if (regex.test(mainHtml) && relDoc) {
              mainHtml = mainHtml.replace(regex, `$1${relDoc}$2`);
              fs.writeFileSync(mainProjHtmlPath, mainHtml, 'utf8');
            }
          }
        } catch (_) {}

        return sendJson(res, 200, {
          success: true,
          message: existingIdx >= 0 ? `Updated project "${title}"` : `Created project "${title}"`,
          project: updatedProj
        });
      }

      // 7. Delete Project
      if ((pathname === '/api/projects/delete' && req.method === 'POST') || (pathname.startsWith('/api/projects/') && req.method === 'DELETE')) {
        let idToDelete = pathname.startsWith('/api/projects/') ? pathname.replace('/api/projects/', '') : null;
        if (!idToDelete) {
          const body = await parseBody(req);
          idToDelete = body.id;
        }

        const projModule = await import(`file://${path.join(ROOT_DIR, 'content/projects/index.js')}?t=${Date.now()}`);
        let projects = [...(projModule.PROJECTS || [])];
        projects = projects.filter(p => p.id !== idToDelete);

        const projectsJsPath = path.join(ROOT_DIR, 'content/projects/index.js');
        const serialized = `/**
 * PRANAVI RUDRADEV PORTFOLIO — PROJECTS REGISTRY
 * Maintained via /admin
 */

import { PROJECT_CATEGORIES, validateProjectSchema } from './types.js';
import { PALETTE } from '../../config/colors.js';

export const PROJECTS = ${JSON.stringify(projects, null, 2)};

PROJECTS.forEach(validateProjectSchema);

export function getFeaturedProjects() {
  return PROJECTS.filter((p) => p.featured);
}

export function getProjectsByCategory(category) {
  return PROJECTS.filter((p) => p.category === category);
}

export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id);
}
`;
        fs.writeFileSync(projectsJsPath, serialized, 'utf8');
        return sendJson(res, 200, { success: true, message: `Project ${idToDelete} deleted successfully` });
      }

      // 8. Save / Update Experience
      if (pathname === '/api/experience' && req.method === 'POST') {
        const body = await parseBody(req);
        const {
          id: existingId,
          title,
          organisation,
          orgSub = 'BRAND STRATEGY',
          category = 'BRAND STRATEGY',
          period,
          location,
          shortDescription,
          bulletPoints = [],
          documentSrc,
          imageSrc,
          tags = []
        } = body;

        if (!title || !organisation) {
          return sendJson(res, 400, { error: 'Role Title and Organisation are required' });
        }

        const slug = existingId || slugify(`${organisation}-${title}`);
        const expModule = await import(`file://${path.join(ROOT_DIR, 'content/experience/index.js')}?t=${Date.now()}`);
        const experiences = [...(expModule.EXPERIENCES || [])];

        const existingIdx = experiences.findIndex(e => e.id === slug);
        const baseExp = existingIdx >= 0 ? experiences[existingIdx] : {};
        const indexStr = baseExp.index || String(existingIdx >= 0 ? existingIdx + 1 : experiences.length + 1).padStart(2, '0');

        const updatedExp = {
          ...baseExp,
          id: slug,
          index: indexStr,
          title: title.trim(),
          organisation: organisation.trim(),
          orgDisplay: organisation.trim().toUpperCase(),
          orgSub: (orgSub || category || 'BRAND STRATEGY').trim().toUpperCase(),
          category: (category || orgSub || 'BRAND STRATEGY').trim().toUpperCase(),
          period: period || baseExp.period || 'Present',
          location: location || baseExp.location || 'Bengaluru',
          type: (documentSrc || (baseExp.document && baseExp.document.src)) ? 'document' : 'narrative',
          ...( (documentSrc || (baseExp.document && baseExp.document.src)) ? {
            document: {
              type: 'presentation',
              src: documentSrc || baseExp.document.src,
              title: `${organisation} Documentation`,
              pageCount: 1,
              downloadable: true
            }
          } : {}),
          shortDescription: shortDescription !== undefined ? shortDescription : (baseExp.shortDescription || ''),
          bulletPoints: Array.isArray(bulletPoints) ? bulletPoints : (bulletPoints ? bulletPoints.split('\n').filter(Boolean) : (baseExp.bulletPoints || [])),
          image: {
            src: imageSrc || (baseExp.image && baseExp.image.src) || `assets/experience/documents/${slug}-cover.jpg`,
            alt: `${organisation} documentation`,
            aspectRatio: '16/10'
          },
          accent: '#A5BCD6',
          tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim().toUpperCase()).filter(Boolean) : (baseExp.tags || ['BRAND STRATEGY']))
        };

        if (existingIdx >= 0) {
          experiences[existingIdx] = updatedExp;
        } else {
          experiences.push(updatedExp);
        }

        const expJsPath = path.join(ROOT_DIR, 'content/experience/index.js');
        const serialized = `/**
 * PRANAVI RUDRADEV PORTFOLIO — EXPERIENCE REGISTRY
 * Maintained via /admin
 */

import { validateExperienceSchema } from './types.js';
import { PALETTE } from '../../config/colors.js';

export const EXPERIENCES = ${JSON.stringify(experiences, null, 2)};

EXPERIENCES.forEach(validateExperienceSchema);

export function getExperienceById(id) {
  return EXPERIENCES.find((e) => e.id === id);
}
`;
        fs.writeFileSync(expJsPath, serialized, 'utf8');

        // Sync experience/index.html DOC_MAP
        try {
          const mainExpHtmlPath = path.join(ROOT_DIR, 'experience/index.html');
          if (fs.existsSync(mainExpHtmlPath)) {
            let expHtml = fs.readFileSync(mainExpHtmlPath, 'utf8');
            const relDoc = updatedExp.document && updatedExp.document.src ? (updatedExp.document.src.startsWith('assets') ? '../' + updatedExp.document.src : updatedExp.document.src) : '';
            const relImg = updatedExp.image && updatedExp.image.src ? (updatedExp.image.src.startsWith('assets') ? '../' + updatedExp.image.src : updatedExp.image.src) : '';
            if (relImg) {
              const regex = new RegExp(`('${slug}':\\s*{[\\s\\S]*?pages:\\s*\\[\\s*')[^']+(')`);
              if (regex.test(expHtml)) {
                expHtml = expHtml.replace(regex, `$1${relImg}$2`);
                fs.writeFileSync(mainExpHtmlPath, expHtml, 'utf8');
              }
            }
          }
        } catch (_) {}

        return sendJson(res, 200, {
          success: true,
          message: existingIdx >= 0 ? `Updated experience "${organisation}"` : `Created experience "${organisation}"`,
          experience: updatedExp
        });
      }

      // 9. Delete Experience
      if ((pathname === '/api/experience/delete' && req.method === 'POST') || (pathname.startsWith('/api/experience/') && req.method === 'DELETE')) {
        let idToDelete = pathname.startsWith('/api/experience/') ? pathname.replace('/api/experience/', '') : null;
        if (!idToDelete) {
          const body = await parseBody(req);
          idToDelete = body.id;
        }

        const expModule = await import(`file://${path.join(ROOT_DIR, 'content/experience/index.js')}?t=${Date.now()}`);
        let experiences = [...(expModule.EXPERIENCES || [])];
        experiences = experiences.filter(e => e.id !== idToDelete);

        const expJsPath = path.join(ROOT_DIR, 'content/experience/index.js');
        const serialized = `/**
 * PRANAVI RUDRADEV PORTFOLIO — EXPERIENCE REGISTRY
 * Maintained via /admin
 */

import { validateExperienceSchema } from './types.js';
import { PALETTE } from '../../config/colors.js';

export const EXPERIENCES = ${JSON.stringify(experiences, null, 2)};

EXPERIENCES.forEach(validateExperienceSchema);

export function getExperienceById(id) {
  return EXPERIENCES.find((e) => e.id === id);
}
`;
        fs.writeFileSync(expJsPath, serialized, 'utf8');
        return sendJson(res, 200, { success: true, message: `Experience ${idToDelete} deleted successfully` });
      }

      // 10. Save / Update Observatory Entry
      if (pathname === '/api/observatory' && req.method === 'POST') {
        const body = await parseBody(req);
        const { id: existingId, title, category, date, summary, imageSrc } = body;

        if (!title) return sendJson(res, 400, { error: 'Observatory Title is required' });

        const slug = existingId || slugify(title);
        const obsModule = await import(`file://${path.join(ROOT_DIR, 'content/observatory/index.js')}?t=${Date.now()}`);
        const entries = [...(obsModule.OBSERVATORY_ENTRIES || [])];

        const existingIdx = entries.findIndex(o => o.id === slug);
        const base = existingIdx >= 0 ? entries[existingIdx] : {};

        const newEntry = {
          ...base,
          id: slug,
          title: title.trim(),
          category: category || base.category || 'PHOTOGRAPHY',
          date: date || base.date || '2024',
          format: 'photo-essay',
          summary: summary || base.summary || '',
          media: {
            type: 'image',
            src: imageSrc || (base.media && base.media.src) || `assets/observatory/images/${slug}.jpg`,
            aspectRatio: '4/5',
            alt: title
          },
          accent: '#4D0E12'
        };

        if (existingIdx >= 0) {
          entries[existingIdx] = newEntry;
        } else {
          entries.push(newEntry);
        }

        const obsJsPath = path.join(ROOT_DIR, 'content/observatory/index.js');
        const serialized = `/**
 * PRANAVI RUDRADEV PORTFOLIO — THE OBSERVATORY
 * Maintained via /admin
 */

import { PALETTE } from '../../config/colors.js';

export const OBSERVATORY_CATEGORIES = Object.freeze({
  CULTURAL_NOTE: 'CULTURAL NOTE',
  QUALITATIVE_INQUIRY: 'QUALITATIVE INQUIRY',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  FIELD_LOG: 'FIELD LOG',
  ESSAY: 'ESSAY',
  DOCUMENTARY: 'DOCUMENTARY',
});

export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(obsModule.OBSERVATORY_DOCUMENTARY || {}, null, 2)};

export const OBSERVATORY_ENTRIES = ${JSON.stringify(entries, null, 2)};
`;
        fs.writeFileSync(obsJsPath, serialized, 'utf8');

        // Also add or update in observatory/index.html carousel
        try {
          const obsHtmlPath = path.join(ROOT_DIR, 'observatory/index.html');
          if (fs.existsSync(obsHtmlPath) && newEntry.media.src) {
            let obsHtml = fs.readFileSync(obsHtmlPath, 'utf8');
            const relImg = newEntry.media.src.startsWith('assets') ? '../' + newEntry.media.src : newEntry.media.src;
            if (!obsHtml.includes(relImg)) {
              const slideHtml = `\n        <div class="carousel-slide" role="listitem" aria-label="${escapeHtml(title)}">\n          <img src="${relImg}" alt="${escapeHtml(title)}" loading="lazy" />\n        </div>`;
              obsHtml = obsHtml.replace(/<div class="carousel-track"[^>]*>/, `$&${slideHtml}`);
              fs.writeFileSync(obsHtmlPath, obsHtml, 'utf8');
            }
          }
        } catch (_) {}

        return sendJson(res, 200, { success: true, message: `Observatory entry "${title}" saved successfully`, entry: newEntry });
      }

      // 11. Delete Observatory Entry
      if ((pathname === '/api/observatory/delete' && req.method === 'POST') || (pathname.startsWith('/api/observatory/') && req.method === 'DELETE')) {
        let idToDelete = pathname.startsWith('/api/observatory/') ? pathname.replace('/api/observatory/', '') : null;
        if (!idToDelete) {
          const body = await parseBody(req);
          idToDelete = body.id;
        }

        const obsModule = await import(`file://${path.join(ROOT_DIR, 'content/observatory/index.js')}?t=${Date.now()}`);
        let entries = [...(obsModule.OBSERVATORY_ENTRIES || [])];
        entries = entries.filter(o => o.id !== idToDelete);

        const obsJsPath = path.join(ROOT_DIR, 'content/observatory/index.js');
        const serialized = `/**
 * PRANAVI RUDRADEV PORTFOLIO — THE OBSERVATORY
 * Maintained via /admin
 */

import { PALETTE } from '../../config/colors.js';

export const OBSERVATORY_CATEGORIES = Object.freeze({
  CULTURAL_NOTE: 'CULTURAL NOTE',
  QUALITATIVE_INQUIRY: 'QUALITATIVE INQUIRY',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  FIELD_LOG: 'FIELD LOG',
  ESSAY: 'ESSAY',
  DOCUMENTARY: 'DOCUMENTARY',
});

export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(obsModule.OBSERVATORY_DOCUMENTARY || {}, null, 2)};

export const OBSERVATORY_ENTRIES = ${JSON.stringify(entries, null, 2)};
`;
        fs.writeFileSync(obsJsPath, serialized, 'utf8');
        return sendJson(res, 200, { success: true, message: `Observatory entry deleted` });
      }

      // 11b. Save / Update Documentary Feature (Observatory Video)
      if (pathname === '/api/observatory/documentary' && req.method === 'POST') {
        const body = await parseBody(req);
        const { title, badge, meta, videoSrc, description } = body;

        const obsModule = await import(`file://${path.join(ROOT_DIR, 'content/observatory/index.js')}?t=${Date.now()}`);
        const currentDoc = obsModule.OBSERVATORY_DOCUMENTARY || {};
        const entries = obsModule.OBSERVATORY_ENTRIES || [];

        const updatedDoc = {
          title: title !== undefined ? title.trim() : (currentDoc.title || ''),
          badge: badge !== undefined ? badge.trim() : (currentDoc.badge || 'FIELD OBSERVATION'),
          meta: meta !== undefined ? meta.trim() : (currentDoc.meta || '4K UHD · 24 FPS · 18:24'),
          videoSrc: videoSrc !== undefined ? videoSrc.trim() : (currentDoc.videoSrc || ''),
          description: description !== undefined ? description.trim() : (currentDoc.description || '')
        };

        const obsJsPath = path.join(ROOT_DIR, 'content/observatory/index.js');
        const serialized = `/**
 * PRANAVI RUDRADEV PORTFOLIO — THE OBSERVATORY
 * Maintained via /admin
 */

import { PALETTE } from '../../config/colors.js';

export const OBSERVATORY_CATEGORIES = Object.freeze({
  CULTURAL_NOTE: 'CULTURAL NOTE',
  QUALITATIVE_INQUIRY: 'QUALITATIVE INQUIRY',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  FIELD_LOG: 'FIELD LOG',
  ESSAY: 'ESSAY',
  DOCUMENTARY: 'DOCUMENTARY',
});

export const OBSERVATORY_DOCUMENTARY = ${JSON.stringify(updatedDoc, null, 2)};

export const OBSERVATORY_ENTRIES = ${JSON.stringify(entries, null, 2)};
`;
        fs.writeFileSync(obsJsPath, serialized, 'utf8');

        // Also update observatory/index.html directly for instant SSR/static sync
        try {
          const obsHtmlPath = path.join(ROOT_DIR, 'observatory/index.html');
          if (fs.existsSync(obsHtmlPath)) {
            let obsHtml = fs.readFileSync(obsHtmlPath, 'utf8');
            if (updatedDoc.title) {
              obsHtml = obsHtml.replace(/<h2 class="doc-title[^"]*"[^>]*>[\s\S]*?<\/h2>/, `<h2 class="doc-title doc-narrative-title doc-feature-title">${escapeHtml(updatedDoc.title)}</h2>`);
            }
            if (updatedDoc.badge) {
              obsHtml = obsHtml.replace(/<span class="doc-badge-live"[^>]*>[\s\S]*?<\/span>/, `<span class="doc-badge-live">● ${escapeHtml(updatedDoc.badge)}</span>`);
            }
            if (updatedDoc.meta) {
              obsHtml = obsHtml.replace(/<span class="doc-badge-res"[^>]*>[\s\S]*?<\/span>/, `<span class="doc-badge-res">${escapeHtml(updatedDoc.meta)}</span>`);
            }
            if (updatedDoc.description) {
              obsHtml = obsHtml.replace(/<p class="doc-narrative-desc[^"]*"[^>]*>[\s\S]*?<\/p>/, `<p class="doc-narrative-desc doc-feature-synopsis">\n          ${escapeHtml(updatedDoc.description)}\n        </p>`);
            }
            if (updatedDoc.videoSrc) {
              const relVideo = updatedDoc.videoSrc.startsWith('assets') ? '../' + updatedDoc.videoSrc : updatedDoc.videoSrc;
              // If a video element already exists, update src; otherwise inject <video> tag into .doc-player-frame
              if (obsHtml.includes('<video id="docVideoPlayer"')) {
                obsHtml = obsHtml.replace(/<video id="docVideoPlayer"[^>]*>[\s\S]*?<\/video>/, `<video id="docVideoPlayer" src="${relVideo}" playsinline controls style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;background:#000;"></video>`);
              } else {
                obsHtml = obsHtml.replace(
                  /<div class="doc-player-frame"[^>]*>/,
                  `$&\n        <video id="docVideoPlayer" src="${relVideo}" playsinline controls style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2;background:#000;"></video>`
                );
              }
            }
            fs.writeFileSync(obsHtmlPath, obsHtml, 'utf8');
          }
        } catch (_) {}

        return sendJson(res, 200, { success: true, message: 'Documentary video updated successfully', documentary: updatedDoc });
      }

      // 12. Save / Update About Me
      if (pathname === '/api/about' && req.method === 'POST') {
        const body = await parseBody(req);
        const { headline, intro, curiosity, imageSrc } = body;

        const aboutJsPath = path.join(ROOT_DIR, 'content/about/index.js');
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

        // Update about/index.html
        try {
          const aboutHtmlPath = path.join(ROOT_DIR, 'about/index.html');
          if (fs.existsSync(aboutHtmlPath)) {
            let aboutHtml = fs.readFileSync(aboutHtmlPath, 'utf8');
            if (headline) {
              aboutHtml = aboutHtml.replace(/<blockquote class="about-pull-statement"[^>]*>[\s\S]*?<\/blockquote>/, `<blockquote class="about-pull-statement" id="about-pull-statement">\n        ${escapeHtml(headline)}\n      </blockquote>`);
            }
            if (intro) {
              aboutHtml = aboutHtml.replace(/<p class="who-am-i-para" id="who-am-i-intro">[\s\S]*?<\/p>/, `<p class="who-am-i-para" id="who-am-i-intro">\n              ${escapeHtml(intro)}\n            </p>`);
            }
            if (curiosity) {
              aboutHtml = aboutHtml.replace(/<p class="who-am-i-para" id="who-am-i-curiosity">[\s\S]*?<\/p>/, `<p class="who-am-i-para" id="who-am-i-curiosity">\n              ${escapeHtml(curiosity)}\n            </p>`);
            }
            if (imageSrc) {
              const relImg = imageSrc.startsWith('assets') ? '../' + imageSrc : imageSrc;
              aboutHtml = aboutHtml.replace(
                /<div class="image-placeholder-frame">[\s\S]*?<\/div>\s*<\/aside>/,
                `<div class="image-placeholder-frame">\n              <img src="${relImg}" alt="Pranavi Rudradev" style="width:100%;height:100%;object-fit:cover;border-radius:4px;" />\n            </div>\n          </aside>`
              );
            } else if (imageSrc === null || imageSrc === '') {
              const placeholderSvg = `<div class="image-placeholder-frame">\n              <div class="image-placeholder-inner" role="img" aria-label="Portrait photograph placeholder">\n                <svg class="placeholder-sample-icon" width="76" height="56" viewBox="0 0 76 56" fill="none" stroke="#F5EFC6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">\n                  <circle cx="56" cy="16" r="7" />\n                  <polygon points="8,48 34,16 60,48" />\n                  <polygon points="34,48 50,26 66,48" />\n                </svg>\n              </div>\n            </div>\n          </aside>`;
              aboutHtml = aboutHtml.replace(
                /<div class="image-placeholder-frame">[\s\S]*?<\/div>\s*<\/aside>/,
                placeholderSvg
              );
            }
            fs.writeFileSync(aboutHtmlPath, aboutHtml, 'utf8');
          }
        } catch (_) {}

        return sendJson(res, 200, { success: true, message: 'About page updated successfully' });
      }

      // 13. Save / Update Homepage Slot or Hero
      if (pathname === '/api/homepage' && req.method === 'POST') {
        const body = await parseBody(req);
        const { slotId, imageSrc, heroStatement, tagline } = body;

        const homeJsPath = path.join(ROOT_DIR, 'src/config/homepage.js');
        let homeFile = fs.readFileSync(homeJsPath, 'utf8');

        if (slotId) {
          if (imageSrc) {
            const relImg = imageSrc.startsWith('assets') ? '/' + imageSrc : imageSrc;
            const slotRegex = new RegExp(`(id:\\s*['"]${slotId}['"],[\\s\\S]*?src:\\s*)(null|'[^']*'|"[^"]*")`);
            if (slotRegex.test(homeFile)) {
              homeFile = homeFile.replace(slotRegex, `$1'${relImg}'`);
            }
          } else {
            // Remove photo from slot
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

        return sendJson(res, 200, { success: true, message: imageSrc ? 'Homepage updated successfully' : `Photo removed from ${slotId}` });
      }

      return sendJson(res, 404, { error: 'API endpoint not found' });
    } catch (err) {
      console.error('API Error:', err);
      return sendJson(res, 500, { error: err.message || 'Server error' });
    }
  }

  // ==========================================
  // STATIC FILE SERVING WITH SVG AUTO-SNIFFING
  // ==========================================
  let reqPath = decodeURIComponent(pathname);

  if (reqPath === '/admin' || reqPath === '/admin/') {
    reqPath = '/admin/index.html';
  } else if (reqPath === '/') {
    reqPath = '/index.html';
  }

  let filePath = path.join(ROOT_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${pathname}`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  let contentType = MIME_TYPES[ext] || 'application/octet-stream';

  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    try {
      const fd = fs.openSync(filePath, 'r');
      const buf = Buffer.alloc(120);
      fs.readSync(fd, buf, 0, 120, 0);
      fs.closeSync(fd);
      const startStr = buf.toString('utf8').trim().toLowerCase();
      if (startStr.startsWith('<svg') || startStr.startsWith('<?xml') || startStr.includes('<svg')) {
        contentType = 'image/svg+xml; charset=UTF-8';
      }
    } catch (_) {}
  }

  try {
    const fileStream = fs.createReadStream(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    fileStream.pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('500 Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  PORTFOLIO SYSTEM ACTIVE`);
  console.log(`  Main Site:        http://localhost:${PORT}/`);
  console.log(`  Admin Dashboard:  http://localhost:${PORT}/admin`);
  console.log(`======================================================\n`);
});
