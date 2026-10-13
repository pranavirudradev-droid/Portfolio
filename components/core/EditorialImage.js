/**
 * PRANAVI RUDRADEV PORTFOLIO — EDITORIAL IMAGE COMPONENT
 * 
 * Reusable image renderer enforcing:
 * - Rectangular, clean, placed, art-directed aesthetics
 * - STRICTLY NO rounded corners
 * - STRICTLY NO generic borders
 * - STRICTLY NO white frames
 * - STRICTLY NO card containers
 * - Responsive sizing and object positioning
 * - Native lazy loading and intersection observer support
 */

export class EditorialImage {
  /**
   * @param {Object} options
   * @param {string} options.src - Image source path
   * @param {string} options.alt - Descriptive accessible alt text
   * @param {string} [options.aspectRatio='16/10'] - CSS aspect-ratio e.g. '1/1', '4/5', '16/9'
   * @param {string} [options.scale='standard'] - 'compact' | 'standard' | 'large' | 'panoramic' | 'monumental'
   * @param {string} [options.objectPosition='50% 50%'] - Object position coordinates
   * @param {string} [options.placeholderColor='#231815'] - Subtle tone before image load
   * @param {string} [options.caption] - Optional editorial caption
   * @param {string} [options.credit] - Optional photographer or project credit
   * @param {string} [options.className] - Extra classes
   */
  static render({
    src,
    alt = '',
    aspectRatio = '16/10',
    scale = 'standard',
    objectPosition = '50% 50%',
    placeholderColor = '#231815',
    caption = '',
    credit = '',
    className = ''
  }) {
    // Map aspectRatio to CSS class if standard, or inline style
    const ratioMap = {
      '1/1': 'aspect-1-1',
      '4/5': 'aspect-4-5',
      '3/4': 'aspect-3-4',
      '16/9': 'aspect-16-9',
      '16/10': 'aspect-16-10'
    };
    const ratioClass = ratioMap[aspectRatio] || '';
    const inlineRatio = ratioClass ? '' : `aspect-ratio: ${aspectRatio};`;
    const scaleClass = `scale-${scale}`;

    return `
      <figure class="editorial-image-container ${scaleClass} ${className}">
        <div class="editorial-image-frame ${ratioClass}" style="background-color: ${placeholderColor}; ${inlineRatio}">
          <img 
            src="${src}" 
            alt="${alt}" 
            loading="lazy" 
            decoding="async"
            class="editorial-image-element"
            style="object-position: ${objectPosition};"
            onerror="this.onerror=null; this.style.display='none'; this.parentElement.classList.add('image-fallback-active');"
          />
        </div>
        ${caption || credit ? `
          <figcaption class="editorial-image-caption">
            <span>${caption}</span>
            ${credit ? `<span class="text-mono">${credit}</span>` : ''}
          </figcaption>
        ` : ''}
      </figure>
    `;
  }
}
