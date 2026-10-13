/**
 * PRANAVI RUDRADEV PORTFOLIO — CENTRALIZED DESIGN TOKENS
 * 
 * Single source of truth for:
 * COLORS, TYPOGRAPHY, SPACING, GRID, SHADOW, BORDER, ANIMATION,
 * CURSOR, IMAGE, BREAKPOINTS, and INTERACTION tokens.
 */

import { PALETTE, SECTION_ACCENTS, SEMANTIC_COLORS } from './colors.js';
import { 
  FONT_FAMILY, 
  FONT_WEIGHT, 
  DISPLAY_SIZE, 
  H1_SIZE, 
  H2_SIZE, 
  H3_SIZE, 
  BODY_SIZE, 
  CAPTION_SIZE, 
  NAV_SIZE, 
  LINE_HEIGHT, 
  LETTER_SPACING, 
  TYPOGRAPHY_PRESETS 
} from './typography.js';
import { INTERACTION_TOKENS } from './interaction.js';
import { BREAKPOINTS, MEDIA_QUERIES, SPACING, GRID, SHADOW, BORDER } from './responsive.js';

export const IMAGE_TOKENS = Object.freeze({
  borderRadius: '0px',             // Strict rule: no rounded corners
  border: 'none',                   // Strict rule: no generic borders
  frame: 'none',                    // Strict rule: no white frames
  container: 'plain-placed',        // Strict rule: no card containers
  objectFit: 'cover',
  objectPosition: 'center center',
  editorialShadow: SHADOW.editorialSubtle,
  transition: 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1), filter 500ms ease',
  filterNormal: 'contrast(102%) saturate(96%)',
  filterInspected: 'contrast(106%) saturate(102%)',
});

export const CURSOR_TOKENS = Object.freeze({
  sizeDefault: '10px',
  sizeHover: '56px',
  sizeLens: INTERACTION_TOKENS.LENS_SIZE,
  color: PALETTE.TRANSPARENT_YELLOW,
  blendMode: 'difference',
  lag: 0.15,
});

export const ANIMATION_TOKENS = Object.freeze({
  durations: {
    instant: '150ms',
    fast: '250ms',
    standard: '380ms',
    deliberate: '600ms',
    curtain: '850ms',
  },
  easings: {
    editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
    cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fluid: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
});

export const TOKENS = Object.freeze({
  COLORS: {
    palette: PALETTE,
    semantic: SEMANTIC_COLORS,
    sectionAccents: SECTION_ACCENTS,
  },
  TYPOGRAPHY: {
    family: FONT_FAMILY,
    weight: FONT_WEIGHT,
    display: DISPLAY_SIZE,
    h1: H1_SIZE,
    h2: H2_SIZE,
    h3: H3_SIZE,
    body: BODY_SIZE,
    caption: CAPTION_SIZE,
    nav: NAV_SIZE,
    lineHeight: LINE_HEIGHT,
    letterSpacing: LETTER_SPACING,
    presets: TYPOGRAPHY_PRESETS,
  },
  SPACING,
  GRID,
  SHADOW,
  BORDER,
  ANIMATION: ANIMATION_TOKENS,
  CURSOR: CURSOR_TOKENS,
  IMAGE: IMAGE_TOKENS,
  BREAKPOINTS,
  MEDIA_QUERIES,
  INTERACTION: INTERACTION_TOKENS,
});

/**
 * Generate CSS Custom Properties (:root stylesheet string)
 * Keeps JS tokens and CSS stylesheet in 100% synchrony.
 */
export function generateCssVariables() {
  return `
:root {
  /* ==================== COLOUR TOKENS ==================== */
  --color-potting-soil: ${PALETTE.POTTING_SOIL};
  --color-transparent-yellow: ${PALETTE.TRANSPARENT_YELLOW};
  --color-cerulean-blue: ${PALETTE.CERULEAN_BLUE};
  --color-sceptre-red: ${PALETTE.SCEPTRE_RED};
  --color-java-brown: ${PALETTE.JAVA_BROWN};

  --bg-primary: var(--color-potting-soil);
  --bg-paper: var(--color-transparent-yellow);
  --bg-deep: var(--color-java-brown);

  --text-primary: var(--color-transparent-yellow);
  --text-inverse: var(--color-potting-soil);
  --text-inverse-deep: var(--color-java-brown);
  --text-muted: rgba(245, 239, 198, 0.72);
  --text-subtle: rgba(245, 239, 198, 0.45);

  --accent-blue: var(--color-cerulean-blue);
  --accent-red: var(--color-sceptre-red);

  /* Section Accents */
  --accent-about: ${SECTION_ACCENTS.ABOUT.primary};
  --accent-experience: ${SECTION_ACCENTS.EXPERIENCE.primary};
  --accent-projects-blue: ${SECTION_ACCENTS.PROJECTS.primary};
  --accent-projects-red: ${SECTION_ACCENTS.PROJECTS.secondary};
  --accent-observatory: ${SECTION_ACCENTS.OBSERVATORY.secondary};

  /* ==================== TYPOGRAPHY TOKENS ==================== */
  --font-primary: ${FONT_FAMILY.primary};
  --font-mono: ${FONT_FAMILY.mono};

  --font-size-display: ${DISPLAY_SIZE.clamp};
  --font-size-h1: ${H1_SIZE.clamp};
  --font-size-h2: ${H2_SIZE.clamp};
  --font-size-h3: ${H3_SIZE.clamp};
  --font-size-body: ${BODY_SIZE.clamp};
  --font-size-caption: ${CAPTION_SIZE.clamp};
  --font-size-nav: ${NAV_SIZE.clamp};

  --font-weight-light: ${FONT_WEIGHT.light};
  --font-weight-regular: ${FONT_WEIGHT.regular};
  --font-weight-medium: ${FONT_WEIGHT.medium};
  --font-weight-bold: ${FONT_WEIGHT.bold};
  --font-weight-black: ${FONT_WEIGHT.black};

  --line-height-display: ${LINE_HEIGHT.display};
  --line-height-heading: ${LINE_HEIGHT.heading};
  --line-height-tight: ${LINE_HEIGHT.tight};
  --line-height-body: ${LINE_HEIGHT.body};
  --line-height-caption: ${LINE_HEIGHT.caption};

  --letter-spacing-display: ${LETTER_SPACING.display};
  --letter-spacing-heading: ${LETTER_SPACING.heading};
  --letter-spacing-body: ${LETTER_SPACING.body};
  --letter-spacing-nav: ${LETTER_SPACING.nav};
  --letter-spacing-uppercase: ${LETTER_SPACING.uppercase};

  /* ==================== SPACING & GRID ==================== */
  --space-xxs: ${SPACING.xxs};
  --space-xs: ${SPACING.xs};
  --space-sm: ${SPACING.sm};
  --space-md: ${SPACING.md};
  --space-lg: ${SPACING.lg};
  --space-xl: ${SPACING.xl};
  --space-xxl: ${SPACING.xxl};
  --space-section: ${SPACING.section};
  --space-gutter: ${SPACING.gutter};
  --space-margin: ${SPACING.margin};

  --grid-columns: ${GRID.columns};
  --grid-max-width: ${GRID.maxWidth};

  /* ==================== IMAGE SYSTEM ==================== */
  --image-radius: ${IMAGE_TOKENS.borderRadius};
  --image-border: ${IMAGE_TOKENS.border};
  --image-transition: ${IMAGE_TOKENS.transition};

  /* ==================== INTERACTION & THE LENS ==================== */
  --lens-size: ${INTERACTION_TOKENS.LENS_SIZE};
  --lens-distortion: ${INTERACTION_TOKENS.LENS_DISTORTION};
  --lens-magnification: ${INTERACTION_TOKENS.LENS_MAGNIFICATION};
  --hover-scale: ${INTERACTION_TOKENS.HOVER_SCALE};
  --hover-duration: ${INTERACTION_TOKENS.HOVER_DURATION};
  --hover-easing: ${INTERACTION_TOKENS.HOVER_EASING};
  --page-transition-speed: ${INTERACTION_TOKENS.PAGE_TRANSITION_SPEED};
  --page-transition-easing: ${INTERACTION_TOKENS.PAGE_TRANSITION_EASING};
  --parallax-strength: ${INTERACTION_TOKENS.PARALLAX_STRENGTH};

  /* ==================== BORDER & SHADOW ==================== */
  --border-subtle: ${BORDER.hairline};
  --shadow-subtle: ${SHADOW.editorialSubtle};
  --shadow-document: ${SHADOW.documentFloat};
}
`;
}
