# PRANAVI RUDRADEV PORTFOLIO — HOMEPAGE ARCHITECTURE & EDITING GUIDE

This document provides a comprehensive guide for managing, configuring, and updating the cinematic homepage and shared interactions.

---

## 1. Where the 14 Image Slots are Configured
The canonical image configuration is defined in:
- [`src/config/homepage.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/config/homepage.js) via the `HOME_IMAGES` array.
- Synchronized with [`content/home/imageFragments.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/content/home/imageFragments.js) and [`content/home/imageFragments.json`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/content/home/imageFragments.json).

Each slot has the following data model:
```javascript
{
  id: 'home-image-01',
  src: null,          // Path to photograph, e.g. '/assets/home/image-01.jpg'
  x: 3,               // Horizontal position (percentage)
  y: 21,              // Vertical position (percentage)
  width: 10,          // Width (percentage)
  height: 16,         // Height (percentage)
  rotation: -2,       // Organic rotational tilt (degrees)
  depth: 0.18,        // Cursor parallax depth multiplier
  scaleCategory: 'medium',
  alt: 'Description'
}
```

### Strict Spatial Rule: Zero Typography Overlap (Everywhere)
Photos must **never** sit directly underneath or behind ANY typography on the homepage or across the site:
1. **Name & Professional Descriptor:** Top left zone (X: 0% to 40%, Y: 0% to 18%) is strictly 100% free of image slots.
2. **Hero Statement:** Central zone (X: 18% to 82%, Y: 36% to 64%) is strictly 100% free of image slots, accounting for maximum displacement buffers.
3. **Scroll Indicator:** Bottom center zone (X: 42% to 58%, Y: 88% to 100%) is strictly 100% free of image slots.

The 14 slots float organically around the text in safe negative space with guaranteed zero overlap:
- Upper Canvas (Slots 10, 02, 03, 04)
- Left Flank (Slots 01, 06, 07)
- Right Flank (Slots 05, 08, 09)
- Lower Canvas (Slots 11, 12, 13, 14)

---

## 2. Cursor Movement Sensitivity (`HOME_INTERACTION`)
Cursor movement parameters are centralized in [`src/config/interactions/interactionTokens.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/config/interactions/interactionTokens.js):
```javascript
export const HOME_INTERACTION = Object.freeze({
  imageMovementStrength: 2.0,  // 2x responsive cursor multiplier
  maxX: 116,                   // ~2x horizontal deflection in pixels (horizontal is more pronounced)
  maxY: 34,                    // Quieter vertical deflection in pixels
  smoothing: 0.08              // Responsive inertia lerp factor
});
```
The spatial transform `translate3d(Xpx, Ypx, 0) rotate(Ndeg)` is applied **directly to the `.home-image-slot` parent container**, ensuring any nested `<img>` inherits motion seamlessly without code changes.

---

## 3. Horizontal Photography Viewing Experience
For photography collections (e.g. [`observatory/index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/observatory/index.html)), visitors explore complete photographs by moving LEFT and RIGHT:
- **Component:** [`src/components/media/HorizontalPhotoGallery.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/components/media/HorizontalPhotoGallery.js)
- **Styles:** [`src/styles/global/horizontal-gallery.css`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/styles/global/horizontal-gallery.css)
- **Features:**
  - Clear, understated controls (`← PREVIOUS` / `NEXT →`)
  - Trackpad horizontal swipe and mobile touch drag with `scroll-snap`
  - Keyboard navigation (`ArrowLeft` / `ArrowRight`)
  - Full uncropped viewing with `object-fit: contain !important`
  - Strict rectangular format with `border-radius: 0 !important` and `border: none !important`
  - Preserves natural aspect ratios (portrait, landscape, square)
  - Deliberate negative space separating captions from photographs (zero overlap)

---

## 4. Canonical 76px Optical Fisheye Lens Shared Everywhere
The canonical 76px optical glass loupe that actively bends, magnifies, and barrel-distorts DOM content is shared across the entire website:
- **Homepage:** [`index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/index.html)
- **About Me:** [`about/index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/about/index.html)
- **Work Experience:** [`experience/index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/experience/index.html)
- **Projects Archive:** [`projects/index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/projects/index.html)
- **The Observatory:** [`observatory/index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/observatory/index.html)
- **All 13 Project Case Study Pages:** [`projects/*/index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/projects/)

```javascript
export const FISHEYE_CONFIG = Object.freeze({
  enabled: true,
  size: 76,               // 76px compact optical loupe
  magnification: 1.08,    // 1.08x optical magnification
  distortion: 0.12,       // Radial barrel curvature factor
  smoothing: 0.18,        // Lerp tracking factor
  opacity: 1              // Full opacity when active
});
```

To include the canonical lens on any new page:
```html
<link rel="stylesheet" href="/src/styles/global/fisheye-lens.css" />
<script type="module" src="/src/components/lens-cursor/init-fisheye.js"></script>
```

---

## 5. How to Replace a Placeholder with a Real Image
In [`src/config/homepage.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/config/homepage.js), replace `src: null` with the image path:
```javascript
{
  id: 'home-image-01',
  src: '/assets/home/image-01.jpg',
  alt: 'Qualitative Field Study 01',
  ...
}
```
Or via runtime JavaScript:
```javascript
setHomeImage('home-image-01', '/assets/home/image-01.jpg', 'Field note photograph');
```
