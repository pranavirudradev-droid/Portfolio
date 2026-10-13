/**
 * PRANAVI RUDRADEV PORTFOLIO — EXPERIENCE REGISTRY
 * 
 * Strict data model accommodating the 5 real work experiences:
 * 1. Origami Creative (Advertising Agency, May 2026 — Jul 2026, Bengaluru) — Document-backed (Presentation)
 * 2. Arisa Foundation (Event Production, Nov 2024 — Jan 2025, Pune)
 * 3. Aviratha Trust / Avirata NGO (NGO / Field Inquiry, Jun 2024 — Sep 2024, Bengaluru) — Document-backed (PDF)
 * 4. Dhaara Magazine / Dhara Magazine (Publication / Editorial, 2021 — 2022, Delhi)
 * 5. I Love Mondays (Media / Interviews, Apr 2022 — Jul 2022, Bengaluru)
 * 
 * Section accent: Cerulean Blue (#A5BCD6)
 */

import { validateExperienceSchema } from './types.js';
import { PALETTE } from '../../config/colors.js';

export const EXPERIENCES = [
  {
    id: 'origami-creative',
    index: '01',
    title: 'Brand Strategy Intern / Brand Custodian',
    organisation: 'Origami Creative',
    orgDisplay: 'ORIGAMI CREATIVE',
    orgSub: 'ADVERTISING AGENCY',
    category: 'ADVERTISING AGENCY',
    period: 'May 2026 — Jul 2026',
    location: 'Bengaluru',
    type: 'document',
    document: {
      type: 'presentation',
      src: 'assets/experience/documents/origami-creative.pdf',
      title: 'Origami Creative Strategic Pitch & Case Presentation',
      pageCount: 2,
      downloadable: true,
    },
    shortDescription: 'Ran competitive analysis across 4 client sectors, conducted a 14-competitor benchmark analysis, mapped fan segments for a football club, and built pitch deck for jewellery sub-brand launch.',
    bulletPoints: [
      'Ran competitive analysis across 4 client sectors (real estate, F&B, jewellery, sports), an 11-competitor benchmark study along with go-to-market positioning for a new luxury sub-brand.',
      'Conducted a 14-competitor benchmark analysis and consumer insights study on buying behaviour and price sensitivity, informing brand architecture across retail and export divisions for an egg products brand.',
      'Mapped fan segments for a football club through consumer questionnaires and one-on-one interviews, converting findings into audience-led brand strategy.',
      'Built a pitch deck and campaign concepts for a jewellery sub-brand launch, aiding celebrity-endorser selection and launch-theme development.'
    ],
    image: {
      src: 'assets/experience/documents/origami-creative-cover.jpg',
      alt: 'Origami Creative strategy documentation',
      aspectRatio: '16/10',
    },
    accent: PALETTE.CERULEAN_BLUE,
    tags: ['BRAND POSITIONING', 'CONSUMER INSIGHTS', 'COMPETITIVE ANALYSIS', 'GO-TO-MARKET STRATEGY']
  },
  {
    id: 'arisa-foundation',
    index: '02',
    title: 'Project Intern',
    organisation: 'Arisa Foundation',
    orgDisplay: 'ARISA FOUNDATION',
    orgSub: 'NGO / EVENT PRODUCTION',
    category: 'EVENT PRODUCTION',
    period: 'Nov 2024 — Jan 2025',
    location: 'Pune',
    type: 'narrative',
    document: null,
    shortDescription: 'Managed an 8-sense experience end-to-end for ARISA’s Creative Lab Festival 2025 and shaped brand communications and outreach content.',
    bulletPoints: [
      'Managed an 8-sense experience end-to-end for ARISA’s Creative Lab Festival 2025, from psychology-led concept development to sourcing, budgeting, fabrication and execution.',
      'Shaped brand communications and outreach content aligning organisational messaging with community goals, liaising with cross-functional teams on schedule.'
    ],
    image: {
      src: 'assets/experience/documents/experience-three-cover.jpg',
      alt: 'Arisa Foundation event production archive',
      aspectRatio: '16/10',
    },
    accent: PALETTE.CERULEAN_BLUE,
    tags: ['EVENT PRODUCTION', 'BRAND COMMUNICATIONS', 'COMMUNITY ENGAGEMENT']
  },
  {
    id: 'avirata-ngo',
    index: '03',
    title: 'Social Media & Creative Intern',
    organisation: 'Avirata NGO',
    orgDisplay: 'AVIRATHA TRUST',
    orgSub: 'NGO / SOCIAL IMPACT',
    category: 'NGO / FIELD INQUIRY',
    period: 'Jun 2024 — Sep 2024',
    location: 'Bengaluru',
    type: 'document',
    document: {
      type: 'pdf',
      src: 'assets/experience/documents/avirata-ngo.pdf',
      title: 'Avirata NGO Strategic Documentation',
      pageCount: 2,
      downloadable: true,
    },
    shortDescription: 'Grew Instagram followers by 110%, reshaped weekly content mix using performance analytics, and produced brand-consistent cross-platform content.',
    bulletPoints: [
      'Grew Instagram followers by 110%, expanding average reach to 1,200 per post with 95% coming from non-followers.',
      'Reshaped weekly content mix using performance analytics: Reels drove 64.4% of traction (500+ views each) versus 30.1% for posts and 5.5% for Stories.',
      'Produced brand-consistent content across Instagram, Facebook and WhatsApp (Premiere Pro, Photoshop, Canva, Lightroom), maintaining a 10+ post weekly content calendar.'
    ],
    image: {
      src: 'assets/experience/documents/avirata-ngo-cover.jpg',
      alt: 'Aviratha Trust field study documentation',
      aspectRatio: '16/10',
    },
    accent: PALETTE.CERULEAN_BLUE,
    tags: ['SOCIAL MEDIA STRATEGY', 'CONTENT CREATION', 'PERFORMANCE ANALYTICS', 'COMMUNITY ENGAGEMENT']
  },
  {
    id: 'dhara-magazine',
    index: '04',
    title: 'Creative Intern',
    organisation: 'Dhara Magazine',
    orgDisplay: 'DHAARA MAGAZINE',
    orgSub: 'PUBLICATION / EDITORIAL',
    category: 'PUBLICATION / EDITORIAL',
    period: '2021 — 2022',
    location: 'Delhi',
    type: 'narrative',
    document: null,
    shortDescription: 'Photographed and designed the cover for May (2022) edition, created social content, and strategized content publication.',
    bulletPoints: [
      'Photographed and designed the cover for the May (2022) edition featuring "Reality of the rights of people with disability".',
      'Created content for all social media platforms using my photographs along with articles of the magazine.',
      'Strategized on the content to be published along with building viewership.'
    ],
    image: {
      src: 'assets/experience/documents/dhara-magazine-cover.jpg',
      alt: 'Dhaara Magazine editorial issue archive',
      aspectRatio: '16/10',
    },
    accent: PALETTE.CERULEAN_BLUE,
    tags: ['PHOTOGRAPHY', 'COVER DESIGN', 'CONTENT CREATION', 'AUDIENCE GROWTH']
  },
  {
    id: 'i-love-mondays',
    index: '05',
    title: 'Executive Intern & Interviewer',
    organisation: 'I Love Mondays',
    orgDisplay: 'I LOVE MONDAYS',
    orgSub: 'MEDIA / INTERVIEWS',
    category: 'MEDIA / INTERVIEWS',
    period: 'Apr 2022 — Jul 2022',
    location: 'Bengaluru',
    type: 'narrative',
    document: null,
    shortDescription: 'Hosted a music careers program interviewing industry professionals, managed client communications, and coordinated live industry sessions.',
    bulletPoints: [
      'Hosted a program on careers in the music industry, conducting interviews with lead playback singer Shashwat Singh and Dr Adam Greig of KM Music Conservatory.',
      'Handled enquiries and e-communication with clients and managed communications between interns and music professionals such as Jerry Vincent.',
      'Coordinated logistics for live industry sessions and participated in the offered music composition course.'
    ],
    image: {
      src: 'assets/experience/documents/experience-four-cover.jpg',
      alt: 'I Love Mondays media production archive',
      aspectRatio: '16/10',
    },
    accent: PALETTE.CERULEAN_BLUE,
    tags: ['INTERVIEWS', 'PROGRAM PRODUCTION', 'CLIENT COMMUNICATION', 'MUSIC INDUSTRY']
  }
];

// Validate all experiences against schema
EXPERIENCES.forEach(validateExperienceSchema);

export function getDocumentExperiences() {
  return EXPERIENCES.filter((exp) => exp.type === 'document');
}

export function getNarrativeExperiences() {
  return EXPERIENCES.filter((exp) => exp.type === 'narrative');
}
