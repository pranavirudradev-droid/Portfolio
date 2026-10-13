/**
 * PRANAVI RUDRADEV PORTFOLIO — INTERACTION TOKENS (OPTICAL FISHEYE LENS & SPATIAL PARALLAX)
 * 
 * Centralized settings for:
 * - FISHEYE_CONFIG: Canonical optical fisheye lens loupe (76px)
 * - HOME_INTERACTION: Parallax movement sensitivity (enhanced 2x horizontal responsiveness)
 * - INTERACTION_TOKENS: Foundation interaction constants
 */

export const FISHEYE_CONFIG = Object.freeze({
  enabled: true,
  size: 76,                          // 76px compact optical loupe
  magnification: 1.08,               // 1.08x optical magnification
  distortion: 0.12,                  // Radial optical barrel curvature factor
  smoothing: 0.18,                   // Smooth lerp tracking factor
  opacity: 1                         // Full opacity when active
});

export const HOME_INTERACTION = Object.freeze({
  imageMovementStrength: 2.0,        // 2x responsive cursor multiplier
  maxX: 116,                         // Max horizontal deflection in pixels (~2x previous 58px)
  maxY: 34,                          // Max vertical deflection in pixels (horizontal is more pronounced)
  smoothing: 0.08                    // Responsive inertia lerp smoothing factor
});

export const INTERACTION_TOKENS = Object.freeze({
  // Compact 76px Optical Fisheye Loupe
  LENS_SIZE: '76px',
  LENS_DISTORTION: 0.48,             // Optical fisheye radial distortion factor (0.45-0.50 range)
  LENS_MAGNIFICATION: 1.18,          // Focal center magnification
  LENS_DISPLACEMENT_SCALE: 22,       // Displacement deflection in pixels
  LENS_OPACITY: 1.0,
  LENS_TRANSITION_SPEED: '180ms',

  // Cursor-Driven Spatial Parallax Movement
  CURSOR_PARALLAX_MAX_X: 116,        // Enhanced 2x horizontal deflection
  CURSOR_PARALLAX_MAX_Y: 34,         // Quieter vertical deflection
  CURSOR_PARALLAX_EASING: 0.08,      // Inertia lerp smoothing factor

  // Motion & Scroll
  HOVER_SCALE: 1.05,
  HOVER_DURATION: '350ms',
  HOVER_EASING: 'cubic-bezier(0.22, 1, 0.36, 1)',
  SCROLL_PARALLAX_BASE: 0.14,
});
