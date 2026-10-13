/**
 * PRANAVI RUDRADEV PORTFOLIO — HOME IMAGE FIELD COMPONENT
 * 
 * Living Photographic Field (14 Slots):
 * - Pure rectangular, borderless dark/brown placeholder boxes
 * - NO card UI, NO rounded corners, NO captions, NO labels, NO icons
 * - Layered strictly BEHIND typography (z-index: 1 vs hero z-index: 10)
 * - Multi-layer cursor parallax movement with smooth inertia
 * - Each slot will seamlessly house the photograph once `src` is provided
 * - Central hero statement stays calm and stable
 */

import { HOMEPAGE_IMAGE_FRAGMENTS } from '../../../content/home/imageFragments.js';
import { INTERACTION_TOKENS } from '../../config/interactions/interactionTokens.js';

export class HomeImageField {
  constructor(fragments = HOMEPAGE_IMAGE_FRAGMENTS) {
    this.fragments = fragments;
    this.domElements = [];
    
    // Cursor parallax coordinates with inertia
    this.targetMouse = { x: 0, y: 0 };
    this.currentMouse = { x: 0, y: 0 };
    this.rafId = null;
    this.maxX = INTERACTION_TOKENS.CURSOR_PARALLAX_MAX_X || 38;
    this.maxY = INTERACTION_TOKENS.CURSOR_PARALLAX_MAX_Y || 28;
    this.easing = INTERACTION_TOKENS.CURSOR_PARALLAX_EASING || 0.08;
  }

  static render(fragments = HOMEPAGE_IMAGE_FRAGMENTS) {
    return `
      <div class="home-image-field-canvas home-image-field" aria-hidden="true" style="z-index: 1;">
        ${fragments.map(f => {
          const depth = f.parallax || f.parallaxDepth || 0.35;
          const bg = f.placeholderColor || '#231815';
          const hasImage = Boolean(f.src && f.src.trim().length > 0);
          return `
            <div 
              class="home-image-fragment scale-${f.scaleCategory || 'medium'}" 
              id="${f.id}"
              data-depth="${depth}"
              data-rotation="${f.rotation || 0}"
              style="
                left: ${typeof f.x === 'number' ? `${f.x}%` : f.x}; 
                top: ${typeof f.y === 'number' ? `${f.y}%` : f.y}; 
                width: ${typeof f.width === 'number' ? `${f.width}%` : f.width}; 
                height: ${typeof f.height === 'number' ? `${f.height}%` : (f.height || 'auto')};
                background: transparent !important;
                z-index: ${f.zIndex || 1};
                --base-rot: ${f.rotation || 0}deg;
              "
            >
              ${hasImage ? `
                <img 
                  src="${f.src}" 
                  alt="" 
                  loading="lazy" 
                  class="fragment-photo"
                />
              ` : `
                <div class="photo-surface">
                  <svg viewBox="0 0 300 400" preserveAspectRatio="none" style="width:100%; height:100%; display:block;">
                    <defs>
                      <filter id="pfg-${f.id}">
                        <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="3" result="n" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.13 0" result="t" />
                        <feBlend in="SourceGraphic" in2="t" mode="overlay" />
                      </filter>
                      <linearGradient id="pbg-${f.id}" x1="0.1" y1="0" x2="0.9" y2="1">
                        <stop offset="0%" stop-color="#C0C6D2" />
                        <stop offset="50%" stop-color="#767C8A" />
                        <stop offset="100%" stop-color="#3C404C" />
                      </linearGradient>
                      <radialGradient id="plg-${f.id}" cx="45%" cy="35%" r="65%">
                        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.45" />
                        <stop offset="100%" stop-color="#3C404C" stop-opacity="0" />
                      </radialGradient>
                    </defs>
                    <g filter="url(#pfg-${f.id})">
                      <rect width="100%" height="100%" fill="url(#pbg-${f.id})" />
                      <rect width="100%" height="100%" fill="url(#plg-${f.id})" />
                    </g>
                  </svg>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  initCursorParallax() {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(max-width: 860px)').matches) {
      return;
    }

    this.domElements = Array.from(document.querySelectorAll('.home-image-fragment'));
    if (!this.domElements.length) return;

    // Track normalized mouse coordinates [-1, 1] relative to viewport center
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    const renderLoop = () => {
      // Smooth inertia interpolation
      this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * this.easing;
      this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * this.easing;

      const scrollY = window.scrollY;

      this.domElements.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.35;
        const baseRot = parseFloat(el.getAttribute('data-rotation')) || 0;
        
        // Multi-plane spatial deflection: deeper layers move with distinct offsets
        const moveX = this.currentMouse.x * this.maxX * depth;
        const moveY = (this.currentMouse.y * this.maxY * depth) + (scrollY * depth * 0.35);

        el.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotate(${baseRot}deg)`;
      });

      this.rafId = requestAnimationFrame(renderLoop);
    };

    this.rafId = requestAnimationFrame(renderLoop);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
