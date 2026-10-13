/**
 * PRANAVI RUDRADEV PORTFOLIO — DOCUMENT SHEET COMPONENT
 * 
 * Individual tactile document page renderer.
 * Handles lazy loading, presentation vs portrait aspect ratios,
 * and high-resolution visual display.
 */

export class DocumentSheet {
  /**
   * @param {Object} options
   * @param {number} options.pageNumber
   * @param {number} [options.totalPages]
   * @param {string} [options.src] - Image slide src or rendered page canvas
   * @param {string} [options.format='presentation'] - 'presentation' (16:9) | 'portrait' (A4)
   * @param {string} [options.title='']
   */
  static render({
    pageNumber,
    totalPages = 1,
    src = '',
    format = 'presentation',
    title = ''
  }) {
    const formatClass = format === 'portrait' ? 'doc-sheet-portrait' : 'doc-sheet-presentation';

    return `
      <article 
        class="doc-sheet ${formatClass}" 
        data-page="${pageNumber}"
        style="position: relative;"
      >
        ${src ? `
          <img 
            src="${src}" 
            alt="${title ? `${title} - Page ${pageNumber}` : `Page ${pageNumber}`}" 
            loading="lazy" 
            class="editorial-image-element"
            style="width: 100%; height: 100%; object-fit: contain; background: #FAF7EE;"
            onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
        ` : ''}

        <!-- Fallback tactile presentation sheet when binary asset is loading or missing -->
        <div class="doc-sheet-fallback" style="${src ? 'display: none;' : 'display: flex;'} flex-direction: column; justify-content: space-between; height: 100%; padding: clamp(24px, 4vw, 56px); background: #FAF7EE; color: #4A2E27;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(74, 46, 39, 0.2); padding-bottom: 12px;">
            <span class="text-caption" style="color: #4A2E27; font-weight: 700;">${title || 'DOCUMENT VIEW'}</span>
            <span class="text-mono text-caption" style="color: rgba(74, 46, 39, 0.6);">SHEET ${pageNumber} OF ${totalPages}</span>
          </div>
          
          <div style="margin: auto 0;">
            <p class="text-caption text-mono" style="color: #A5BCD6; margin-bottom: 8px;">QUALITATIVE RESEARCH / DOCUMENTATION ARCHIVE</p>
            <h3 class="text-h2" style="color: #231815; max-width: 650px;">${title}</h3>
            <p class="text-caption" style="color: rgba(74, 46, 39, 0.7); margin-top: 12px;">
              Tactile PDF / Presentation Page Engine · Vertical Continuous Scroll
            </p>
          </div>

          <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(74, 46, 39, 0.2); padding-top: 12px; font-size: 0.75rem;">
            <span class="text-mono" style="color: rgba(74, 46, 39, 0.65);">CONFIDENTIAL & PROPRIETARY STRATEGY</span>
            <span class="text-mono" style="color: rgba(74, 46, 39, 0.65);">PAGE ${pageNumber}</span>
          </div>
        </div>

        <div class="doc-sheet-page-indicator">
          <span>${String(pageNumber).padStart(2, '0')} / ${String(totalPages).padStart(2, '0')}</span>
        </div>
      </article>
    `;
  }
}
