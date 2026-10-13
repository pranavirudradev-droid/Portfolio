# HOW TO EDIT — PRANAVI RUDRADEV PORTFOLIO

This guide explains how to maintain, expand, and customize the portfolio. Because **content and configuration are strictly separated from UI components**, you can modify projects, PDFs, images, colours, fonts, and positions without rewriting code.

See [`docs/HOMEPAGE.md`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/docs/HOMEPAGE.md) for the detailed homepage architecture guide.

---

## Quick Reference: Where is Everything?

| Task | File to Edit | Media Assets Folder |
| :--- | :--- | :--- |
| **Edit 14 Homepage Image Slots & Placeholders** | `src/config/homepage.js` | `assets/projects/covers/` or `assets/home/` |
| **Edit Central Hero Statement** | `src/config/homepage.js` & `content/home/statement.js` | — |
| **Edit Four Worlds Navigation** | `src/config/navigation.js` | — |
| **Adjust Optical Fisheye Lens & Parallax** | `src/config/interactions/interactionTokens.js` | — |
| **Add or edit projects** | `content/projects/index.js` | `assets/projects/covers/` & `assets/projects/documents/` |
| **Add or edit work experience** | `content/experience/index.js` | `assets/experience/documents/` |
| **Add photography / observatory** | `content/observatory/index.js` | `assets/observatory/images/` |
| **Edit bio, pillars, text** | `content/about/index.js` | — |
| **Change colours or accents** | `config/colors.js` | — |
| **Change fonts or scale** | `config/typography.js` | `assets/fonts/` |

---

## 1. How to Replace Homepage Images
Open [`src/config/homepage.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/config/homepage.js).
Replace `src: null` with your photograph path:
```javascript
{
  id: 'home-image-01',
  src: '/assets/home/image-01.jpg',
  x: 7,
  y: 13,
  width: 13,
  height: 19,
  rotation: -2,
  depth: 0.18,
  alt: 'Editorial photograph'
}
```
The photograph immediately renders in that exact slot, inheriting the exact movement, position, rotation, and parallax depth.

---

## 2. How to Edit the Central Hero Statement
Open [`src/config/homepage.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/config/homepage.js):
```javascript
export const HERO_STATEMENT = Object.freeze({
  lines: [
    'RIGHT QUESTIONS',
    'REVEAL WHAT OTHERS OVERLOOK.'
  ],
  statement: 'RIGHT QUESTIONS\nREVEAL WHAT OTHERS OVERLOOK.'
});
```

---

## 3. How to Adjust the Optical Fisheye Lens
Open [`src/config/interactions/interactionTokens.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/src/config/interactions/interactionTokens.js):
```javascript
export const INTERACTION_TOKENS = Object.freeze({
  LENS_SIZE: '76px',         // Compact optical loupe (70–80px)
  LENS_DISTORTION: 0.48,     // Radial barrel curvature
  LENS_MAGNIFICATION: 1.18,  // Focal center magnification
  ...
});
```

---

## 4. How to Edit the About Me Page
Open [`content/about/index.js`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/content/about/index.js) or [`about/index.html`](file:///Users/pranavi/.gemini/antigravity/scratch/pranavi-portfolio/about/index.html):
- **Introduction & Personal Statement:** Edit `introduction.narrative` or customize `introduction.editableField.defaultDraft`.
- **How I Think:** Update cognitive habits under `howIThink.principles`.
- **My Strengths:** Refine descriptions under `strengths.items`.
- **What Interests Me:** Add or update fields under `interests.items`.
- **Education:** Replace placeholders under `education.editableEntry` (`[DEGREE]`, `[INSTITUTION]`, `[DATES]`, etc.).
- **Where I Want To Go:** Customize career aspirations and target environments under `whereIWantToGo`.

---

## 5. Verification After Making Edits
Run the automated test suites anytime:
```bash
ruby tests/content/verify_content.rb
ruby tests/components/verify_components.rb
ruby tests/components/verify_about_page.rb
ruby tests/components/verify_site_interactions.rb
ruby tests/verify_system.rb
```
