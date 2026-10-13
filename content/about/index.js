/**
 * PRANAVI RUDRADEV PORTFOLIO — ABOUT ME CONTENT ARCHITECTURE
 * 
 * Source of truth for About Me narrative.
 * 
 * Palette tokens:
 * - Section Accent: Sceptre Red (#4D0E12)
 * - Primary Grounding: Potting Soil (#4A2E27)
 * - High-Contrast Text: Transparent Yellow (#F5EFC6)
 * - Structural Accent & Section Headings: Cerulean Blue (#A5BCD6)
 * 
 * Typography: Satoshi for all structural text, authentic cursive/handwritten for handwritten annotations.
 * 
 * STRICT PROHIBITIONS:
 * - Approved professional descriptors ONLY: Brand Strategy, Consumer Psychology, Qualitative Thinking.
 * - ZERO unauthorized descriptors.
 */

import { PALETTE } from '../../config/colors.js';

export const ABOUT_CONTENT = Object.freeze({
  imageSrc: null,
  meta: {
    kicker: '[01] · WORLD ONE — ABOUT ME',
    sectionTitle: 'ABOUT ME',
    name: 'PRANAVI RUDRADEV',
    headline: "Curious by nature. Strategic by interest.",
    descriptor: 'Brand Strategy · Consumer Psychology · Qualitative Thinking',
    accent: PALETTE.SCEPTRE_RED
  },

  // SECTION 1: WHO AM I
  whoAmI: {
    title: 'WHO AM I',
    intro: "Hello, I'm Pranavi Rudradev, a Marketing major and Psychology minor (BBA) from FLAME University.",
    curiosity: "I've always been curious about people, what catches our attention, shapes our choices, and makes certain things stay with us? These questions are also what draw me to brands. There's something fascinating about looking beyond the obvious and discovering the little things that shape how people think, feel, and connect with the world around them.",
    aspectsHeading: "A few things that make me, me.",
    aspects: [
      {
        title: "Water feels like home.",
        description: "Swimming has been a meaningful part of my life, including representing my state in competitions. I love consuming and being in the water, and feel equally drawn to the outdoors."
      },
      {
        title: "Occasionally, the clouds have my attention.",
        description: "I can get distracted by a good sky, an interesting shadow, or the way sunlight falls on something ordinary. I love being outdoors, exploring, and finding reasons to take the longer way around."
      },
      {
        title: "I think I can befriend any animal.",
        description: "This confidence may be my biggest red flag. So far, optimism remains undefeated."
      },
      {
        title: "Coffee connoisseur. Questionable lyricist.",
        description: "I love coffee and singing. My commitment to the melody is usually stronger than my commitment to the actual lyrics."
      }
    ],
    starburst: {
      color: '#4D0E12',
      shape: 'Irregular sharp angular silhouette framing the photograph placeholder'
    }
  },

  // SECTION 2: HOW I THINK (Exact reference architecture)
  howIThink: {
    title: 'HOW I THINK',
    leadText: "I start with curiosity, explore what could be true, strip away what doesn't fit, and arrive at the simplest, most meaningful explanation, one that actually helps us move forward.",
    quoteBadge: {
      quote: "“The simplest explanation is usually the right one.”",
      author: "OCCAM’S RAZOR",
      annotation: "Not the simplest idea, but the simplest that explains the most."
    },
    pillars: [
      {
        number: '1',
        title: 'ABDUCTIVE REASONING',
        subtitle: 'FROM OBSERVATION TO POSSIBLE EXPLANATIONS.',
        observationNote: 'Notice something intersting (or unexpected).',
        questions: [
          'What could explain this?',
          'What else might be going on?',
          'Are there deeper reasons?',
          'Could there be a different perspective?'
        ],
        explainer: 'I start with an observation and explore multiple plausible explanations, rather than jumping to the obvious one.'
      },
      {
        number: '2',
        title: 'ELIMINATION (USING OCCAM’S RAZOR)',
        subtitle: 'TESTING, NARROWING, AND FINDING THE SIMPLEST PLAUSIBLE EXPLANATION.',
        steps: [
          '1. List the possibilities.',
          '2. Test against evidence (data, research, human behaviour),',
          '3. Eliminate what doesn’t fit.',
          '4. Apply Occam’s Razor prefer the simplest explanation that accounts for the most.'
        ],
        vennQuestions: [
          'Does this fit the evidence?',
          'Is it unnecessarily complex?',
          'Does it align with human behaviour?',
          'Does it actually help us move forward?'
        ],
        annotation: 'Keep what explains the most with the fewest assumptions.'
      },
      {
        number: '3',
        title: 'INSIGHT & DIRECTION',
        subtitle: 'FROM A SIMPLER EXPLANATION TO STRATEGIC POSSIBILITIES.',
        handwrittenInsight: 'A clearer understanding that leads to better questions, sharper strategy and more meaningful ideas.',
        resultText: 'The result is a clearer, more meaningful understanding that can inform strategy, creative directions, or further exploration.'
      }
    ],
    process: {
      badge: 'MY THINKING PROCESS, STEP BY STEP.',
      steps: [
        {
          num: '01',
          name: 'OBSERVE',
          desc: 'Notice behaviours, patterns, contradictions or anything that catches my attention.'
        },
        {
          num: '02',
          name: 'QUESTION',
          desc: 'Ask what could be driving this. Challenge the obvious explanation.'
        },
        {
          num: '03',
          name: 'EXPLORE',
          desc: 'Generate multiple plausible explanations (abductive reasoning).'
        },
        {
          num: '04',
          name: 'ELIMINATE',
          desc: 'Test each possibility against evidence and strip away what doesn’t fit.'
        },
        {
          num: '05',
          name: 'SIMPLIFY (OCCAM’S RAZOR)',
          desc: 'Prefer the simplest explanation that accounts for the most.'
        },
        {
          num: '06',
          name: 'APPLY',
          desc: 'Turn the clearest insight into strategic directions and creative possibilities.'
        }
      ]
    }
  },

  // SECTION 3: MY STRENGTHS
  strengths: {
    title: 'MY STRENGTHS',
    quote: '“Jack of all trades, master of none, though oftentimes better than master of one.”',
    intro: 'My curiosity rarely sticks to one subject. One minute, it’s social loafing, the next, electrophoresis, surfing, film appreciation, or some oddly specific fact I simply had to know. But collecting knowledge is only the beginning. The real excitement lies in connecting ideas across disciplines, seeing what they reveal when brought together.',
    softSkills: [
      'Cross-functional collaboration',
      'Pattern recognition',
      'Critical thinking and healthy scepticism',
      'Conceptualisation and storytelling'
    ],
    hardSkills: [
      'Competitive Analysis',
      'Brand Positioning and Architecture',
      'Consumer Insights and Segmentation',
      'Market Research Design',
      'Go-to-Market Strategy'
    ],
    resultNote: "you're in luck, you get all these skill-sets"
  },

  // SECTION 4: WHAT INTERESTS ME
  interests: {
    title: 'WHAT INTERESTS ME',
    items: [
      {
        category: 'Consumer Psychology',
        annotation: 'Cognitive biases, decision architecture, brand attachment, and the emotional mechanics of consumer loyalty.'
      },
      {
        category: 'Brand Strategy',
        annotation: 'Positioning architectures, cultural differentiation, category creation, and cohesive narrative systems.'
      },
      {
        category: 'Qualitative Research',
        annotation: 'Ethnographic field inquiry, semiotics, in-depth consumer dialogues, and contextual observation.'
      },
      {
        category: 'Human Behaviour & Culture',
        annotation: 'Everyday rituals, micro-trends, generational shifts, and the unspoken social codes shaping consumption.'
      },
      {
        category: 'Photography',
        annotation: 'Framing, visual composition, light, and the observational discipline of looking closer at everyday reality.'
      },
      {
        category: 'Creative Exploration',
        annotation: 'Editorial storytelling, publication design, tactile experimentation, and conceptual inquiry.'
      }
    ]
  }
});
