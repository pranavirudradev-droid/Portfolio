/**
 * PRANAVI RUDRADEV PORTFOLIO — THE OBSERVATORY
 * 
 * Space for:
 * - cultural observations
 * - qualitative notes
 * - photography (22 authentic 4:5 portrait photographic observations)
 * - documentary / visual ethnographies
 * 
 * Section accent logic:
 * Java Brown (#231815) environment with small surgical Sceptre Red (#4D0E12) interventions
 * and Cerulean Blue (#A5BCD6) subheadings, Transparent Yellow (#F5EFC6) text.
 */

import { PALETTE } from '../../config/colors.js';

export const OBSERVATORY_CATEGORIES = Object.freeze({
  CULTURAL_NOTE: 'CULTURAL NOTE',
  QUALITATIVE_INQUIRY: 'QUALITATIVE INQUIRY',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  FIELD_LOG: 'FIELD LOG',
  ESSAY: 'ESSAY',
});

export const OBSERVATORY_ENTRIES = [
  {
    id: 'unnoticed-rituals',
    title: 'The Invisible Choreography of Checkout Queues',
    category: OBSERVATORY_CATEGORIES.QUALITATIVE_INQUIRY,
    date: '2024',
    format: 'field-observation',
    summary: 'Micro-behaviors observed across physical retail environments: how waiting anxiety triggers compensatory sensory browsing.',
    media: {
      type: 'image',
      src: 'assets/observatory/images/checkout-rituals.jpg',
      aspectRatio: '4/5',
      alt: 'Field observation study on retail queuing',
    },
    accent: PALETTE.SCEPTRE_RED,
  },
  {
    id: 'urban-semiotics-bazaar',
    title: 'Deciphering Informal Signage & Consumer Trust',
    category: OBSERVATORY_CATEGORIES.PHOTOGRAPHY,
    date: '2023',
    format: 'photo-essay',
    summary: 'Photographic documentation of hand-painted retail typography and intuitive trust markers in Indian local markets.',
    media: {
      type: 'image',
      src: 'assets/observatory/images/informal-signage.jpg',
      aspectRatio: '4/5',
      alt: 'Photographic study on local bazaar typography',
    },
    accent: PALETTE.SCEPTRE_RED,
  },
  {
    id: 'algorithmic-exhaustion',
    title: 'Qualitative Notes on Digital Weariness',
    category: OBSERVATORY_CATEGORIES.CULTURAL_NOTE,
    date: '2023',
    format: 'field-observation',
    summary: 'Why modern consumers increasingly crave tactile friction, paper media, and unoptimized physical spaces.',
    media: {
      type: 'image',
      src: 'assets/observatory/images/tactile-friction.jpg',
      aspectRatio: '4/5',
      alt: 'Tactile media study',
    },
    accent: PALETTE.SCEPTRE_RED,
  }
];

/**
 * Photographic Collection: Exactly 22 Field Photographs
 * Exact aspect ratio of 2000 × 1600 px (5:4) for all 22 placeholders.
 */
export const OBSERVATORY_PHOTOS = [
  {
    id: 'photo-01',
    src: '../assets/observatory/images/beetle-macro.jpg',
    title: 'Micro-Territories: The Jewel Bug',
    caption: 'Observing iridescent structural coloration and survival camouflage across grass stems.',
    context: 'Natural Semiotics · 2024 · Field Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Macro Observation · 5:4'
  },
  {
    id: 'photo-02',
    src: '../assets/observatory/images/checkout-rituals.jpg',
    title: 'The Invisible Choreography of Checkout Queues',
    caption: 'Micro-behaviors observed across physical retail environments: how waiting anxiety triggers compensatory browsing.',
    context: 'Retail Ethnography · 2024 · Field Observation',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Portrait Frame · 5:4'
  },
  {
    id: 'photo-03',
    src: '../assets/observatory/images/tactile-friction.jpg',
    title: 'Qualitative Notes on Digital Weariness',
    caption: 'Why modern consumers increasingly crave tactile friction, paper media, and unoptimized physical spaces.',
    context: 'Consumer Psychology · 2023 · Cultural Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Medium Format · 5:4'
  },
  {
    id: 'photo-04',
    src: '../assets/observatory/images/informal-signage.jpg',
    title: 'Deciphering Informal Signage & Consumer Trust',
    caption: 'Photographic documentation of hand-painted retail typography and intuitive trust markers in Indian local markets.',
    context: 'Urban Semiotics · 2023 · Photo-Essay',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Medium Format · 5:4'
  },
  {
    id: 'photo-05',
    src: null,
    title: 'Tactile Enclosures & Perceptual Memory',
    caption: 'Physical contours, material resistance, and tactile cues as subconscious brand recall anchors.',
    context: 'Sensory Branding · 2024 · Field Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Field Archive · 5:4'
  },
  {
    id: 'photo-06',
    src: null,
    title: 'Heuristics of Immediate Choice',
    caption: 'Field records of point-of-sale cognitive shortcuts in high-density grocery spaces.',
    context: 'Behavioral Observation · 2023 · Qualitative Study',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Documentary Frame · 5:4'
  },
  {
    id: 'photo-07',
    src: null,
    title: 'The Spatial Economy of Corner Kiosks',
    caption: 'How micro-retailers utilize vertical hanging layers to signal abundance and immediacy within 4 square meters.',
    context: 'Spatial Semiotics · 2024 · Field Observation',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Editorial Portrait · 5:4'
  },
  {
    id: 'photo-08',
    src: null,
    title: 'Rituals of Transit & Passenger Heuristics',
    caption: 'Wayfinding behaviors, directional hesitation, and non-verbal queuing cues in crowded airport terminals.',
    context: 'Transit Ethnography · 2024 · Field Study',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Observational Log · 5:4'
  },
  {
    id: 'photo-09',
    src: null,
    title: 'The Materiality of Indian Street Packaging',
    caption: 'Newsprint cones, twine binds, and repurposed tin cans as functional, low-waste vernacular packaging.',
    context: 'Material Culture · 2023 · Field Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Medium Format · 5:4'
  },
  {
    id: 'photo-10',
    src: null,
    title: 'Handwritten Price Tags as Trust Anchors',
    caption: 'Analyzing why consumers perceive handwritten chalk slates as more authentic and negotiable than printed bar-codes.',
    context: 'Consumer Trust · 2024 · Qualitative Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Vertical Portrait · 5:4'
  },
  {
    id: 'photo-11',
    src: null,
    title: 'Colour Chromatics in Neighbourhood Pharmacies',
    caption: 'The cultural dominance of clinical green and cross motifs in shaping perceived medical authority.',
    context: 'Visual Semiotics · 2023 · Field Observation',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Film Portrait · 5:4'
  },
  {
    id: 'photo-12',
    src: null,
    title: 'The Social Architecture of Tea Stalls',
    caption: 'The roadside chai counter as an egalitarian public sphere for unhurried debate and cross-class conversation.',
    context: 'Sociological Inquiry · 2024 · Ethnography',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Field Archive · 5:4'
  },
  {
    id: 'photo-13',
    src: null,
    title: 'Ephemeral Billboards & Layered Palimpsests',
    caption: 'Torn political posters, cinema advertisements, and classifieds creating spontaneous urban collages.',
    context: 'Urban Archaeology · 2023 · Visual Essay',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Editorial Portrait · 5:4'
  },
  {
    id: 'photo-14',
    src: null,
    title: 'Sensory Overload & Focus Narrowing',
    caption: 'How extreme auditory and visual density in wholesale markets forces shoppers into rapid tunnel-vision filtering.',
    context: 'Cognitive Psychology · 2024 · Field Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Observational Frame · 5:4'
  },
  {
    id: 'photo-15',
    src: null,
    title: 'The Sacred in the Mundane: Shopfront Altars',
    caption: 'Incense, marigold garlands, and deity portraits integrated into cash registers across diverse retail environments.',
    context: 'Cultural Ethnography · 2023 · Cultural Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Field Archive · 5:4'
  },
  {
    id: 'photo-16',
    src: null,
    title: 'Tactile Examination of Fresh Produce',
    caption: 'The tactile choreography of tapping melons, smelling mango stems, and weighing greens by hand before purchase.',
    context: 'Sensory Ethnography · 2024 · Behavioral Study',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Portrait Frame · 5:4'
  },
  {
    id: 'photo-17',
    src: null,
    title: 'Micro-Territories: Sidewalk Hawkers at Dusk',
    caption: 'The rapid assembly and disassembly of mobile retail mats as dusk settles over urban commuter paths.',
    context: 'Urban Geography · 2024 · Field Observation',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Street Observation · 5:4'
  },
  {
    id: 'photo-18',
    src: null,
    title: 'The Psychology of Discount Typography',
    caption: 'Bold yellow starbursts and red sans-serif numbers: dissecting the semiotics of urgency in clearance racks.',
    context: 'Retail Semiotics · 2023 · Field Note',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Vertical Portrait · 5:4'
  },
  {
    id: 'photo-19',
    src: null,
    title: 'The Rhythm of Afternoon Siestas in Local Bazaars',
    caption: 'The quiet pause between 2 PM and 4 PM where commerce yields to rest, silence, and shadowed verandas.',
    context: 'Temporal Ethnography · 2024 · Qualitative Essay',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Observational Frame · 5:4'
  },
  {
    id: 'photo-20',
    src: null,
    title: 'Repurposed Vessels & Cultural Ingenuity',
    caption: 'How oil canisters, paint drums, and plastic crates become bespoke furniture, storage, and retail counters.',
    context: 'Frugal Design · 2023 · Material Culture',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Editorial Portrait · 5:4'
  },
  {
    id: 'photo-21',
    src: null,
    title: 'The Gaze of the Flâneur: Unscripted Commutes',
    caption: 'Observing how daily commuters ignore ambient advertising yet instinctively read human posture and crowd density.',
    context: 'Behavioral Psychology · 2024 · Field Log',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Editorial Portrait · 5:4'
  },
  {
    id: 'photo-22',
    src: null,
    title: 'Linger Time & Conversational Anchors',
    caption: 'Why small neighbourhood stores with open seating retain customers 3x longer than self-checkout supermarkets.',
    context: 'Community Commerce · 2024 · Final Observation',
    aspectRatio: '5/4',
    dimensions: { width: 2000, height: 1600 },
    format: 'Closing Observation · 5:4'
  }
];

export const DOCUMENTARY_FEATURE = Object.freeze({
  title: 'Behind the Shadows: Crafting a Documentary on India’s Shadow Puppetry Tradition',
  tag: 'ETHNOGRAPHIC DOCUMENTARY',
  duration: '18:24',
  resolution: '4K UHD · 24 FPS',
  credits: 'Pranavi Rudradev · Documentary Head',
  synopsis: 'As the Documentary Head, I led the creative journey of this film from ideation and shot planning to post production, documenting the endangered art of Tholu Bommalata in Nimmalakunta, Andhra Pradesh. After fieldwork, the editing process became a narrative puzzle, sorting interviews, identifying emotional anchors, and carefully structuring the story to preserve authenticity. Using DaVinci Resolve and GarageBand, we worked across editing, sound design, audio treatment, and live background recreation to create an experience that felt both cinematic and respectful to the community we documented. Collaborating across teams while refining the narrative taught me how creative direction, technical execution, and cultural sensitivity come together to create meaningful visual storytelling.'
});

export const DOCUMENTARY_SHORTS = [];

export const OBSERVATORY_META = Object.freeze({
  title: 'THE OBSERVATORY',
  concept: 'Field notes, raw semiotic encounters, and qualitative glimpses into everyday human culture.',
  background: PALETTE.JAVA_BROWN,
  primaryAccent: PALETTE.JAVA_BROWN,
  interventionAccent: PALETTE.SCEPTRE_RED,
});
