/**
 * PRANAVI RUDRADEV PORTFOLIO — EXPERIENCE DATA MODEL SCHEMA
 * 
 * Supports two presentation archetypes:
 * 1. 'document': Direct PDF / presentation export viewer (Avirata NGO, Origami Creative)
 * 2. 'narrative': Editorial textual structure with title, organisation, short description, and imagery
 */

import { PALETTE } from '../../config/colors.js';

export const EXPERIENCE_TYPES = Object.freeze([
  'document',
  'narrative'
]);

export function validateExperienceSchema(exp) {
  const required = ['id', 'title', 'organisation', 'type', 'accent'];
  for (const field of required) {
    if (exp[field] === undefined) {
      throw new Error(`[EXPERIENCE_SCHEMA_ERROR] Experience "${exp.id || 'unknown'}" is missing field: "${field}"`);
    }
  }

  if (!EXPERIENCE_TYPES.includes(exp.type)) {
    throw new Error(`[EXPERIENCE_SCHEMA_ERROR] Experience "${exp.id}" has invalid type "${exp.type}".`);
  }

  if (exp.type === 'document' && (!exp.document || !exp.document.src)) {
    throw new Error(`[EXPERIENCE_SCHEMA_ERROR] Document-type experience "${exp.id}" requires a valid document.src.`);
  }

  return true;
}
