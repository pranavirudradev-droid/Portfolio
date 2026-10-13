/**
 * PRANAVI RUDRADEV PORTFOLIO — COLOUR SYSTEM
 * 
 * Strict palette definition, semantic mappings, and section accent logic.
 * 
 * Primary colour: POTTING SOIL (#4A2E27)
 * 
 * CRITICAL RULE:
 * NEVER use white text on Transparent Yellow (#F5EFC6).
 * Transparent Yellow is a light paper/highlight surface; always contrast with
 * Potting Soil (#4A2E27) or Java Brown (#231815).
 */

export const PALETTE = Object.freeze({
  POTTING_SOIL: '#4A2E27',       // Primary colour — deep, earthy, foundational
  TRANSPARENT_YELLOW: '#F5EFC6', // Paper, light text, highlights, occasional light surfaces
  CERULEAN_BLUE: '#A5BCD6',      // Atmospheric, intellectual, strategic accent
  SCEPTRE_RED: '#4D0E12',        // Deep editorial crimson, sharp strategic focus
  JAVA_BROWN: '#231815',         // Grounding espresso black-brown, deep shadow
});

/**
 * Section Accent Logic:
 * - ABOUT ME: Sceptre Red
 * - WORK EXPERIENCE: Cerulean Blue
 * - PROJECTS: Cerulean Blue + Sceptre Red
 * - THE OBSERVATORY: Java Brown + small Sceptre Red interventions
 */
export const SECTION_ACCENTS = Object.freeze({
  ABOUT: {
    primary: PALETTE.SCEPTRE_RED,
    secondary: PALETTE.TRANSPARENT_YELLOW,
    background: PALETTE.POTTING_SOIL,
    text: PALETTE.TRANSPARENT_YELLOW,
    description: 'Sceptre Red accentuating personal narrative, depth, and qualitative inquiry.'
  },
  EXPERIENCE: {
    primary: PALETTE.CERULEAN_BLUE,
    secondary: PALETTE.TRANSPARENT_YELLOW,
    background: PALETTE.POTTING_SOIL,
    text: PALETTE.TRANSPARENT_YELLOW,
    description: 'Cerulean Blue indicating institutional rigor, strategic engagements, and professional practice.'
  },
  PROJECTS: {
    primary: PALETTE.CERULEAN_BLUE,
    secondary: PALETTE.SCEPTRE_RED,
    background: PALETTE.POTTING_SOIL,
    text: PALETTE.TRANSPARENT_YELLOW,
    description: 'Dual accents: Cerulean Blue for market research / consumer psychology; Sceptre Red for provocative strategic interventions.'
  },
  OBSERVATORY: {
    primary: PALETTE.JAVA_BROWN,
    secondary: PALETTE.SCEPTRE_RED,
    background: PALETTE.JAVA_BROWN,
    text: PALETTE.TRANSPARENT_YELLOW,
    description: 'Java Brown environment with surgical Sceptre Red interventions for qualitative field observations.'
  }
});

/**
 * Semantic Colour Token Mapping
 */
export const SEMANTIC_COLORS = Object.freeze({
  bg: {
    primary: PALETTE.POTTING_SOIL,
    paper: PALETTE.TRANSPARENT_YELLOW,
    deep: PALETTE.JAVA_BROWN,
    overlay: 'rgba(35, 24, 21, 0.85)',
  },
  text: {
    primary: PALETTE.TRANSPARENT_YELLOW,     // Primary light text against dark Potting Soil
    inverse: PALETTE.POTTING_SOIL,          // Text when on Transparent Yellow paper surfaces
    inverseDeep: PALETTE.JAVA_BROWN,        // High-contrast text on Transparent Yellow
    muted: 'rgba(245, 239, 198, 0.72)',     // Subdued transparent yellow
    subtle: 'rgba(245, 239, 198, 0.45)',    // Hairlines and subtle metadata
  },
  border: {
    subtle: 'rgba(245, 239, 198, 0.18)',
    active: PALETTE.CERULEAN_BLUE,
    accent: PALETTE.SCEPTRE_RED,
  },
  accent: {
    blue: PALETTE.CERULEAN_BLUE,
    red: PALETTE.SCEPTRE_RED,
  }
});

/**
 * Contrast Validator Utility
 * Enforces the strict rule: NEVER use white text on Transparent Yellow.
 */
export function validateColorContrast(foreground, background) {
  const normFg = foreground.toUpperCase().trim();
  const normBg = background.toUpperCase().trim();

  const isWhite = normFg === '#FFF' || normFg === '#FFFFFF' || normFg === 'RGB(255, 255, 255)' || normFg === 'WHITE';
  const isYellow = normBg === '#F5EFC6' || normBg === PALETTE.TRANSPARENT_YELLOW;

  if (isWhite && isYellow) {
    throw new Error('[COLOR_SYSTEM_VIOLATION]: White text on Transparent Yellow (#F5EFC6) is strictly forbidden. Use Potting Soil (#4A2E27) or Java Brown (#231815).');
  }
  return true;
}
