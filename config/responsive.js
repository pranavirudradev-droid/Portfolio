/**
 * PRANAVI RUDRADEV PORTFOLIO — RESPONSIVE & GRID SYSTEM
 * 
 * Defines breakpoints, spacing scales, and asymmetric editorial grid systems.
 */

export const BREAKPOINTS = Object.freeze({
  mobile: '360px',
  phablet: '576px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
  wide: '1920px',
});

export const MEDIA_QUERIES = Object.freeze({
  mobile: `(min-width: ${BREAKPOINTS.mobile})`,
  tablet: `(min-width: ${BREAKPOINTS.tablet})`,
  laptop: `(min-width: ${BREAKPOINTS.laptop})`,
  desktop: `(min-width: ${BREAKPOINTS.desktop})`,
  wide: `(min-width: ${BREAKPOINTS.wide})`,
});

export const SPACING = Object.freeze({
  none: '0',
  xxs: '4px',
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '36px',
  xl: '54px',
  xxl: '80px',
  section: 'clamp(80px, 12vw, 180px)',     // Editorial breath between major chapters
  gutter: 'clamp(16px, 3.5vw, 48px)',      // Fluid column gutter
  margin: 'clamp(20px, 5vw, 80px)',        // Fluid page side-margins
});

export const GRID = Object.freeze({
  columns: 12,
  maxWidth: '1720px',
  asymmetricOffsets: [
    { name: 'lead-left', colStart: 1, colSpan: 7 },
    { name: 'float-right', colStart: 8, colSpan: 5 },
    { name: 'center-focus', colStart: 3, colSpan: 8 },
    { name: 'wide-span', colStart: 2, colSpan: 10 },
    { name: 'monumental', colStart: 1, colSpan: 12 },
  ]
});

export const SHADOW = Object.freeze({
  none: 'none',
  editorialSubtle: '0 8px 30px rgba(35, 24, 21, 0.12)',
  documentFloat: '0 24px 60px rgba(35, 24, 21, 0.28)',
  paperElevation: '0 4px 18px rgba(0, 0, 0, 0.16)',
});

export const BORDER = Object.freeze({
  none: 'none',
  hairline: '1px solid rgba(245, 239, 198, 0.16)',
  accentBlue: '1px solid #A5BCD6',
  accentRed: '1px solid #4D0E12',
  radiusNone: '0px', // Strict: rectangular editorial imagery, no rounded corners
});
