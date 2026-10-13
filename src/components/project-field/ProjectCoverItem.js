/**
 * PRANAVI RUDRADEV PORTFOLIO — PROJECT COVER ITEM
 * 
 * Strict Homepage Requirements:
 * - COVER IMAGE ONLY
 * - NO titles, NO descriptions, NO case study content, NO PDFs, NO tooltips
 * - Hover: ONLY THE IMAGE SCALES
 * - Click: ONE CLICK navigates to permanent project page
 * - No rounded corners, no cards, no generic borders
 */

export class ProjectCoverItem {
  /**
   * @param {Object} project - Conforms to homepage project schema
   * @param {string} project.id
   * @param {string} project.cover
   * @param {string} project.alt
   * @param {string} project.href
   * @param {Object} project.spatial
   */
  static render(project) {
    const { left, top, width, aspectRatio, rotation, zIndex, parallaxSpeed } = project.spatial;

    // Convert aspect ratio string e.g. '4/5' to CSS
    return `
      <div 
        class="project-field-item" 
        id="item-${project.id}"
        data-parallax-speed="${parallaxSpeed || 0.15}"
        style="
          left: ${left}; 
          top: ${top}; 
          width: ${width}; 
          aspect-ratio: ${aspectRatio};
          --item-rotation: ${rotation}deg; 
          --item-z: ${zIndex};
        "
      >
        <a 
          href="${project.href}" 
          class="project-cover-link"
          aria-label="View project case study"
        >
          <img 
            src="${project.cover}" 
            alt="${project.alt || 'Project cover'}" 
            loading="lazy" 
            class="project-cover-image"
          />
        </a>
      </div>
    `;
  }
}
