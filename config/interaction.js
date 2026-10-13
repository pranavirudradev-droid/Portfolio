/**
 * PRANAVI RUDRADEV PORTFOLIO — INTERACTION & MOTION TOKENS
 * 
 * Central idea: FINDING WHAT OTHERS OVERLOOK.
 * Secondary metaphor: THE LENS.
 * 
 * The Lens represents:
 * - perspective
 * - focus
 * - looking closer
 * - reframing
 * - questioning
 * - seeing something that was already there
 * 
 * STRICT ARCHITECTURAL RULE:
 * Do NOT make the website literally camera-themed.
 * Do NOT use excessive camera icons, magnifying glasses, literal lenses, or photography clichés.
 * The lens is an optical and perceptual metaphor — expressed through subtle reframing,
 * focal shift, variable depth, and qualitative inspection.
 */

export const INTERACTION_TOKENS = Object.freeze({
  // The Lens tokens: subtle perceptual inquiry, not literal gimmicks
  LENS_SIZE: '260px',                 // Diameter of the focal inspection field
  LENS_DISTORTION: 0.06,              // Very subtle optical refraction factor
  LENS_MAGNIFICATION: 1.12,           // Tactile focal shift to examine details
  LENS_BLUR_OUTSIDE: '0px',           // Kept crisp; we reframe without muddying
  LENS_BORDER_OPACITY: 0.22,          // Ultra-fine hairline demarcation

  // Hover & micro-interaction tokens
  HOVER_SCALE: 1.025,                 // Gentle physical lift without bouncy playfulness
  HOVER_DURATION: '380ms',            // Sophisticated, deliberate transition timing
  HOVER_EASING: 'cubic-bezier(0.22, 1, 0.36, 1)', // Smooth cinematic cubic bezier

  // Global page and scroll transitions
  PAGE_TRANSITION_SPEED: '600ms',     // Editorial curtain / cross-fade speed
  PAGE_TRANSITION_EASING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  SCROLL_SPEED: 1.0,                  // Natural smooth scrolling
  PARALLAX_STRENGTH: 0.16,            // Spatial depth factor for placed imagery

  // Editorial cursor states
  CURSOR_INSPECT_LABEL: 'LOOK CLOSER',
  CURSOR_READ_LABEL: 'EXAMINE',
  CURSOR_VIEW_LABEL: 'OPEN DOCUMENT',

  // Anti-cliché constraints (guaranteed programmatic guard)
  PROHIBITED_MOTIFS: Object.freeze({
    cameraIcons: false,
    magnifyingGlassIcons: false,
    literalApertures: false,
    filmStripBorders: false,
    childishAnimations: false,
    bouncyPhysics: false,
  })
});
