/**
 * PRANAVI RUDRADEV PORTFOLIO — REUSABLE WORK EXPERIENCE COMPONENT
 * 
 * Accurately models the reference design:
 * - Left side: Number circle + coded pale-yellow PDF cover placeholder card
 *   with organization name and arrow icon button (HTML/CSS component, not flattened image).
 * - Vertical divider separating left cards from right content.
 * - Right side: Role category in Cerulean Blue, dates & location, role title,
 *   full experience description with bullet points, and skill tags.
 * - Prioritizes legibility, generous line height, clear typographic hierarchy.
 * - Satoshi typeface used throughout.
 * - Supports document viewer integration for attached PDFs/presentations.
 */

export class ExperienceItem {
  /**
   * Render an individual experience entry
   * @param {Object} exp - Experience item conforming to schema
   * @param {number|string} [index] - Display index (e.g. '01', '02')
   */
  static render(exp, index) {
    const isDocument = exp.type === 'document' && exp.document;
    const itemIndex = exp.index || (typeof index === 'number' ? String(index + 1).padStart(2, '0') : '01');
    const orgDisplay = exp.orgDisplay || exp.organisation;
    const orgSub = exp.orgSub || exp.category;
    const docTitle = (exp.document && exp.document.title) || exp.title;
    const docType = (exp.document && exp.document.type) || (isDocument ? 'pdf' : 'documentation');

    const clickAction = isDocument 
      ? `onclick="if(window.openDocById){window.openDocById('${exp.id}')}else if(window.openDoc){window.openDoc('${docTitle}', '${docType}')}"`
      : `onclick="if(window.openDocById){window.openDocById('${exp.id}')}"`;

    const orgLines = orgDisplay.split(' ');
    let formattedOrg = orgDisplay;
    if (orgLines.length === 2) {
      formattedOrg = `${orgLines[0]}<br/>${orgLines[1]}`;
    } else if (orgLines.length > 2) {
      formattedOrg = `${orgLines.slice(0, 2).join(' ')}<br/>${orgLines.slice(2).join(' ')}`;
    }

    const bulletsHtml = (exp.bulletPoints || [exp.shortDescription])
      .map(b => `
        <li class="exp-bullet-item">
          <span class="exp-bullet-dot" aria-hidden="true">•</span>
          <span class="exp-bullet-text">${b}</span>
        </li>
      `).join('');

    const tagsHtml = (exp.tags || [])
      .map(t => `<span class="exp-skill-tag">${t}</span>`)
      .join('');

    return `
      <article class="exp-item" id="exp-${exp.id}">
        <!-- Left Side: Number Circle + Coded Pale-Yellow Cover Card -->
        <div class="exp-left-col">
          <div class="exp-num-circle" aria-label="Entry ${itemIndex}">
            <span>${itemIndex}</span>
          </div>

          <button 
            type="button" 
            class="exp-cover-card" 
            ${clickAction}
            aria-label="View ${exp.organisation} portfolio document"
            data-lens
          >
            <div class="exp-cover-header">
              <h3 class="exp-cover-org">${formattedOrg}</h3>
              <span class="exp-cover-sub">${orgSub}</span>
            </div>
            <div class="exp-cover-arrow-btn" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="#F5EFC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="2" y1="11" x2="11" y2="2" />
                <polyline points="4 2 11 2 11 9" />
              </svg>
            </div>
          </button>
        </div>

        <!-- Vertical Divider + Right Side Content -->
        <div class="exp-right-col">
          <div class="exp-meta-header">
            <span class="exp-category">${exp.category}</span>
            <div class="exp-meta-time-loc">
              <span class="exp-dates">${exp.period}</span>
              ${exp.location ? `<span class="exp-location">${exp.location}</span>` : ''}
            </div>
          </div>

          <h2 class="exp-role-title">${exp.title}</h2>

          <ul class="exp-bullet-list">
            ${bulletsHtml}
          </ul>

          ${tagsHtml ? `
            <div class="exp-tags-row">
              ${tagsHtml}
            </div>
          ` : ''}
        </div>
      </article>
    `;
  }
}
