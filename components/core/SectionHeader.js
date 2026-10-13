/**
 * PRANAVI RUDRADEV PORTFOLIO — SECTION HEADER COMPONENT
 * 
 * Enforces section accent rules:
 * - ABOUT ME: Sceptre Red (#4D0E12)
 * - WORK EXPERIENCE: Cerulean Blue (#A5BCD6)
 * - PROJECTS: Cerulean Blue (#A5BCD6) + Sceptre Red (#4D0E12)
 * - THE OBSERVATORY: Java Brown (#231815) + small Sceptre Red interventions
 */

import { SECTION_ACCENTS } from '../../config/colors.js';

export class SectionHeader {
  /**
   * @param {Object} options
   * @param {string} options.sectionKey - 'ABOUT' | 'EXPERIENCE' | 'PROJECTS' | 'OBSERVATORY'
   * @param {string} options.index - e.g. '01', '02', '03'
   * @param {string} options.title - Section Title
   * @param {string} [options.subheading] - Optional editorial subheading
   */
  static render({ sectionKey, index = '', title, subheading = '' }) {
    const accentConfig = SECTION_ACCENTS[sectionKey] || SECTION_ACCENTS.ABOUT;
    const accentColor = accentConfig.primary;

    return `
      <header class="section-header-block" style="--header-accent: ${accentColor}; margin-bottom: clamp(40px, 6vw, 80px);">
        <div style="display: flex; align-items: baseline; gap: 16px; margin-bottom: 12px;">
          ${index ? `<span class="text-mono text-caption" style="color: ${accentColor}; font-weight: 700;">[ ${index} ]</span>` : ''}
          <span class="text-caption text-subtle" style="letter-spacing: 0.12em;">${sectionKey}</span>
        </div>
        <h2 class="text-h1" style="color: var(--text-primary); border-left: 3px solid ${accentColor}; padding-left: 20px;">
          ${title}
        </h2>
        ${subheading ? `
          <p class="text-body-lead text-muted" style="margin-top: 16px; padding-left: 23px; max-width: 780px;">
            ${subheading}
          </p>
        ` : ''}
      </header>
    `;
  }
}
