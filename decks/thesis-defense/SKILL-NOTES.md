# How the `frontend-slides` skill applies to this deck

Installed 2026-09-20 at `.claude/skills/frontend-slides/` (plain copy of the plugin folder from github.com/zarazhangrui/frontend-slides, MIT licence kept beside it). Load it with the Skill tool before any build session. This file records which of its rules the deck follows, which it adapts and which it must ignore, so the decision is not re-made every session.

## Followed as written

- One self-contained HTML file, inline CSS and JS, no build tools, no framework.
- Flat `<section class="slide">` sequence inside `.deck-viewport` and `.deck-stage`, scaled as a whole to the window, letterboxed, never reflowed. This is exactly what `assets/deck.js` already does.
- Slide visibility by `visibility`, `opacity` and `pointer-events`, never `display: none`. The runtime already uses opacity and pointer-events; visibility will be added deck-locally.
- **Low density, speaker led:** one idea per slide, large type, one to three bullets at most, more slides rather than smaller type. Overflow is solved by splitting, never by shrinking.
- No text overflow, no overlapping panels, verified in rendered screenshots at 1280 by 720 and at one phone viewport, not by measuring `scrollHeight`.
- The entrance primitives (`reveal`, `reveal-scale`, `reveal-left`, `reveal-blur`) and the rule that one orchestrated reveal per slide beats scattered micro-interactions. The CSS-only restriction itself is not followed (see below).
- The effect-to-feeling table is the selection guide: this deck sits between "Dramatic, cinematic" (dark background, full-bleed photos, slow 1 to 1.5 s fades for the two airport scenes) and "Professional" (200 to 300 ms for data slides).
- Backgrounds carry atmosphere, not flat colour: the site's water wash already does this.
- Nothing internal on a slide: no option labels, template names, file paths, requirement notes. Matches the house rule against internal abbreviations.
- Every CSS and JS section carries a `/* === NAME === */` comment saying what it does and how to change it.
- Keyboard: arrows, Space, PageUp and PageDown, Home and End, number keys. The runtime lacks PageUp and PageDown and Home and End; they are added deck-locally (clickers send PageUp and PageDown).
- Speaker notes as HTML comments beside each slide.
- The Phase 2 idea of three single-slide previews before building is kept, scoped to this deck's identity: three motion and layout dialects of one representative slide, all in the site's dark glass and orange, for Sirio to pick from.

## Adapted

| Skill rule | What the deck does instead | Why |
|---|---|---|
| 1920 by 1080 canvas | 1280 by 720, the runtime's hard-coded stage | Same 16:9 model; every size in the skill's templates is scaled by two thirds |
| `.slide.active` and `.slide.visible` | `.slide--active` and `.slide--leaving` | The shared runtime's class names |
| `.reveal` fires on slide entry | `.fragment` is the presenter step (key press); an `.auto` class is the automatic entrance on slide entry | Three things called reveal would collide: the skill's, the runtime's fragments, and `site.css`'s scroll observer |
| `--duration-normal: 0.6s`, `cubic-bezier(0.16, 1, 0.3, 1)` | The site tokens `--ease: cubic-bezier(.22,.68,0,1)`, `--dur: 480ms`, `--dur-fast: 220ms`, plus a `--dur-slow: 1200ms` for the scenes | One easing everywhere on the site |
| Inline editing on `E` with localStorage | Not shipped | A thesis deck is dated evidence; `E` and `Escape` also collide with the runtime keys |
| `deck-stage.js` web component | Not used; ideas lifted into deck-local script: `slidechange` style event (already planned as `deck:state`), Home and End, number keys, print stylesheet | The site already has a deck runtime; two runtimes would fight |
| The 34 bold template design systems | Used only as structural vocabulary (kicker, rule, headline ladders; stat tiles; hairline depth) | Their palettes and fonts are replaced by the site identity |
| `export-pdf.sh` (installs Playwright) | Same result through the existing Playwright MCP browser | No npm installs |

## Ignored, with the reason

- **"CSS only for HTML decks, no animation library."** Sirio decided on 2026-09-20 not to limit the deck to CSS. The site already vendors GSAP core (`assets/gsap/gsap.min.js`, offline) under a D-01/D-03 exception for the landing page motif; that exception extends to this deck, plus the free GSAP plugins DrawSVG, MotionPath and MorphSVG vendored beside it. One timeline per slide, advanced to labels on each fragment step and reversed on the way back. CSS transitions remain for the simple reveals.

- **"Use fonts from Fontshare or Google Fonts, never system fonts."** Revised 2026-09-20: Sirio dropped the offline constraint for this deck, so a hosted font is allowed if it earns its place. The default stays Geist Bold for display (it is the site's face) with a chosen body face; whatever is chosen is also copied into `assets/fonts/` with its licence, because the venue's wifi is not something to bet a defense on.
- **Vercel deployment (Phase 6A, `scripts/deploy.sh`).** The deck lives on GitHub Pages in this repo. Never run the script.
- **"Do not introduce a second accent" from several templates.** The global accent stays orange; the pump, alignment and nozzle threads use the scoped `--t-*` and `--p-*` accents as on the prototypes page.
- **Template `@media print` and `overflow: hidden` on `html, body`.** Deck-local only, never in a shared stylesheet.

## Network and privacy

The skill files themselves make no network calls. Three of its outputs would: Google or Fontshare font links (removed), the Vercel script (never run), the PDF script's Playwright install (replaced). `deck-stage.js` posts slide changes to `window.parent` with a wildcard origin; it is not used.
