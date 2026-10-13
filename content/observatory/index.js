/**
 * PRANAVI RUDRADEV PORTFOLIO — THE OBSERVATORY
 * Maintained via /admin
 */

import { PALETTE } from '../../config/colors.js';

export const OBSERVATORY_CATEGORIES = Object.freeze({
  CULTURAL_NOTE: 'CULTURAL NOTE',
  QUALITATIVE_INQUIRY: 'QUALITATIVE INQUIRY',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  FIELD_LOG: 'FIELD LOG',
  ESSAY: 'ESSAY',
  DOCUMENTARY: 'DOCUMENTARY',
});

export const OBSERVATORY_DOCUMENTARY = {
  title: "Behind the Shadows: Crafting a Documentary on India’s Shadow Puppetry Tradition",
  badge: "FIELD OBSERVATION",
  meta: "4K UHD · 24 FPS · 18:24",
  videoSrc: "",
  description: "As the Documentary Head, I led the creative journey of this film from ideation and shot planning to post production, documenting the endangered art of Tholu Bommalata in Nimmalakunta, Andhra Pradesh. After fieldwork, the editing process became a narrative puzzle, sorting interviews, identifying emotional anchors, and carefully structuring the story to preserve authenticity. Using DaVinci Resolve and GarageBand, we worked across editing, sound design, audio treatment, and live background recreation to create an experience that felt both cinematic and respectful to the community we documented. Collaborating across teams while refining the narrative taught me how creative direction, technical execution, and cultural sensitivity come together to create meaningful visual storytelling."
};

export const OBSERVATORY_ENTRIES = [
  {
    "id": "unnoticed-rituals",
    "title": "The Invisible Choreography of Checkout Queues",
    "category": "QUALITATIVE INQUIRY",
    "date": "2024",
    "format": "field-observation",
    "summary": "Micro-behaviors observed across physical retail environments: how waiting anxiety triggers compensatory sensory browsing.",
    "media": {
      "type": "image",
      "src": "assets/observatory/images/checkout-rituals.jpg",
      "aspectRatio": "4/5",
      "alt": "Field observation study on retail queuing"
    },
    "accent": "#4D0E12"
  },
  {
    "id": "urban-semiotics-bazaar",
    "title": "Deciphering Informal Signage & Consumer Trust",
    "category": "PHOTOGRAPHY",
    "date": "2023",
    "format": "photo-essay",
    "summary": "Photographic documentation of hand-painted retail typography and intuitive trust markers in Indian local markets.",
    "media": {
      "type": "image",
      "src": "assets/observatory/images/WhatsApp_Image_2026-10-03_at_12.12.16_PM.jpeg",
      "aspectRatio": "4/5",
      "alt": "Deciphering Informal Signage & Consumer Trust"
    },
    "accent": "#4D0E12"
  },
  {
    "id": "algorithmic-exhaustion",
    "title": "Qualitative Notes on Digital Weariness",
    "category": "CULTURAL NOTE",
    "date": "2023",
    "format": "field-observation",
    "summary": "Why modern consumers increasingly crave tactile friction, paper media, and unoptimized physical spaces.",
    "media": {
      "type": "image",
      "src": "assets/observatory/images/tactile-friction.jpg",
      "aspectRatio": "4/5",
      "alt": "Tactile media study"
    },
    "accent": "#4D0E12"
  }
];
