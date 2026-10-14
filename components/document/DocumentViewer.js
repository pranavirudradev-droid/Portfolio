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
      // Direct high-resolution native PDF rendering with tactile loading overlay
      this.track.innerHTML = `
        <div class="doc-viewer-frame-container" style="position: relative; width: 100%; max-width: 1120px; height: calc(100vh - 120px); min-height: 620px; background: #FAF7EE; border-radius: 6px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.6); display: flex; flex-direction: column;">
          <div id="docFrameLoading" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: #FAF7EE; color: #4A2E27; z-index: 2; transition: opacity 280ms ease;">
            <div style="width: 36px; height: 36px; border: 3px solid rgba(74,46,39,0.2); border-top-color: #4A2E27; border-radius: 50%; animation: docSpin 0.8s linear infinite;"></div>
            <span style="font-family: var(--font-primary, sans-serif); font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;">LOADING DOCUMENT...</span>
          </div>
          <iframe 
            src="${fileSrc}#toolbar=1&navpanes=0&scrollbar=1" 
            class="doc-viewer-frame" 
            style="width: 100%; height: 100%; border: none; display: block;"
            onload="const l=document.getElementById('docFrameLoading'); if(l){l.style.opacity='0'; setTimeout(()=>l.remove(), 300);}"
          ></iframe>
        </div>
      `;
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
    document.body.classList.add('has-doc-open');

    // Remove lens cursor completely while document / PDF viewer is open
    const lens = document.getElementById('fisheye') || document.querySelector('.fisheye-lens-loupe');
    if (lens) {
      lens.style.display = 'none';
      lens.classList.remove('is-active');
    }

    if (window.__fisheyeLens && typeof window.__fisheyeLens.syncScene === 'function') {
      window.__fisheyeLens.syncScene();
    }
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('is-open');
    this.isOpen = false;
    document.body.style.overflow = '';
    document.body.classList.remove('has-doc-open');

    // Restore lens cursor after closing document viewer
    const lens = document.getElementById('fisheye') || document.querySelector('.fisheye-lens-loupe');
    if (lens) {
      lens.style.display = '';
    }

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
