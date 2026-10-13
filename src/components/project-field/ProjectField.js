/**
 * PRANAVI RUDRADEV PORTFOLIO — PROJECT FIELD COMPONENT
 * 
 * Cinematic Level: 8/10
 * Renders the 13 project covers in an asymmetric, layered spatial field.
 * Manages subtle multi-speed vertical parallax without scroll hijacking.
 */

import { HOMEPAGE_PROJECTS } from '../../../content/home/projects.js';
import { ProjectCoverItem } from './ProjectCoverItem.js';

export class ProjectField {
  constructor(projects = HOMEPAGE_PROJECTS) {
    this.projects = projects;
    this.rafId = null;
    this.items = [];
    this.ticking = false;
  }

  static render(projects = HOMEPAGE_PROJECTS) {
    return `
      <section class="project-field-container" id="project-field">
        ${projects.map(p => ProjectCoverItem.render(p)).join('')}
      </section>
    `;
  }

  initParallax() {
    // Only apply desktop parallax if not on mobile/touch
    if (window.matchMedia('(max-width: 860px)').matches || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    this.items = Array.from(document.querySelectorAll('.project-field-item'));
    if (!this.items.length) return;

    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      this.items.forEach(item => {
        const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.15;
        // Subtle vertical float offset
        const yOffset = (scrollY - item.offsetTop * 0.6) * speed * 0.28;
        item.style.setProperty('--parallax-y', `${yOffset.toFixed(2)}px`);
      });

      this.ticking = false;
    };

    window.addEventListener('scroll', () => {
      lastScrollY = window.scrollY;
      if (!this.ticking) {
        requestAnimationFrame(updateParallax);
        this.ticking = true;
      }
    }, { passive: true });

    // Initial pass
    updateParallax();
  }
}
