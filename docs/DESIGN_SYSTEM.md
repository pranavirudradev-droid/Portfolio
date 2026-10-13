# DESIGN SYSTEM SPECIFICATION
## Pranavi Rudradev Portfolio

### 1. Palette & Contrast

| Colour Name | Hex Code | Primary Purpose | Contrast Rule |
| :--- | :--- | :--- | :--- |
| **Potting Soil** | `#4A2E27` | Primary background & structural atmosphere | Foundational surface |
| **Transparent Yellow** | `#F5EFC6` | Light typography, paper surfaces, highlights | **NEVER** use white text on Transparent Yellow. Contrast only with `#4A2E27` or `#231815`. |
| **Cerulean Blue** | `#A5BCD6` | Strategic intellectual accent | Case study & research accent |
| **Sceptre Red** | `#4D0E12` | Commanding editorial crimson | Strategic interventions & About accent |
| **Java Brown** | `#231815` | Deep espresso ground | The Observatory base & deep shadows |

### 2. Typography (Satoshi)

- **Primary Typeface:** **Satoshi** (Indian Type Foundry / Fontshare)
- **Scale:**
  - `DISPLAY_SIZE`: `clamp(3.75rem, 8.5vw, 9.5rem)`
  - `H1_SIZE`: `clamp(2.5rem, 5.2vw, 5.5rem)`
  - `H2_SIZE`: `clamp(1.75rem, 3.4vw, 3.25rem)`
  - `BODY_SIZE`: `clamp(1rem, 1.25vw, 1.3rem)` (Line-height `1.62`)
  - `CAPTION_SIZE`: `clamp(0.75rem, 0.9vw, 0.875rem)` (Tracking `+0.08em` uppercase)

### 3. Image Treatment

- **Rectangular & Placed:** Images sit in space as physical, art-directed editorial objects.
- **Strict Prohibitions:**
  - ❌ No rounded corners (`border-radius: 0px` strictly)
  - ❌ No cards or card containers
  - ❌ No white frames
  - ❌ No generic drop shadows

### 4. Fisheye Lens Tokens

- `LENS_SIZE`: `220px` (Desktop diameter)
- `LENS_DISTORTION`: `0.50` (5/10 optical distortion factor)
- `LENS_MAGNIFICATION`: `1.15` (Focal enlargement factor)
- **Appearance:** Circular, glass-like, convex refraction highlight, no handles, no labels, no icons.
