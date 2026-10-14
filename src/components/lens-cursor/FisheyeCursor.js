/**
 * PRANAVI RUDRADEV PORTFOLIO — CANONICAL OPTICAL FISHEYE LENS ENGINE (SHARED)
 * 
 * Reusable master component across the entire website:
 * - Homepage (index.html)
 * - About Me (about/index.html)
 * - Work Experience (experience/index.html)
 * - Projects landing archive (projects/index.html)
 * - All individual project case study pages (projects/*)
 * - The Observatory (observatory/index.html)
 * 
 * Master Visual & Behavioural Benchmark (Matching Landing Page Exactly):
 * - 76px compact circular optical loupe with fine translucent rim
 * - 1.08x optical magnification
 * - Authentic optical radial barrel distortion via SVG feDisplacementMap (scale: 22)
 * - Live scene mirror portal bending typography, images, and backgrounds with zero displacement
 * - Translucent milky glass overlay with softly illuminated centre (35% 30%),
 *   slightly darker outer rim, and subtle inner shading
 * - Smooth lerp tracking with responsive inertia (smoothing: 0.18)
 * - Sits at z-index: 100 with pointer-events: none (never blocks clicks, selection, or video)
 * - Cleanly disabled on touch/mobile devices
 * - Real-time synchronization for moving carousels, videos, sticky navbars, and dynamic views
 */

import { FISHEYE_CONFIG, INTERACTION_TOKENS } from '../../config/interactions/interactionTokens.js';

export class FisheyeCursor {
  constructor(options = {}) {
    if (typeof window !== 'undefined' && window.__FISHEYE_INSTANCE__) {
      return window.__FISHEYE_INSTANCE__;
    }

    this.config = Object.assign({}, FISHEYE_CONFIG, options);
    this.size = this.config.size || 76;
    this.distortion = this.config.distortion || 0.12;
    this.magnification = this.config.magnification || 1.08;
    this.smoothing = this.config.smoothing || 0.18;

    this.mouse = { x: -500, y: -500 };
    this.pos = { x: -500, y: -500 };
    this.rafId = null;
    this.domElement = null;
    this.warpContainer = null;
    this.mirrorStage = null;
    this.svgFilterElement = null;
    this.mutationObserver = null;
    this.mounted = false;

    // Cached references for real-time synchronization
    this.liveCarouselTrack = null;
    this.mirrorCarouselTrack = null;
    this.liveVideo = null;
    this.mirrorVideo = null;
    this.liveAboutNav = null;
    this.mirrorAboutNav = null;
    this.liveSlots = [];
    this.mirrorSlots = [];
    this.liveHero = null;
    this.mirrorHero = null;

    if (typeof window !== 'undefined') {
      window.__FISHEYE_INSTANCE__ = this;
      window.__fisheyeLens = this;
    }
  }

  /**
   * Generates a 128x128 spherical normal map data URI for feDisplacementMap.
   * Produces authentic radial barrel distortion curving pixels outward toward the lens perimeter.
   */
  generateSphericalNormalMap(size = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    const center = size / 2;
    const radius = size / 2;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = (x - center) / radius;
        const dy = (y - center) / radius;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const idx = (y * size + x) * 4;

        if (dist <= 1.0) {
          const curve = Math.sin((dist * Math.PI) / 2);
          const dispX = dx * curve * this.distortion * 2.0;
          const dispY = dy * curve * this.distortion * 2.0;

          data[idx] = Math.min(255, Math.max(0, Math.round(128 + dispX * 127)));
          data[idx + 1] = Math.min(255, Math.max(0, Math.round(128 + dispY * 127)));
          data[idx + 2] = 128;
          data[idx + 3] = 255;
        } else {
          data[idx] = 128;
          data[idx + 1] = 128;
          data[idx + 2] = 128;
          data[idx + 3] = 255;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL('image/png');
  }

  mount(container = document.body, targetScene = null) {
    // Cleanly disable on touch-only mobile/tablet devices (allow touch laptops with mouse/trackpad)
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    if (this.mounted) return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.mount(container, targetScene), { once: true });
      return;
    }

    const normalMapUri = this.generateSphericalNormalMap(128);

    // 1. Inject or verify SVG optical barrel distortion displacement filter
    let svgFilter = document.getElementById('optical-lens-warp');
    if (!svgFilter) {
      const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.setAttribute('style', 'position: absolute; width: 0; height: 0; pointer-events: none;');
      svgEl.setAttribute('aria-hidden', 'true');
      svgEl.innerHTML = `
        <defs>
          <filter id="optical-lens-warp" x="-20%" y="-20%" width="140%" height="140%">
            <feImage id="fe-lens-displacement" href="${normalMapUri}" xlink:href="${normalMapUri}" result="radialMap" />
            <feDisplacementMap in="SourceGraphic" in2="radialMap" scale="22" xChannelSelector="R" yChannelSelector="G" result="warped" />
            <feComposite in="warped" in2="SourceAlpha" operator="in" />
          </filter>
        </defs>
      `;
      (container || document.body).appendChild(svgEl);
      this.svgFilterElement = svgEl;
    } else {
      // Ensure existing displacement map has image data set
      const displacementImg = document.getElementById('fe-lens-displacement');
      if (displacementImg) {
        displacementImg.setAttribute('href', normalMapUri);
        displacementImg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', normalMapUri);
      }
    }

    // 2. Locate or create the canonical optical loupe DOM element
    let lensEl = document.getElementById('fisheye') || document.querySelector('.fisheye-lens-loupe');
    if (!lensEl) {
      lensEl = document.createElement('div');
      lensEl.className = 'fisheye-lens-loupe';
      lensEl.id = 'fisheye';
      lensEl.style.setProperty('--lens-size', `${this.size}px`);
      lensEl.style.setProperty('--lens-opacity', String(this.config.opacity || 1.0));
      lensEl.setAttribute('aria-hidden', 'true');
      lensEl.innerHTML = `
        <div class="fisheye-lens-warp-container" id="fisheyeWarpContainer">
          <div class="fisheye-lens-mirror-stage" id="fisheyeMirrorStage"></div>
        </div>
        <div class="fisheye-lens-glass-overlay"></div>
        <div class="fisheye-lens-rim"></div>
      `;
      (container || document.body).appendChild(lensEl);
    }

    this.domElement = lensEl;
    this.warpContainer = lensEl.querySelector('.fisheye-lens-warp-container');
    this.mirrorStage = lensEl.querySelector('.fisheye-lens-mirror-stage');

    // 3. Populate mirror stage with full document coverage
    this.populateMirrorStage(targetScene);

    // 4. Setup MutationObserver for dynamic class and attribute synchronization
    this.setupObserver();

    this.mounted = true;
    this.bindEvents();
    this.startLoop();
  }

  /**
   * Clones document content into mirror stage so that coordinate (0,0) in the clone
   * matches (0,0) of the document body. This eliminates all vertical/horizontal offsets,
   * ghosting, and misalignment across headers, navbars, and main content.
   */
  populateMirrorStage(targetScene = null) {
    if (!this.mirrorStage) return;

    this.mirrorStage.innerHTML = '';

    const mirrorRoot = document.createElement('div');
    mirrorRoot.className = 'fisheye-mirror-page-root';
    mirrorRoot.id = 'siteSceneMirror';

    // Synchronize computed styles from body (background colour, text colour, typography, flex layout)
    if (typeof window !== 'undefined') {
      const bodyStyle = window.getComputedStyle(document.body);
      mirrorRoot.style.backgroundColor = bodyStyle.backgroundColor || '#231815';
      mirrorRoot.style.color = bodyStyle.color || '#F5EFC6';
      mirrorRoot.style.fontFamily = bodyStyle.fontFamily || 'Satoshi, sans-serif';
      if (bodyStyle.display === 'flex') {
        mirrorRoot.style.display = 'flex';
        mirrorRoot.style.flexDirection = bodyStyle.flexDirection || 'column';
      }
      mirrorRoot.style.minHeight = '100vh';
      mirrorRoot.style.width = '100vw';
      mirrorRoot.style.boxSizing = bodyStyle.boxSizing || 'border-box';
    }

    // Determine what to clone
    const children = Array.from(document.body.children);
    for (const child of children) {
      // Exclude the lens itself, SVG filters, scripts, and overlays
      if (child === this.domElement || child.classList.contains('fisheye-lens-loupe') || child.id === 'fisheye') continue;
      if (child.tagName === 'SCRIPT' || child.tagName === 'NOSCRIPT') continue;
      if (child.tagName === 'SVG' && child.querySelector('#optical-lens-warp')) continue;

      const clone = child.cloneNode(true);

      // Strip live IDs so there are zero ID collisions in the document, preserving them as data-lens-id
      clone.querySelectorAll('[id]').forEach((el) => {
        el.setAttribute('data-lens-id', el.id);
        el.removeAttribute('id');
      });
      if (clone.id) {
        clone.setAttribute('data-lens-id', clone.id);
        clone.removeAttribute('id');
      }

      // Remove any scripts inside clone
      clone.querySelectorAll('script, noscript').forEach((s) => s.remove());

      // Mute cloned videos
      clone.querySelectorAll('video').forEach((v) => {
        v.muted = true;
        v.removeAttribute('autoplay');
        v.setAttribute('aria-hidden', 'true');
        v.pause();
      });

      // Disable autonomous CSS animation on carousel tracks in clone so it can be strictly synchronized
      clone.querySelectorAll('.carousel-track').forEach((t) => {
        t.style.animation = 'none';
      });

      mirrorRoot.appendChild(clone);
    }

    this.mirrorStage.appendChild(mirrorRoot);
    this.refreshDynamicReferences();
  }

  /**
   * Caches direct references to live and cloned interactive elements for 60fps/120fps sync.
   */
  refreshDynamicReferences() {
    if (!this.mirrorStage) return;

    this.liveCarouselTrack = document.querySelector('.carousel-track');
    this.mirrorCarouselTrack = this.mirrorStage.querySelector('.carousel-track');

    this.liveVideo = document.querySelector('.obs-doc-video');
    this.mirrorVideo = this.mirrorStage.querySelector('.obs-doc-video');

    this.liveAboutNav = document.querySelector('.about-nav');
    this.mirrorAboutNav = this.mirrorStage.querySelector('.about-nav');

    this.liveSlots = Array.from(document.querySelectorAll('#home .home-image-slot'));
    this.mirrorSlots = Array.from(this.mirrorStage.querySelectorAll('.home-image-slot'));

    this.liveHero = document.getElementById('heroStatement');
    this.mirrorHero = this.mirrorStage.querySelector('.home-hero-statement');

    this.liveDocOverlay = document.querySelector('.doc-viewer-overlay');
    this.mirrorDocOverlay = this.mirrorStage.querySelector('.doc-viewer-overlay');
    this.liveDocTrack = document.querySelector('.doc-viewer-track');
    this.mirrorDocTrack = this.mirrorStage.querySelector('.doc-viewer-track');
  }

  /**
   * Observes live DOM attribute changes (like folder view tab switching in projects/index.html)
   * and synchronizes them to the corresponding elements in the mirror stage.
   */
  setupObserver() {
    if (typeof MutationObserver === 'undefined') return;

    this.mutationObserver = new MutationObserver((mutations) => {
      if (!this.mirrorStage) return;

      for (const m of mutations) {
        if (m.type === 'attributes') {
          const liveEl = m.target;
          if (liveEl.closest && liveEl.closest('#fisheye')) continue;

          const attrName = m.attributeName;
          if (['class', 'aria-selected', 'aria-checked', 'aria-hidden'].includes(attrName)) {
            let mirrorEl = null;
            if (liveEl.id) {
              mirrorEl = this.mirrorStage.querySelector(`[data-lens-id="${liveEl.id}"]`);
            }

            if (mirrorEl && typeof mirrorEl.setAttribute === 'function') {
              mirrorEl.setAttribute(attrName, liveEl.getAttribute(attrName));
            }
          }
        }
      }
    });

    this.mutationObserver.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['class', 'aria-selected', 'aria-checked', 'aria-hidden']
    });
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (this.domElement && !this.domElement.classList.contains('is-active')) {
        this.domElement.classList.add('is-active');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      if (this.domElement) {
        this.domElement.classList.remove('is-active');
      }
    });

    document.addEventListener('mouseenter', () => {
      if (this.domElement) {
        this.domElement.classList.add('is-active');
      }
    });
  }

  startLoop() {
    const halfSize = this.size / 2;
    const M = this.magnification;

    const loop = () => {
      // 1. Smooth inertia lerp tracking
      this.pos.x += (this.mouse.x - this.pos.x) * this.smoothing;
      this.pos.y += (this.mouse.y - this.pos.y) * this.smoothing;

      // 2. Position the physical loupe
      if (this.domElement) {
        this.domElement.style.left = `${this.pos.x.toFixed(2)}px`;
        this.domElement.style.top = `${this.pos.y.toFixed(2)}px`;
      }

      // 3. Move the mirror stage so the exact content under cursor is centered and magnified
      if (this.mirrorStage) {
        const scrollX = window.scrollX || window.pageXOffset || 0;
        const scrollY = window.scrollY || window.pageYOffset || 0;
        const mirrorX = (halfSize - (this.pos.x + scrollX) * M).toFixed(2);
        const mirrorY = (halfSize - (this.pos.y + scrollY) * M).toFixed(2);
        this.mirrorStage.style.transform = `translate3d(${mirrorX}px, ${mirrorY}px, 0) scale(${M})`;
      }

      // 4. Real-time synchronization of dynamic components:
      // a. Observatory Carousel Track: exact frame-by-frame matrix match
      if (this.liveCarouselTrack && this.mirrorCarouselTrack) {
        const computedTransform = window.getComputedStyle(this.liveCarouselTrack).transform;
        if (computedTransform && computedTransform !== 'none') {
          this.mirrorCarouselTrack.style.transform = computedTransform;
        }
      }

      // b. Observatory Documentary Video: playback & timestamp synchronization
      if (this.liveVideo && this.mirrorVideo) {
        if (!this.liveVideo.paused && this.mirrorVideo.paused) {
          this.mirrorVideo.play().catch(() => {});
        } else if (this.liveVideo.paused && !this.mirrorVideo.paused) {
          this.mirrorVideo.pause();
        }
        if (Math.abs(this.mirrorVideo.currentTime - this.liveVideo.currentTime) > 0.15) {
          this.mirrorVideo.currentTime = this.liveVideo.currentTime;
        }
      }

      // c. Sticky About Navigation: stays aligned with viewport scroll
      if (this.liveAboutNav && this.mirrorAboutNav) {
        const scrollY = window.scrollY || 0;
        this.mirrorAboutNav.style.transform = `translate3d(0, ${scrollY}px, 0)`;
      }

      // d. Homepage image parallax slots: lockstep transform synchronization
      if (this.liveSlots.length > 0 && this.mirrorSlots.length > 0) {
        for (let i = 0; i < this.liveSlots.length; i++) {
          if (this.mirrorSlots[i] && this.liveSlots[i].style.transform) {
            this.mirrorSlots[i].style.transform = this.liveSlots[i].style.transform;
          }
        }
      }
      if (this.liveHero && this.mirrorHero && this.liveHero.style.transform) {
        this.mirrorHero.style.transform = this.liveHero.style.transform;
      }

      // e. Document Viewer Overlay: Hide lens cursor completely while document is open
      const docOverlay = this.liveDocOverlay || document.querySelector('.doc-viewer-overlay');
      const isDocOpen = (docOverlay && docOverlay.classList.contains('is-open')) || document.body.classList.contains('has-doc-open');

      if (isDocOpen) {
        if (this.domElement) {
          this.domElement.style.display = 'none';
          this.domElement.classList.remove('is-active');
        }
      } else {
        if (this.domElement && this.domElement.style.display === 'none') {
          this.domElement.style.display = '';
        }
      }

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  syncScene() {
    this.populateMirrorStage();
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.mutationObserver) this.mutationObserver.disconnect();
    if (this.domElement && this.domElement.parentElement) {
      this.domElement.parentElement.removeChild(this.domElement);
    }
    if (this.svgFilterElement && this.svgFilterElement.parentElement) {
      this.svgFilterElement.parentElement.removeChild(this.svgFilterElement);
    }
    this.mounted = false;
    if (typeof window !== 'undefined' && window.__FISHEYE_INSTANCE__ === this) {
      window.__FISHEYE_INSTANCE__ = null;
    }
  }
}
