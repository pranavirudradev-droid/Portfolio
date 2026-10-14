/**
 * PRANAVI RUDRADEV PORTFOLIO — UNIVERSAL DOCUMENT VIEWER ENGINE
 * 
 * Reusable system powering:
 * - PROJECTS
 * - WORK EXPERIENCE (Avirata NGO, Origami Creative)
 * 
 * Supports:
 * - PDF documents (native or iframe rendered)
 * - Presentation exported to PDF (16:9 vertical sheet scroll)
 * - Image sequences (continuous vertical cascade)
 * 
 * Features:
 * - Continuous vertical scrolling
 * - Responsive page rendering
 * - High resolution container
 * - Mobile responsive gestures
 * - Lazy loading sheets
 * - Keyboard navigation (Esc to close)
 */

import { DocumentSheet } from './DocumentSheet.js';

async function ensurePdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/vendor/pdfjs/pdf.min.js';
    s.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js not available'));
      }
    };
    s.onerror = () => {
      const cdn = document.createElement('script');
      cdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      cdn.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('CDN PDF.js failed'));
        }
      };
      cdn.onerror = reject;
      document.head.appendChild(cdn);
    };
    document.head.appendChild(s);
  });
}

export class DocumentViewer {
  constructor() {
    this.overlay = null;
    this.track = null;
    this.isOpen = false;
    this.currentDoc = null;
  }

  mount(container = document.body) {
    if (document.querySelector('.doc-viewer-overlay')) {
      this.overlay = document.querySelector('.doc-viewer-overlay');
      this.track = this.overlay.querySelector('.doc-viewer-track');
      return;
    }

    const overlay = document.createElement('section');
    overlay.className = 'doc-viewer-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <header class="doc-viewer-header">
        <div class="doc-viewer-meta">
          <span class="doc-viewer-title" id="doc-title">DOCUMENT VIEWER</span>
          <span class="doc-viewer-badge" id="doc-type">PDF</span>
        </div>
        <div class="doc-viewer-actions">
          <a href="#" target="_blank" download class="doc-viewer-btn" id="doc-download">DOWNLOAD FILE</a>
          <button class="doc-viewer-btn doc-viewer-btn-close" id="doc-close" aria-label="Close document">CLOSE [ESC]</button>
        </div>
      </header>
      <div class="doc-viewer-track" id="doc-track">
        <!-- Rendered Document Sheets -->
      </div>
    `;

    container.appendChild(overlay);
    this.overlay = overlay;
    this.track = overlay.querySelector('.doc-viewer-track');

    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.overlay.querySelector('#doc-close');
    closeBtn.addEventListener('click', () => this.close());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Close on backdrop click outside sheets
    this.track.addEventListener('click', (e) => {
      if (e.target === this.track) {
        this.close();
      }
    });
  }

  /**
   * Open and render any document
   * @param {Object} documentData
   * @param {string} documentData.title
   * @param {string} [documentData.type='pdf'] - 'pdf' | 'presentation' | 'image-sequence'
   * @param {string} documentData.src
   * @param {number} [documentData.pageCount=3]
   * @param {string[]} [documentData.pages=[]] - Array of slide image paths if available
   */
  open(documentData) {
    if (!this.overlay) this.mount();
    this.currentDoc = documentData;

    const titleEl = this.overlay.querySelector('#doc-title');
    const typeEl = this.overlay.querySelector('#doc-type');
    const downloadEl = this.overlay.querySelector('#doc-download');

    titleEl.textContent = documentData.title || 'STRATEGIC DOCUMENT';
    typeEl.textContent = (documentData.type || 'PDF').toUpperCase();
    
    let fileSrc = documentData.src || '';
    if (fileSrc && !fileSrc.startsWith('http') && !fileSrc.startsWith('data:') && !fileSrc.startsWith('blob:')) {
      fileSrc = '/' + fileSrc.replace(/^\.\.\//, '').replace(/^\//, '');
    }

    if (fileSrc) {
      downloadEl.setAttribute('href', fileSrc);
      downloadEl.style.display = 'inline-block';
    } else {
      downloadEl.style.display = 'none';
    }

    const isPdf = (documentData.type === 'pdf') || (fileSrc && (fileSrc.toLowerCase().includes('.pdf') || fileSrc.startsWith('data:application/pdf')));

    if (isPdf && fileSrc) {
      // Immediate tactile loading indicator
      this.track.innerHTML = `
        <div class="doc-sheet is-loading" id="docLoadingSheet" style="max-width: 980px; width: 100%; aspect-ratio: 1 / 1.414; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: #FAF7EE; color: #4A2E27; border-radius: 4px; box-shadow: 0 16px 48px rgba(0,0,0,0.4);">
          <div class="doc-spinner" style="width: 36px; height: 36px; border: 3px solid rgba(74,46,39,0.2); border-top-color: #4A2E27; border-radius: 50%; animation: docSpin 0.8s linear infinite;"></div>
          <span style="font-family: var(--font-primary, sans-serif); font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">LOADING DOCUMENT...</span>
        </div>
      `;

      ensurePdfJs().then(async (pdfjs) => {
        try {
          const loadingTask = pdfjs.getDocument({
            url: fileSrc,
            enableXfa: false,
            isEvalSupported: false
          });

          const pdfDoc = await loadingTask.promise;
          const numPages = pdfDoc.numPages;

          if (typeEl) {
            typeEl.textContent = `PDF · ${numPages} PAGES`;
          }

          this.track.innerHTML = '';

          for (let p = 1; p <= numPages; p++) {
            const sheet = document.createElement('article');
            sheet.className = 'doc-sheet doc-sheet-portrait doc-sheet-pdf';
            sheet.id = `doc-page-${p}`;
            sheet.style.minHeight = '720px';
            sheet.style.display = 'flex';
            sheet.style.alignItems = 'center';
            sheet.style.justifyContent = 'center';
            sheet.style.position = 'relative';
            sheet.style.background = '#FFFFFF';
            sheet.innerHTML = `
              <div style="font-size: 12px; color: #4A2E27; opacity: 0.5; font-family: var(--font-primary, sans-serif); letter-spacing: 0.1em;">PAGE ${p} OF ${numPages}</div>
              <span class="doc-sheet-page-indicator">${p} / ${numPages}</span>
            `;
            this.track.appendChild(sheet);
          }

          const renderPage = async (p) => {
            if (!this.isOpen) return;
            const page = await pdfDoc.getPage(p);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');
            await page.render({ canvasContext: ctx, viewport }).promise;

            const sheet = document.getElementById(`doc-page-${p}`);
            if (sheet && this.isOpen) {
              const img = document.createElement('img');
              img.src = canvas.toDataURL('image/jpeg', 0.85);
              img.alt = `${documentData.title || 'Document'} - Page ${p}`;
              img.style.width = '100%';
              img.style.height = 'auto';
              img.style.display = 'block';
              img.style.borderRadius = '0';
              sheet.innerHTML = '';
              sheet.style.minHeight = 'auto';
              sheet.appendChild(img);
              sheet.insertAdjacentHTML('beforeend', `<span class="doc-sheet-page-indicator">${p} / ${numPages}</span>`);

              if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
                window.__fisheyeLens.syncScene();
              }
            }
          };

          // Render Page 1 immediately for instant presentation
          await renderPage(1);

          if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
            window.__fisheyeLens.syncScene();
          }

          // Progressively render remaining pages in background
          for (let p = 2; p <= numPages; p++) {
            if (!this.isOpen) break;
            await renderPage(p);
          }
        } catch (renderErr) {
          console.warn('PDF.js render error, falling back to iframe:', renderErr);
          this.track.innerHTML = `
            <div style="width: 100%; max-width: 1120px; height: calc(100vh - 100px); min-height: 600px; background: #FAF7EE; border-radius: 6px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.6); display: flex; flex-direction: column;">
              <iframe src="${fileSrc}#toolbar=1&navpanes=0&scrollbar=1" class="doc-viewer-frame" style="width: 100%; height: 100%; border: none; display: block;"></iframe>
            </div>
          `;
        }
      }).catch((err) => {
        console.warn('PDF.js script load error, falling back to iframe:', err);
        this.track.innerHTML = `
          <div style="width: 100%; max-width: 1120px; height: calc(100vh - 100px); min-height: 600px; background: #FAF7EE; border-radius: 6px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.6); display: flex; flex-direction: column;">
            <iframe src="${fileSrc}#toolbar=1&navpanes=0&scrollbar=1" class="doc-viewer-frame" style="width: 100%; height: 100%; border: none; display: block;"></iframe>
          </div>
        `;
      });
    } else if (documentData.pages && documentData.pages.length > 0 && documentData.type !== 'pdf') {
      // Build vertical scrolling sheets from authentic slide images
      const count = documentData.pages.length;
      const format = documentData.type === 'presentation' ? 'presentation' : 'portrait';
      
      let sheetsHtml = '';
      for (let i = 1; i <= count; i++) {
        let pageSrc = documentData.pages[i - 1] || '';
        if (pageSrc && !pageSrc.startsWith('http') && !pageSrc.startsWith('data:') && !pageSrc.startsWith('blob:')) {
          pageSrc = '/' + pageSrc.replace(/^\.\.\//, '').replace(/^\//, '');
        }
        sheetsHtml += DocumentSheet.render({
          pageNumber: i,
          totalPages: count,
          src: pageSrc,
          format,
          title: documentData.title,
        });
      }

      this.track.innerHTML = sheetsHtml;
    } else {
      // Clean fallback if file is missing
      this.track.innerHTML = `
        <div style="width: 100%; max-width: 800px; padding: 48px 32px; background: #FAF7EE; color: #4A2E27; border-radius: 6px; text-align: center; box-shadow: 0 12px 36px rgba(0,0,0,0.4);">
          <h3 style="font-size: 22px; margin-bottom: 12px; font-weight: 700;">${documentData.title || 'Document Viewer'}</h3>
          <p style="font-size: 14px; opacity: 0.8; margin-bottom: 24px;">Please upload or attach a PDF document in the Admin portal.</p>
          ${fileSrc ? `<a href="${fileSrc}" target="_blank" style="display: inline-block; padding: 12px 24px; background: #4A2E27; color: #F5EFC6; font-weight: 700; text-decoration: none; border-radius: 4px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase;">Open File ↗</a>` : ''}
        </div>
      `;
    }

    this.overlay.classList.add('is-open');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';

    if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
      window.__fisheyeLens.syncScene();
    }
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('is-open');
    this.isOpen = false;
    document.body.style.overflow = '';
    if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
      window.__fisheyeLens.syncScene();
    }
    setTimeout(() => {
      if (!this.isOpen && this.track) {
        this.track.innerHTML = '';
      }
    }, 350);
  }
}

// Global Singleton for easy cross-component invocation
export const globalDocumentViewer = new DocumentViewer();
