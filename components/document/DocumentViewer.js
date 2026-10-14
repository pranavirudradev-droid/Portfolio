/**
 * PRANAVI RUDRADEV PORTFOLIO — UNIVERSAL DOCUMENT VIEWER ENGINE
 * 
 * Reusable system powering:
 * - PROJECTS
 * - WORK EXPERIENCE (Avirata NGO, Origami Creative)
 * 
 * Supports:
 * - High-speed progressive PDF page rendering with authentic 2x Retina resolution
 * - Crisp tactile document presentation sheets (16:9 widescreen or A4 portrait)
 * - Seamless optical fisheye lens loupe inspection across all pages
 * - Continuous vertical scrolling
 * - Responsive page rendering
 * - Mobile responsive gestures
 * - Keyboard navigation (Esc to close)
 */

import { DocumentSheet } from './DocumentSheet.js';

async function getPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((resolve, reject) => {
    // 1. Try local vendor first (fastest, offline, zero latency)
    const script = document.createElement('script');
    script.src = '/vendor/pdfjs/pdf.min.js';
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        fallbackCdn();
      }
    };
    script.onerror = fallbackCdn;

    function fallbackCdn() {
      const cdn = document.createElement('script');
      cdn.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      cdn.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js not available'));
        }
      };
      cdn.onerror = reject;
      document.head.appendChild(cdn);
    }

    document.head.appendChild(script);
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
    overlay.id = 'docViewerOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <header class="doc-viewer-header" id="docViewerHeader">
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
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

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

    // Sync track scroll position immediately with fisheye optical mirror stage
    this.track.addEventListener('scroll', () => {
      if (window.__fisheyeLens && window.__fisheyeLens.mirrorDocTrack) {
        window.__fisheyeLens.mirrorDocTrack.scrollTop = this.track.scrollTop;
      }
    }, { passive: true });
  }

  syncSheetToMirror(sheetEl) {
    if (!window.__fisheyeLens || !window.__fisheyeLens.mirrorDocTrack) return;
    const sheetId = sheetEl.id;
    const existing = window.__fisheyeLens.mirrorDocTrack.querySelector(`[data-lens-id="${sheetId}"], #${sheetId}`);
    if (existing) {
      existing.innerHTML = sheetEl.innerHTML;
      existing.style.aspectRatio = sheetEl.style.aspectRatio;
      existing.style.minHeight = sheetEl.style.minHeight;
      existing.style.display = sheetEl.style.display;
    } else {
      const clone = sheetEl.cloneNode(true);
      clone.setAttribute('data-lens-id', sheetId);
      clone.removeAttribute('id');
      window.__fisheyeLens.mirrorDocTrack.appendChild(clone);
    }
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

    this.overlay.classList.add('is-open');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';

    // Ensure fisheye lens mirror stage is populated with the viewer overlay
    if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
      window.__fisheyeLens.syncScene();
    }

    const isPdf = (documentData.type === 'pdf') || (fileSrc && (fileSrc.toLowerCase().includes('.pdf') || fileSrc.startsWith('data:application/pdf')));

    if (isPdf && fileSrc) {
      // Immediate tactile loading indicator
      this.track.innerHTML = `
        <div class="doc-loading-container" id="docLoadingIndicator" style="width: 100%; max-width: 980px; min-height: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; background: #FAF7EE; color: #4A2E27; border-radius: 4px; box-shadow: 0 16px 48px rgba(0,0,0,0.4);">
          <div style="width: 38px; height: 38px; border: 3px solid rgba(74,46,39,0.2); border-top-color: #4A2E27; border-radius: 50%; animation: docSpin 0.8s linear infinite;"></div>
          <span style="font-family: var(--font-primary, sans-serif); font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">RENDERING DOCUMENT...</span>
        </div>
      `;

      getPdfJs().then(async (pdfjs) => {
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

          if (!this.isOpen) return;
          this.track.innerHTML = '';

          // Prepare sheet containers
          for (let p = 1; p <= numPages; p++) {
            const sheet = document.createElement('article');
            sheet.className = 'doc-sheet doc-sheet-pdf';
            sheet.id = `doc-page-${p}`;
            sheet.dataset.page = p;
            sheet.style.width = '100%';
            sheet.style.maxWidth = '980px';
            sheet.style.minHeight = '480px';
            sheet.style.background = '#FFFFFF';
            sheet.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.45)';
            sheet.style.borderRadius = '2px';
            sheet.style.position = 'relative';
            sheet.style.overflow = 'hidden';
            sheet.style.display = 'flex';
            sheet.style.alignItems = 'center';
            sheet.style.justifyContent = 'center';
            sheet.innerHTML = `
              <div style="font-size: 12px; color: #4A2E27; opacity: 0.4; font-family: var(--font-primary, sans-serif); letter-spacing: 0.1em;">PAGE ${p} OF ${numPages}</div>
              <span class="doc-sheet-page-indicator" style="position: absolute; bottom: 14px; right: 18px; font-family: var(--font-mono, monospace); font-size: 0.72rem; color: rgba(74,46,39,0.6);">${p} / ${numPages}</span>
            `;
            this.track.appendChild(sheet);
            this.syncSheetToMirror(sheet);
          }

          const renderPage = async (p) => {
            if (!this.isOpen) return;
            const page = await pdfDoc.getPage(p);
            // High-resolution rendering for sharp optical lens magnification
            const viewport = page.getViewport({ scale: 2.0 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d');

            // 1. Paint crisp solid white paper background to eliminate any transparency or dark banding
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Render PDF content
            await page.render({ canvasContext: ctx, viewport }).promise;

            const sheet = document.getElementById(`doc-page-${p}`);
            if (sheet && this.isOpen) {
              const img = document.createElement('img');
              img.src = canvas.toDataURL('image/jpeg', 0.92);
              img.alt = `${documentData.title || 'Document'} - Page ${p}`;
              img.style.width = '100%';
              img.style.height = 'auto';
              img.style.display = 'block';
              img.style.borderRadius = '0';
              img.style.userSelect = 'none';

              sheet.innerHTML = '';
              sheet.style.minHeight = 'auto';
              sheet.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
              sheet.appendChild(img);
              sheet.insertAdjacentHTML('beforeend', `<span class="doc-sheet-page-indicator" style="position: absolute; bottom: 14px; right: 18px; font-family: var(--font-mono, monospace); font-size: 0.72rem; color: rgba(74,46,39,0.6);">${p} / ${numPages}</span>`);

              this.syncSheetToMirror(sheet);
            }
          };

          // Render Page 1 immediately for instant presentation
          await renderPage(1);

          // Render remaining pages progressively in background
          for (let p = 2; p <= numPages; p++) {
            if (!this.isOpen) break;
            await renderPage(p);
          }

          // Final mirror synchronization
          if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
            window.__fisheyeLens.syncScene();
          }
        } catch (renderErr) {
          console.warn('PDF.js render error, falling back to iframe:', renderErr);
          this.renderIframeFallback(fileSrc, documentData.title);
        }
      }).catch((loadErr) => {
        console.warn('PDF.js load error, falling back to iframe:', loadErr);
        this.renderIframeFallback(fileSrc, documentData.title);
      });
    } else if (documentData.pages && documentData.pages.length > 0) {
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
      if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
        window.__fisheyeLens.syncScene();
      }
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
  }

  renderIframeFallback(fileSrc, title) {
    this.track.innerHTML = `
      <div class="doc-viewer-frame-container" style="position: relative; width: 100%; max-width: 1120px; height: calc(100vh - 120px); min-height: 620px; background: #FAF7EE; border-radius: 6px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.6); display: flex; flex-direction: column;">
        <iframe 
          src="${fileSrc}#toolbar=1&navpanes=0&scrollbar=1" 
          class="doc-viewer-frame" 
          style="width: 100%; height: 100%; border: none; display: block;"
        ></iframe>
      </div>
    `;
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
