/**
 * PRANAVI RUDRADEV PORTFOLIO — PROJECT DATA MODEL SCHEMA & VALIDATOR
 * 
 * Each project must support:
 * - id: unique string slug
 * - title: verbatim project title
 * - category: one of the 3 validated categories
 * - cover: { src, alt, aspectRatio, focalPoint }
 * - document: { type: 'pdf'|'presentation'|'image-sequence', src, pageCount, downloadable }
 * - href: internal or external link
 * - featured: boolean
 * - homepagePosition: { colStart, colSpan, topOffset, align }
 * - homepageSize: 'compact' | 'standard' | 'large' | 'panoramic' | 'monumental'
 * - rotation: number in degrees (e.g. -1.5 to +1.5)
 * - zIndex: number
 * - parallax: number
 * - accent: hex colour code
 */

export const PROJECT_CATEGORIES = Object.freeze({
  CONSUMER_PSYCHOLOGY: 'CONSUMER PSYCHOLOGY / INSIGHT',
  MARKET_RESEARCH: 'MARKET RESEARCH / CASE STUDY',
  PRODUCT_STRATEGY: 'PRODUCT / STRATEGY',
});

export const HOMEPAGE_SIZES = Object.freeze([
  'compact',
  'standard',
  'large',
  'panoramic',
  'monumental'
]);

export const DOCUMENT_TYPES = Object.freeze([
  'pdf',
  'presentation',
  'image-sequence'
]);

/**
 * Validate that a project object conforms strictly to the schema.
 * Throws a descriptive error if any required field is missing or invalid.
 */
export function validateProjectSchema(project) {
  const requiredFields = [
    'id',
    'title',
    'category',
    'cover',
    'document',
    'href',
    'featured',
    'homepagePosition',
    'homepageSize',
    'rotation',
    'zIndex',
    'parallax',
    'accent'
  ];

  for (const field of requiredFields) {
    if (project[field] === undefined) {
      throw new Error(`[PROJECT_SCHEMA_ERROR] Project "${project.id || 'unknown'}" is missing required field: "${field}"`);
    }
  }

  // Validate category
  const validCategories = Object.values(PROJECT_CATEGORIES);
  if (!validCategories.includes(project.category)) {
    throw new Error(`[PROJECT_SCHEMA_ERROR] Project "${project.id}" has invalid category "${project.category}". Allowed: ${validCategories.join(', ')}`);
  }

  // Validate homepagePosition structure
  const { colStart, colSpan } = project.homepagePosition;
  if (typeof colStart !== 'number' || typeof colSpan !== 'number') {
    throw new Error(`[PROJECT_SCHEMA_ERROR] Project "${project.id}" homepagePosition must contain numeric colStart and colSpan.`);
  }

  // Validate rotation
  if (typeof project.rotation !== 'number') {
    throw new Error(`[PROJECT_SCHEMA_ERROR] Project "${project.id}" rotation must be a numeric angle.`);
  }

  // Validate document structure
  if (!project.document.type || !DOCUMENT_TYPES.includes(project.document.type)) {
    throw new Error(`[PROJECT_SCHEMA_ERROR] Project "${project.id}" document.type must be one of: ${DOCUMENT_TYPES.join(', ')}`);
  }

  return true;
}
