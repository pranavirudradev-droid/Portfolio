/**
 * PRANAVI RUDRADEV PORTFOLIO — THE FOUR WORLDS NAVIGATION COMPONENT
 * 
 * Strict Colour Hierarchy & Minimal Editorial Structure:
 * - YELLOW (#F5EFC6): All primary titles (ABOUT ME, WORK EXPERIENCE, PROJECTS, THE OBSERVATORY)
 * - BLUE (#A5BCD6): Indices [01], [02], [03], [04], arrows, system indicators
 * - RED (#4D0E12): Subtle occasional accent detail only (never a heading colour)
 * - NO explanatory subtitles or sub-tab descriptions
 * - NO browser-default blue focus rectangles on mouse click
 */

export class FourWorldsNavigation {
  static render() {
    const worlds = [
      {
        index: '01',
        title: 'ABOUT ME',
        href: '#about',
      },
      {
        index: '02',
        title: 'WORK EXPERIENCE',
        href: '#experience',
      },
      {
        index: '03',
        title: 'PROJECTS',
        href: '#projects',
      },
      {
        index: '04',
        title: 'THE OBSERVATORY',
        href: '#observatory',
      },
    ];

    return `
      <section class="four-worlds-stage" id="worlds-stage">
        <div class="worlds-intro-header">
          <div style="display: flex; align-items: baseline; gap: 12px;">
            <span class="text-caption text-mono world-index-blue">[ 02 / THE FOUR WORLDS ]</span>
            <span class="text-caption" style="color: rgba(245, 239, 198, 0.6); letter-spacing: 0.14em;">PORTFOLIO ARCHITECTURE</span>
          </div>
          <span class="text-caption text-mono" style="color: rgba(165, 188, 214, 0.6);">SELECT AN ENVIRONMENT TO ENTER</span>
        </div>

        <nav class="worlds-nav-list" aria-label="Portfolio Worlds">
          ${worlds.map(w => `
            <a 
              href="${w.href}" 
              class="world-tab-item"
              tabindex="0"
            >
              <div class="world-tab-left">
                <span class="world-index text-mono">[ ${w.index} ]</span>
                <h3 class="world-title">${w.title}</h3>
              </div>
              <div class="world-tab-right">
                <span class="world-arrow text-mono" aria-hidden="true">→</span>
              </div>
            </a>
          `).join('')}
        </nav>
      </section>
    `;
  }
}
