/**
 * PRANAVI RUDRADEV PORTFOLIO — TYPOGRAPHY SYSTEM
 * 
 * Primary Typeface: SATOSHI
 * Used for:
 * - headings
 * - body
 * - navigation
 * - labels
 * - metadata
 * - captions
 * 
 * Centralized, fluid, and easily swappable without altering UI components.
 */

export const FONT_FAMILY = Object.freeze({
  primary: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace", // For technical metadata and index markers
});

export const FONT_WEIGHT = Object.freeze({
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
  black: 900,
});

/**
 * Fluid typographic scale using CSS clamp()
 * Maintains editorial impact across mobile, tablet, desktop, and ultra-wide displays.
 */
export const DISPLAY_SIZE = Object.freeze({
  clamp: 'clamp(3.75rem, 8.5vw, 9.5rem)',
  desktop: '8.5rem',
  tablet: '5.5rem',
  mobile: '3.75rem',
});

export const H1_SIZE = Object.freeze({
  clamp: 'clamp(2.5rem, 5.2vw, 5.5rem)',
  desktop: '5.2rem',
  tablet: '3.8rem',
  mobile: '2.5rem',
});

export const H2_SIZE = Object.freeze({
  clamp: 'clamp(1.75rem, 3.4vw, 3.25rem)',
  desktop: '3.25rem',
  tablet: '2.4rem',
  mobile: '1.75rem',
});

export const H3_SIZE = Object.freeze({
  clamp: 'clamp(1.35rem, 2.2vw, 2.1rem)',
  desktop: '2.1rem',
  tablet: '1.75rem',
  mobile: '1.35rem',
});

export const BODY_SIZE = Object.freeze({
  clamp: 'clamp(1rem, 1.25vw, 1.3rem)',
  desktop: '1.25rem',
  tablet: '1.1rem',
  mobile: '1rem',
});

export const CAPTION_SIZE = Object.freeze({
  clamp: 'clamp(0.75rem, 0.9vw, 0.875rem)',
  desktop: '0.875rem',
  tablet: '0.825rem',
  mobile: '0.75rem',
});

export const NAV_SIZE = Object.freeze({
  clamp: 'clamp(0.85rem, 1vw, 1rem)',
  desktop: '1rem',
  tablet: '0.925rem',
  mobile: '0.85rem',
});

export const LINE_HEIGHT = Object.freeze({
  display: '0.92',    // Tight, sculptural editorial presence
  heading: '1.08',    // Controlled, commanding titles
  tight: '1.25',      // Subheadings & pull quotes
  body: '1.62',       // High legibility for long-form strategy reading
  caption: '1.4',     // Compact metadata and footnotes
});

export const LETTER_SPACING = Object.freeze({
  display: '-0.035em',  // Optical condensation for large display text
  heading: '-0.02em',   // Natural optical spacing for titles
  body: '-0.01em',      // Refined body reading
  nav: '0.04em',        // Subtle tracking for navigation clarity
  uppercase: '0.08em',  // Wide spacing for categories, badges, and metadata labels
  mono: '0.02em',
});

/**
 * Composite typography presets for fast, consistent application
 */
export const TYPOGRAPHY_PRESETS = Object.freeze({
  heroStatement: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: DISPLAY_SIZE.clamp,
    fontWeight: FONT_WEIGHT.black,
    lineHeight: LINE_HEIGHT.display,
    letterSpacing: LETTER_SPACING.display,
    textTransform: 'none',
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: H1_SIZE.clamp,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.heading,
    letterSpacing: LETTER_SPACING.heading,
    textTransform: 'none',
  },
  projectTitle: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: H2_SIZE.clamp,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.tight,
    letterSpacing: LETTER_SPACING.heading,
  },
  bodyCopy: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: BODY_SIZE.clamp,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.body,
    letterSpacing: LETTER_SPACING.body,
  },
  categoryLabel: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: CAPTION_SIZE.clamp,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.caption,
    letterSpacing: LETTER_SPACING.uppercase,
    textTransform: 'uppercase',
  },
  navigationLink: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: NAV_SIZE.clamp,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: '1',
    letterSpacing: LETTER_SPACING.nav,
    textTransform: 'uppercase',
  },
  metadataCode: {
    fontFamily: FONT_FAMILY.mono,
    fontSize: CAPTION_SIZE.clamp,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.caption,
    letterSpacing: LETTER_SPACING.mono,
  }
});
