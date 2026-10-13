/**
 * PRANAVI RUDRADEV PORTFOLIO — HOMEPAGE ROOT VIEW (FINAL ART-DIRECTION REFINEMENT)
 * 
 * Strict Colour Hierarchy:
 * - YELLOW (#F5EFC6): Name, hero statement, major headings, navigation titles
 * - BLUE (#A5BCD6): Section numbers [01]-[04], indices, arrows
 * - RED (#4D0E12): Rare accent detail only
 * - Potting Soil (#4A2E27): Dominant canvas background
 * 
 * Strict Z-Index Layers:
 * - .home-background: z-index: 0
 * - .home-image-field: z-index: 1
 * - .home-hero: z-index: 10
 * - .home-interface: z-index: 20
 * - .fisheye-lens: z-index: 100
 * 
 * Stage 1: The Opening Screen
 * - Identity (PRANAVI RUDRADEV + Descriptors) scrolls away naturally (NOT sticky)
 * - Central Statement: [HERO STATEMENT] calm centered anchor
 * - Photographic Field: 14 borderless rectangular placeholder boxes with multi-depth parallax
 * 
 * Stage 2: The Four Worlds Navigation
 * - Streamlined minimal architecture with subtitles removed
 * - Titles ~30% smaller, blue numbers, yellow headings
 * - No browser blue outline on click/focus
 */

import { HeaderAnchor } from '../../components/navigation/HeaderAnchor.js';
import { CentralStatement } from '../../components/shared/CentralStatement.js';
import { HomeImageField } from '../../components/project-field/HomeImageField.js';
import { FourWorldsNavigation } from '../../components/navigation/FourWorldsNavigation.js';
import { FisheyeCursor } from '../../components/lens-cursor/FisheyeCursor.js';
import { HOMEPAGE_IMAGE_FRAGMENTS } from '../../../content/home/imageFragments.js';

export class HomePage {
  static render() {
    return `
      <div class="homepage-root home-background" style="min-height: 100vh; position: relative; background: var(--bg-primary, #4A2E27);">
        
        <!-- STAGE 1: THE OPENING SCENE -->
        <div class="opening-home-stage">
          <!-- 1. Identity & Descriptors: Positioned absolute inside Stage 1 to scroll away naturally -->
          ${HeaderAnchor.render()}

          <!-- 2. Photographic Field: 14 borderless rectangular boxes (Layered strictly behind typography: z-index: 1) -->
          ${HomeImageField.render(HOMEPAGE_IMAGE_FRAGMENTS)}

          <!-- 3. Central Hero Statement (Calm visual anchor: z-index: 10) -->
          ${CentralStatement.render()}
          
          <!-- 4. Subtle Stage 1 Scroll Indicator (z-index: 20) -->
          <a href="#worlds-stage" class="stage-scroll-indicator text-caption text-mono home-interface" aria-label="Scroll to portfolio worlds">
            <span style="font-size: 0.72rem; letter-spacing: 0.16em;">SCROLL</span>
            <span style="font-size: 1.05rem; line-height: 1;" aria-hidden="true">↓</span>
          </a>
        </div>

        <!-- STAGE 2: THE FOUR WORLDS NAVIGATION -->
        ${FourWorldsNavigation.render()}
      </div>
    `;
  }

  static init() {
    // 1. Mount the compact 75px optical fisheye lens
    const fisheye = new FisheyeCursor();
    fisheye.mount();

    // 2. Initialize the cursor-driven spatial parallax field for the 14 floating fragments
    const imageField = new HomeImageField(HOMEPAGE_IMAGE_FRAGMENTS);
    imageField.initCursorParallax();
  }
}
