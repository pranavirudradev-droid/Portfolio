/**
 * PRANAVI RUDRADEV PORTFOLIO — CENTRAL STATEMENT COMPONENT
 * 
 * Strict Colour Hierarchy:
 * - Potting Soil (#4A2E27): Hero statement typography
 * - The hero statement stays calm and stable as the visual anchor
 * - Reduced editorial size: clamp(2.7rem, 4vw, 4.2rem)
 * - Exactly two lines, never wrapping into 3 or 4 lines
 * - Surrounded by the moving visual fragments (with zero photo overlap)
 */

import { HERO_STATEMENT } from '../../../content/home/statement.js';

export class CentralStatement {
  static render() {
    return `
      <section 
        class="central-statement-hero home-hero" 
        style="
          min-height: 85vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          text-align: center; 
          padding: 0 clamp(20px, 6vw, 120px); 
          position: relative;
          z-index: 10;
          pointer-events: none;
        "
      >
        <div style="max-width: 1100px; margin: 0 auto; pointer-events: auto;">
          <h2 
            class="text-display" 
            style="
              font-family: var(--font-primary, 'Satoshi', sans-serif);
              font-size: clamp(2.7rem, 4vw, 4.2rem);
              font-weight: 700;
              line-height: 1.08;
              letter-spacing: -0.035em;
              color: var(--color-potting-soil, #4A2E27);
              margin: 0;
            "
          >
            ${HERO_STATEMENT.lines ? HERO_STATEMENT.lines.map(l => `<span style="display: block; white-space: nowrap;">${l}</span>`).join('') : HERO_STATEMENT.statement}
          </h2>
        </div>
      </section>
    `;
  }
}
