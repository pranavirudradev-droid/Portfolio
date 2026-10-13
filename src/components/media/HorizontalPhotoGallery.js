/**
 * PRANAVI RUDRADEV PORTFOLIO — HORIZONTAL PHOTOGRAPHY GALLERY COMPONENT
 * 
 * Observatory Full-Page Continuous Carousel:
 * - 22 portrait-oriented image placeholders with exact aspect ratio of 1600 × 2000 px (4:5)
 * - Uniform size across all placeholders with consistent spacing and alignment
 * - Smooth continuous right-to-left horizontal movement
 * - Infinite loop with zero jumps, pauses, blank gaps, or visible resets
 * - Complete preservation of uncropped rectangular photographs: object-fit: contain !important;
 * - Pure rectangular styling: border-radius: 0 !important; border: none !important;
 * - Understated editorial controls (← PREVIOUS / NEXT →), keyboard nav (ArrowLeft / ArrowRight)
 * - Zero wheel hijacking: vertical page scrolling remains 100% natural and unimpeded
 */

export class HorizontalPhotoGallery {
  constructor(options = {}) {
    this.photos = options.photos || [];
    this.containerId = options.containerId || 'horizontal-photo-gallery';
    this.currentIndex = 0;
    this.track = null;
    this.viewport = null;
    this.counterEl = null;
    this.indicators = [];
  }

  render() {
    if (!this.photos || this.photos.length === 0) {
      return '';
    }

    const totalCount = this.photos.length;
    const totalPad = String(totalCount).padStart(2, '0');

    return `
      <section class="horizontal-photo-gallery" id="${this.containerId}" aria-label="Observatory Photography Carousel">
        <!-- Horizontal Scroll Viewport & Continuous Seamless Track -->
        <div class="photo-gallery-viewport" id="${this.containerId}-viewport" tabindex="0" role="region" aria-label="Photographic slides track">
          <div class="photo-gallery-track" id="${this.containerId}-track">
            <!-- Set A: All 22 4:5 Portrait Photographs (0..N-1) -->
            <div class="photo-track-set photo-track-set-a">
              ${this.photos.map((item, idx) => this.renderSlide(item, idx, false)).join('')}
            </div>
            <!-- Set B: Seamless Cloned Sequence for Infinite Loop (0..N-1) -->
            <div class="photo-track-set photo-track-set-b" aria-hidden="true">
              ${this.photos.map((item, idx) => this.renderSlide(item, idx, true)).join('')}
            </div>
          </div>
        </div>

        <!-- Accessible Understated Editorial Controls & Counter -->
        <footer class="photo-gallery-controls" aria-label="Carousel navigation">
          <button class="gallery-ctrl-btn prev-btn" id="${this.containerId}-prev" aria-label="Previous photograph">
            <span class="btn-arrow">←</span>
            <span class="btn-label">PREVIOUS</span>
          </button>

          <div class="gallery-progress-indicators" id="${this.containerId}-indicators">
            ${this.photos.map((_, idx) => `
              <button 
                class="gallery-progress-dash ${idx === 0 ? 'is-active' : ''}" 
                data-target="${idx}" 
                aria-label="Go to photograph ${idx + 1}"
              ></button>
            `).join('')}
          </div>

          <span class="photo-gallery-counter" id="${this.containerId}-counter">[ 01 / ${totalPad} ]</span>

          <button class="gallery-ctrl-btn next-btn" id="${this.containerId}-next" aria-label="Next photograph">
            <span class="btn-label">NEXT</span>
            <span class="btn-arrow">→</span>
          </button>
        </footer>
      </section>
    `;
  }

  renderSlide(item, idx, isClone = false) {
    const displayNum = idx + 1;
    const padIdx = String(displayNum).padStart(2, '0');
    const slideId = isClone ? `${this.containerId}-clone-${idx}` : `${this.containerId}-slide-${idx}`;

    return `
      <article 
        class="photo-gallery-slide ${isClone ? 'is-clone' : ''}" 
        data-index="${idx}" 
        ${isClone ? 'data-clone="true"' : ''} 
        id="${slideId}"
      >
        <div class="photo-gallery-frame" style="aspect-ratio: 5 / 4;">
          ${item.src ? `
            <img 
              src="${item.src}" 
              alt="${item.title || 'Photographic observation'}" 
              class="photo-gallery-img"
              loading="${idx < 3 ? 'eager' : 'lazy'}"
            />
          ` : `
            <div class="photo-gallery-placeholder" style="aspect-ratio: 5 / 4;">
              <div class="placeholder-tone-plate">
                <div class="ph-reticle ph-reticle-tl" aria-hidden="true">┌</div>
                <div class="ph-reticle ph-reticle-tr" aria-hidden="true">┐</div>
                <div class="ph-reticle ph-reticle-bl" aria-hidden="true">└</div>
                <div class="ph-reticle ph-reticle-br" aria-hidden="true">┘</div>
                
                <div class="ph-center-mark">
                  <svg class="ph-aperture-icon" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#F5EFC6" stroke-width="1.2" aria-hidden="true">
                    <circle cx="14" cy="14" r="11" opacity="0.3" stroke-dasharray="2 2" />
                    <circle cx="14" cy="14" r="7" opacity="0.45" />
                    <path d="M14 3 L20 11 L16 23 L6 21 L4 10 Z" opacity="0.4" />
                    <circle cx="14" cy="14" r="2.5" fill="#F5EFC6" opacity="0.75" />
                  </svg>
                  <span class="ph-spec-ratio">2000 × 1600 PX · 5:4</span>
                  <span class="ph-spec-format">${item.title || 'FIELD PHOTOGRAPHY'}</span>
                  <span class="ph-spec-dims">[ ${padIdx} // ${String(this.photos.length).padStart(2, '0')} ]</span>
                </div>

                <div class="ph-bottom-bar">
                  <span class="ph-index-label">[ 2000 × 1600 · 5:4 ]</span>
                  <span class="ph-status-tag">PLACEHOLDER // PRESERVING PROPORTIONS</span>
                </div>
              </div>
            </div>
          `}
        </div>
      </article>
    `;
  }

  attachEvents(root = document) {
    const galleryEl = root.getElementById ? root.getElementById(this.containerId) : root.querySelector(`#${this.containerId}`);
    if (!galleryEl) return;

    this.track = galleryEl.querySelector('.photo-gallery-track');
    this.viewport = galleryEl.querySelector('.photo-gallery-viewport');
    this.counterEl = galleryEl.querySelector(`#${this.containerId}-counter`);
    const prevBtn = galleryEl.querySelector(`#${this.containerId}-prev`);
    const nextBtn = galleryEl.querySelector(`#${this.containerId}-next`);
    this.indicators = Array.from(galleryEl.querySelectorAll('.gallery-progress-dash'));

    if (!this.track) return;

    // 1. Navigation controls (Manual step / Accessible browsing)
    const setStep = (dir) => {
      const count = this.photos.length;
      this.currentIndex = ((this.currentIndex + dir) % count + count) % count;
      if (this.counterEl) {
        this.counterEl.textContent = `[ ${String(this.currentIndex + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')} ]`;
      }
      this.indicators.forEach((dash, i) => {
        dash.classList.toggle('is-active', i === this.currentIndex);
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setStep(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setStep(1);
      });
    }

    this.indicators.forEach((dash) => {
      dash.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(dash.dataset.target, 10);
        if (!isNaN(targetIdx)) {
          this.currentIndex = targetIdx;
          if (this.counterEl) {
            this.counterEl.textContent = `[ ${String(this.currentIndex + 1).padStart(2, '0')} / ${String(this.photos.length).padStart(2, '0')} ]`;
          }
          this.indicators.forEach((d, i) => {
            d.classList.toggle('is-active', i === this.currentIndex);
          });
        }
      });
    });

    // 2. Keyboard Navigation (ArrowLeft / ArrowRight)
    const handleKeyNav = (e) => {
      if (e.key === 'ArrowLeft') {
        setStep(-1);
      } else if (e.key === 'ArrowRight') {
        setStep(1);
      }
    };

    if (this.viewport) {
      this.viewport.addEventListener('keydown', handleKeyNav);
    }
    window.addEventListener('keydown', (e) => {
      const rect = galleryEl.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        handleKeyNav(e);
      }
    });

    // 3. Hover Pause / Resume
    galleryEl.addEventListener('mouseenter', () => {
      if (this.track) this.track.style.animationPlayState = 'paused';
    });
    galleryEl.addEventListener('mouseleave', () => {
      if (this.track) this.track.style.animationPlayState = 'running';
    });

    // NOTE: Zero wheel event hijacking! Natural vertical page scrolling is 100% unimpeded.
  }

  destroy() {
    if (this.track) {
      this.track.style.animation = 'none';
    }
  }
}
