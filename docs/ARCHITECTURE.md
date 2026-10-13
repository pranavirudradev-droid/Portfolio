# ARCHITECTURE SPECIFICATION
## Pranavi Rudradev Portfolio

### 1. Separation of Concerns

```
CONTENT (Pure Data)       ──>  Separated in /content
ASSETS (Media & Docs)     ──>  Separated in /public/assets & /assets
CONFIG (Tokens & Tuning)  ──>  Separated in /src/config
COMPONENTS (Renderers)    ──>  Separated in /src/components
STYLES (CSS System)       ──>  Separated in /src/styles
PAGES (Route Views)       ──>  Separated in /src/pages & permanent route directories
```

### 2. Homepage Architectural Flow

1. **Header Anchor:** `PRANAVI RUDRADEV` anchored clearly in the top corner.
2. **Central Statement:** `[HERO STATEMENT]` commanding the spatial focal point.
3. **Cinematic Project Field:** An asymmetric constellation of the 13 projects using cover images only.
4. **Fisheye Lens Engine:** Global circular optical magnifying glass tracker (no text, no handles).
5. **Permanent Project Routes:** One click from any cover immediately transitions to `/projects/<project-id>/`.
