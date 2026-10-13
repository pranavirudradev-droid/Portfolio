/**
 * PRANAVI RUDRADEV PORTFOLIO — SITE METADATA & BRAND POSITIONING
 * 
 * Positioning:
 * - BRAND STRATEGY
 * - CONSUMER PSYCHOLOGY
 * - QUALITATIVE THINKING
 * 
 * CRITICAL RULE:
 * Do NOT use "Visual Thinking" as a professional descriptor anywhere.
 */

export const SITE_META = Object.freeze({
  name: 'PRANAVI RUDRADEV',
  initials: 'PR',
  role: 'Brand Strategist & Qualitative Researcher',
  tagline: 'Brand Strategy · Consumer Psychology · Qualitative Thinking',
  descriptors: Object.freeze([
    'BRAND STRATEGY',
    'CONSUMER PSYCHOLOGY',
    'QUALITATIVE THINKING'
  ]),
  coreConcept: {
    primary: 'FINDING WHAT OTHERS OVERLOOK.',
    secondaryMetaphor: 'THE LENS',
    meaning: [
      'Perspective',
      'Focus',
      'Looking closer',
      'Reframing',
      'Questioning',
      'Seeing something that was already there'
    ],
    antiClichés: [
      'No camera icons',
      'No magnifying glasses',
      'No literal camera themes',
      'No photography clichés'
    ]
  },
  navigation: Object.freeze([
    { id: 'projects', label: 'PROJECTS', href: '#projects', accent: '#A5BCD6' },
    { id: 'experience', label: 'WORK EXPERIENCE', href: '#experience', accent: '#A5BCD6' },
    { id: 'observatory', label: 'THE OBSERVATORY', href: '#observatory', accent: '#4D0E12' },
    { id: 'about', label: 'ABOUT ME', href: '#about', accent: '#4D0E12' },
  ]),
  footer: {
    availability: 'Available for strategic advisory, qualitative inquiry & brand direction',
    rights: `© ${new Date().getFullYear()} Pranavi Rudradev. All rights reserved.`,
  }
});
