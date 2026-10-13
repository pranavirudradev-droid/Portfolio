/**
 * PRANAVI RUDRADEV PORTFOLIO — CARDLESS PROJECT RENDERER
 * 
 * Strictly cardless:
 * - NO generic card borders
 * - NO rounded corners
 * - NO card grids
 * - Floating, placed, asymmetric editorial art direction
 */

import { EditorialImage } from '../core/EditorialImage.js';
import { ProjectDataHelper } from './ProjectDataHelper.js';

export class ProjectCardless {
  /**
   * @param {Object} project - Conforms to project schema
   */
  static render(project) {
    const spatialStyles = ProjectDataHelper.getSpatialStyles(project);
    const scaleClass = `scale-${project.homepageSize || 'standard'}`;

    return `
      <article 
        class="editorial-placed-item ${scaleClass}" 
        id="project-${project.id}"
        style="${spatialStyles}"
        data-lens
        data-lens-label="EXAMINE"
      >
        <div class="project-header" style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: baseline;">
          <span class="text-caption text-mono" style="color: ${project.accent}; font-weight: 700;">
            ${project.category}
          </span>
          <span class="text-caption text-subtle text-mono">
            REF.${project.id.slice(0, 4).toUpperCase()}
          </span>
        </div>

        ${EditorialImage.render({
          src: project.cover.src,
          alt: project.cover.alt,
          aspectRatio: project.cover.aspectRatio || '16/10',
          scale: project.homepageSize || 'standard',
          objectPosition: project.cover.focalPoint || '50% 50%',
          placeholderColor: project.cover.placeholderColor || '#231815',
        })}

        <div class="project-meta" style="margin-top: 14px;">
          <h3 class="text-h2" style="color: var(--text-primary); margin-bottom: 8px;">
            <a href="${project.href}" data-doc-src="${project.document.src}" data-doc-title="${project.title}" data-doc-type="${project.document.type}" class="project-title-link">
              ${project.title}
            </a>
          </h3>

          <div style="display: flex; gap: 16px; align-items: center; margin-top: 8px;">
            <button 
              type="button"
              class="doc-trigger-btn text-caption"
              data-doc-src="${project.document.src}" 
              data-doc-title="${project.title}" 
              data-doc-type="${project.document.type}"
              style="color: var(--text-muted); border-bottom: 1px solid ${project.accent}; padding-bottom: 2px; text-transform: uppercase; letter-spacing: 0.08em; display: inline-flex; align-items: center; gap: 6px;"
            >
              <span>VIEW ${project.document.type.toUpperCase()}</span>
              <span class="text-mono" style="color: ${project.accent};">→</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }
}
