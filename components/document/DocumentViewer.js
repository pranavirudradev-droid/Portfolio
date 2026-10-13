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
    
    if (documentData.src) {
      downloadEl.setAttribute('href', documentData.src);
      downloadEl.style.display = 'inline-block';
    } else {
      downloadEl.style.display = 'none';
    }

    // Build vertical scrolling sheets
    const count = documentData.pageCount || 3;
    const format = documentData.type === 'presentation' ? 'presentation' : 'portrait';
    
    let sheetsHtml = '';
    for (let i = 1; i <= count; i++) {
      const pageSrc = (documentData.pages && documentData.pages[i - 1]) || '';
      sheetsHtml += DocumentSheet.render({
        pageNumber: i,
        totalPages: count,
        src: pageSrc,
        format,
        title: documentData.title,
      });
    }

    this.track.innerHTML = sheetsHtml;
    this.overlay.classList.add('is-open');
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('is-open');
    this.isOpen = false;
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!this.isOpen && this.track) {
        this.track.innerHTML = '';
      }
    }, 350);
  }
}

// Global Singleton for easy cross-component invocation
export const globalDocumentViewer = new DocumentViewer();
