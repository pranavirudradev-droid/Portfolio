# PRANAVI RUDRADEV — PORTFOLIO SYSTEM
## Foundation, Design System, Architecture & Cinematic Homepage

A long-term, high-fidelity portfolio system engineered for **Pranavi Rudradev**.
For the detailed homepage architecture and editing instructions, see [`docs/HOMEPAGE.md`](docs/HOMEPAGE.md).

### Professional Positioning
- **BRAND STRATEGY**
- **CONSUMER PSYCHOLOGY**
- **QUALITATIVE THINKING**

*(Strict Architectural Rule: "Visual Thinking" is never used as a professional descriptor.)*

---

## 1. Core Creative Concept

### Primary Thesis
> **FINDING WHAT OTHERS OVERLOOK.**

The most decisive brand truths are rarely located in aggregate spreadsheets or automated survey outputs; they live in the unspoken rationalizations, behavioral friction, and quiet contradictions of human decision-making.

### Secondary Metaphor: The Lens
The Lens represents:
- **Perspective**: Reframing the problem before reaching for answers.
- **Focus**: Eliminating vanity noise to surface core behavioral tensions.
- **Looking Closer**: Interrogating nuances others dismiss as outliers.
- **Reframing**: Questioning defaults and cultural assumptions.
- **Seeing What Was Already There**: Illuminating latent patterns hidden in plain sight.

#### Anti-Cliché Safeguard
The website is **NOT camera-themed**. It contains:
- ❌ No camera icons
- ❌ No magnifying glasses with handles
- ❌ No camera shutter / aperture graphics
- ❌ No film strip borders or photography clichés

The Lens is executed as an **optical and perceptual inspection system**: subtle focal shifts, reticles, coordinate metadata, and reframing prompts.

---

## 2. Colour System

| Colour Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Potting Soil** | `#4A2E27` | **Primary Colour**. Foundational, deep, rich earthy structure. |
| **Transparent Yellow** | `#F5EFC6` | Light text, tactile paper surfaces, focal highlights. |
| **Cerulean Blue** | `#A5BCD6` | Strategic intellectual accent, Work Experience, Research. |
| **Sceptre Red** | `#4D0E12` | Commanding editorial crimson, About Me, Strategic interventions. |
| **Java Brown** | `#231815` | Grounding espresso black-brown, The Observatory, deep shadow. |

### Strict Contrast Rule
> ⚠️ **CRITICAL RULE:** NEVER use white text on Transparent Yellow (`#F5EFC6`). Transparent Yellow is a light paper and highlight surface; it must always be contrasted with dark **Potting Soil (`#4A2E27`)** or **Java Brown (`#231815`)**.

### Section Accent Allocation
- **ABOUT ME**: Sceptre Red (`#4D0E12`)
- **WORK EXPERIENCE**: Cerulean Blue (`#A5BCD6`)
- **PROJECTS**: Cerulean Blue (`#A5BCD6`) + Sceptre Red (`#4D0E12`)
- **THE OBSERVATORY**: Java Brown (`#231815`) + small Sceptre Red interventions

---

## 3. Typography System

- **Primary Typeface**: **Satoshi** (Indian Type Foundry / Fontshare)
- Applied across: Headings, Body copy, Navigation, Labels, Metadata, Captions.
- **Tokens**:
  - `FONT_FAMILY`: Satoshi + monospace metadata stack
  - `DISPLAY_SIZE`: Fluid `clamp(3.75rem, 8.5vw, 9.5rem)`
  - `H1_SIZE`: Fluid `clamp(2.5rem, 5.2vw, 5.5rem)`
  - `H2_SIZE`: Fluid `clamp(1.75rem, 3.4vw, 3.25rem)`
  - `BODY_SIZE`: Fluid `clamp(1rem, 1.25vw, 1.3rem)` with 1.62 line-height
  - `CAPTION_SIZE`: Fluid `clamp(0.75rem, 0.9vw, 0.875rem)` with +0.08em tracking
  - `NAV_SIZE`: Fluid `clamp(0.85rem, 1vw, 1rem)`

---

## 4. Image System (Strictly Card-Free)

Images are treated as **editorial placed artifacts**, not generic digital UI cards:
- ❌ **No rounded corners** (`border-radius: 0px` strictly enforced)
- ❌ **No generic card containers or drop-shadow boxes**
- ❌ **No white photo frames**
- ✅ **Rectangular, clean, placed, art-directed composition**
- ✅ Responsive aspect ratios: `1/1`, `4/5`, `3/4`, `16/9`, `16/10`
- ✅ Dynamic spatial positioning: `rotation`, `zIndex`, `colStart`, `colSpan`, and `parallax` factor

---

## 5. Content Architecture & Directory Tree

Content is strictly separated from UI rendering so that adding, editing, or reordering works never requires editing core component code:

```
pranavi-portfolio/
├── README.md                           # System documentation
├── HOW_TO_EDIT.md                      # Comprehensive user maintenance guide
├── index.html                          # Architecture inspector & verification sandbox
│
├── config/                             # Centralized Design Tokens
│   ├── index.js                        # Config aggregator
│   ├── colors.js                       # Palette, semantic colors, section accents
│   ├── typography.js                   # Satoshi scale & typography presets
│   ├── interaction.js                  # The Lens tokens, hover, parallax
│   ├── responsive.js                   # Breakpoints, fluid spacing, 12-col grid
│   └── tokens.js                       # Consolidated token registry & CSS generator
│
├── content/                            # Pure Data (Zero UI code)
│   ├── index.js                        # Content aggregator
│   ├── siteMeta.js                     # Positioning, brand metadata, navigation
│   ├── projects/
│   │   ├── index.js                    # All 13 registered projects
│   │   └── types.js                    # Project schema and validation logic
│   ├── experience/
│   │   ├── index.js                    # Avirata, Origami, Dhara + reserved slots
│   │   └── types.js                    # Experience schema and validator
│   ├── about/
│   │   └── index.js                    # Biography, strategy pillars, philosophy
│   └── observatory/
│       └── index.js                    # Qualitative field notes, photo essays
│
├── assets/                             # Storage for media & uploads
│   ├── fonts/                          # Satoshi webfont stylesheets
│   ├── projects/
│   │   ├── covers/                     # Project cover imagery
│   │   └── documents/                  # Project PDF / PPT exports
│   ├── experience/
│   │   └── documents/                  # Experience PDFs (Avirata, Origami)
│   ├── observatory/
│   │   ├── images/                     # Photographic fieldwork
│   │   └── videos/                     # Documentary video files
│   └── images/ui/                      # Interface marks
│
├── components/                         # Modular UI Renderers
│   ├── core/
│   │   ├── EditorialImage.js           # Rectangular, placed image renderer
│   │   ├── LensCursor.js               # Optical reframing inspection engine
│   │   └── SectionHeader.js            # Section headers with accent rules
│   ├── document/
│   │   ├── DocumentViewer.js           # Reusable PDF / presentation viewer
│   │   └── DocumentSheet.js            # Tactile continuous vertical paper sheets
│   ├── project/
│   │   ├── ProjectCardless.js          # Cardless editorial item renderer
│   │   └── ProjectDataHelper.js        # Queries, categories, spatial styles
│   └── experience/
│       └── ExperienceItem.js           # Document & narrative experience entry
│
├── styles/                             # Modular Style System
│   ├── reset.css                       # Modern CSS reset
│   ├── tokens.css                      # CSS custom properties
│   ├── typography.css                  # Satoshi hierarchy classes
│   ├── layout.css                      # Asymmetric 12-col spatial grid
│   ├── lens.css                        # The Lens interaction styles
│   ├── editorial-image.css             # Rectangular placed image styles
│   └── documents.css                   # Continuous vertical scroll document viewer
│
└── tests/
    └── verify_system.rb                # Automated 100% test suite
```

---

## 6. The 13 Projects Data Model

All 13 projects are registered verbatim with strict schema validation:

### Consumer Psychology / Insight
1. *Does Packaging Alone Trigger Brand Recall?*
2. *Communication Theory & Marketing Insights*
3. *How Do Colours Influence Consumer Behaviour?*
4. *Primary Research for Consumer Behaviour*
5. *Primary Study & Marketing Insights*
6. *Character Analysis — Personality Psychology & Marketing*

### Market Research / Case Study
7. *Retail Marketing Insight — Shoppers Stop*
8. *HireFicient — From Market Gap to Viable Venture*
9. *D2C Brands in India & Their Marketing Strategies*
10. *Forecasting Demand*

### Product / Strategy
11. *A Sustainable Product*
12. *NAZAKATH*
13. *The Airport Was Never the Problem*

---

## 7. Reusable Document Engine

Used across **Work Experience** and **Projects**:
- Supports uploaded PDFs, presentations exported to PDF, and image sequences.
- Vertical continuous scrolling.
- Responsive sheet scaling on mobile, tablet, and desktop.
- High-resolution sheet rendering with tactile paper aesthetics (`#F8F5EB`).
- Clean modal controls (Esc key, close button, direct download trigger).

---

## 8. Verification & Running the Inspector

Run the automated test suite at any time:
```bash
ruby tests/verify_system.rb
```

To preview the live design system and foundation inspector:
```bash
# Serve locally via macOS built-in ruby server:
ruby -run -e httpd . -p 8080
```
Open `http://localhost:8080` in your browser.
