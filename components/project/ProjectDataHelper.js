/**
 * PRANAVI RUDRADEV PORTFOLIO — PROJECT DATA HELPER
 * 
 * Guarantees that neither homepage nor archive hardcodes content or positioning.
 * Calculates spatial CSS coordinates, categories, and document binding.
 */

import { PROJECTS } from '../../content/projects/index.js';
import { PROJECT_CATEGORIES } from '../../content/projects/types.js';

export class ProjectDataHelper {
  static getAll() {
    return [...PROJECTS];
  }

  static getFeatured() {
    return PROJECTS.filter((p) => p.featured);
  }

  static getByCategory(category) {
    return PROJECTS.filter((p) => p.category === category);
  }

  static getById(id) {
    return PROJECTS.find((p) => p.id === id);
  }

  static getCategories() {
    return Object.values(PROJECT_CATEGORIES);
  }

  /**
   * Convert project homepagePosition and visual tokens into inline CSS styles.
   * Enables dynamic, non-hardcoded spatial composition.
   */
  static getSpatialStyles(project) {
    const { colStart, colSpan, topOffset, align } = project.homepagePosition;
    
    return [
      `grid-column-start: ${colStart};`,
      `grid-column-end: span ${colSpan};`,
      `margin-top: ${topOffset};`,
      `align-self: ${align || 'start'};`,
      `transform: rotate(${project.rotation}deg);`,
      `z-index: ${project.zIndex};`,
      `--item-parallax: ${project.parallax};`,
      `--item-accent: ${project.accent};`,
    ].join(' ');
  }
}
