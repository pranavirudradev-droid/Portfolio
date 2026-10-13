/**
 * PRANAVI RUDRADEV PORTFOLIO — HEADER ANCHOR COMPONENT
 * 
 * Strict Colour Hierarchy:
 * - YELLOW (#F5EFC6): Identity (PRANAVI RUDRADEV)
 * - BLUE (#A5BCD6): System indicators (descriptors, indices)
 * - Approved descriptors: Brand Strategy, Consumer Psychology, Qualitative Thinking
 */

export class HeaderAnchor {
  static render() {
    return `
      <header class="homepage-name-anchor home-interface" style="position: absolute; top: clamp(28px, 4.5vw, 52px); left: clamp(24px, 4.5vw, 68px); z-index: 20; pointer-events: auto;">
        <a href="./" style="text-decoration: none; color: inherit; display: block;" tabindex="0">
          <h1 
            style="
              font-family: var(--font-primary, 'Satoshi', sans-serif); 
              font-size: clamp(1.4rem, 2.4vw, 2.6rem); 
              font-weight: 700; 
              letter-spacing: -0.02em; 
              line-height: 1.05; 
              color: var(--color-potting-soil, #4A2E27);
              margin: 0;
            "
          >
            PRANAVI RUDRADEV
          </h1>
          <p 
            class="text-caption text-mono" 
            style="
              color: var(--color-potting-soil, #4A2E27); 
              opacity: 0.92;
              margin-top: 6px; 
              letter-spacing: 0.12em; 
              font-size: clamp(0.68rem, 0.85vw, 0.8rem);
            "
          >
            BRAND STRATEGY · CONSUMER PSYCHOLOGY · QUALITATIVE THINKING
          </p>
        </a>
      </header>
    `;
  }
}
