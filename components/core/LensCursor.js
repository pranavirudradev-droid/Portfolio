/**
 * PRANAVI RUDRADEV PORTFOLIO — THE LENS INTERACTION ENGINE
 * 
 * Embodies the core creative concept:
 * "FINDING WHAT OTHERS OVERLOOK."
 * 
 * Perspective · Focus · Looking Closer · Reframing · Questioning
 * 
 * STRICT ARCHITECTURAL CONSTRAINTS:
 * - NO camera icons
 * - NO magnifying glass handles
 * - NO camera shutters or photography clichés
 * - Pure optical and conceptual reframing.
 */

import { INTERACTION_TOKENS } from '../../config/interaction.js';

export class LensCursor {
  constructor(options = {}) {
    this.size = options.size || INTERACTION_TOKENS.LENS_SIZE;
    this.distortion = options.distortion || INTERACTION_TOKENS.LENS_DISTORTION;
    this.magnification = options.magnification || INTERACTION_TOKENS.LENS_MAGNIFICATION;
    
    this.mouse = { x: -500, y: -500 };
    this.pos = { x: -500, y: -500 };
    this.isActive = false;
    this.currentLabel = 'LOOK CLOSER';
    this.rafId = null;

    this.domElement = null;
    this.badgeElement = null;
  }

  mount(container = document.body) {
    // Avoid double mount or activation on primary touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    if (document.querySelector('.lens-inspector')) {
      this.domElement = document.querySelector('.lens-inspector');
      this.badgeElement = this.domElement.querySelector('.lens-badge');
      return;
    }

    const lensEl = document.createElement('div');
    lensEl.className = 'lens-inspector';
    lensEl.innerHTML = `
      <div class="lens-reticle"></div>
      <span class="lens-badge">LOOK CLOSER</span>
    `;

    container.appendChild(lensEl);
    this.domElement = lensEl;
    this.badgeElement = lensEl.querySelector('.lens-badge');

    this.bindEvents();
    this.startLoop();
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    }, { passive: true });

    // Target delegation for elements that trigger the Lens inspection
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-lens], .lens-target, .editorial-image-frame');
      if (target) {
        this.isActive = true;
        this.currentLabel = target.getAttribute('data-lens-label') || 'LOOK CLOSER';
        if (this.badgeElement) {
          this.badgeElement.textContent = this.currentLabel;
        }
        if (this.domElement) {
          this.domElement.classList.add('is-active');
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-lens], .lens-target, .editorial-image-frame');
      if (target) {
        this.isActive = false;
        if (this.domElement) {
          this.domElement.classList.remove('is-active');
        }
      }
    });
  }

  startLoop() {
    const loop = () => {
      // Smooth lerp (linear interpolation)
      this.pos.x += (this.mouse.x - this.pos.x) * 0.18;
      this.pos.y += (this.mouse.y - this.pos.y) * 0.18;

      if (this.domElement) {
        this.domElement.style.left = `${this.pos.x}px`;
        this.domElement.style.top = `${this.pos.y}px`;
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.domElement && this.domElement.parentElement) {
      this.domElement.parentElement.removeChild(this.domElement);
    }
  }
}
