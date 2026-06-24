# Phase 5: HTML Presentation Decks — Pattern Map

**Mapped:** 2026-06-24
**Files analyzed:** 8 (new/modified)
**Analogs found:** 7 / 8

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `assets/deck.css` | shared-style | event-driven (class toggles) | `assets/style.css` | role-match (extends tokens) |
| `assets/deck.js` | shared-runtime / utility | event-driven (state machine) | `prototypes/index.html` JS (lines 1096–1110) | role-match |
| `decks/index.html` | page / component | request-response + animation | `prototypes/index.html` (full page) | exact |
| `decks/<slug>/index.html` | page / thin shell | request-response | `tools/rotor-solver/index.html` shell | role-match |
| `decks/<slug>/SPEC.md` | config / doc | — | `tools/rotor-solver/SPEC.md` pattern | role-match |
| `index.html` (edit) | page | request-response | self — add `<section>` block after Prototypes | exact |
| `README.md` (edit) | doc | — | current README row format | exact |
| `CLAUDE.md` (edit) | doc | — | current CLAUDE.md folder-structure block | exact |

---

## Pattern Assignments

---

### `assets/deck.css` (shared-style, extends `assets/style.css`)

**Analog:** `assets/style.css`

**Design tokens to inherit — do NOT redefine** (`assets/style.css` lines 1–13):
```css
:root {
  --bg:           #0a0a0c;
  --accent:       #ff6b2b;
  --accent-2:     #e83535;
  --accent-glow:  rgba(255, 107, 43, 0.25);
  --glass-bg:     rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 107, 43, 0.18);
  --text:         #f0ece8;
  --text-muted:   #7a7068;
  --radius:       16px;
  --font:         -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}
```

**New tokens to ADD in `deck.css`** (no analog — define fresh):
```css
:root {
  --deck-w: 1280px;
  --deck-h: 720px;
  --slide-transition: 0.4s ease;
  --fragment-transition: 0.35s ease;
}
```

**Stage layout pattern** (from RESEARCH.md — no codebase analog; copy verbatim):
```css
.deck-viewport {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);       /* letterbox bars match site bg */
}
.deck-stage {
  width: var(--deck-w);
  height: var(--deck-h);
  transform-origin: top left;  /* CRITICAL — center-center breaks translate math */
  will-change: transform;      /* mitigates subpixel blur on GPU compositing */
  position: relative;
  overflow: hidden;
}
```

**Slide visibility pattern** (opacity-only, never display:none — preserves transitions):
```css
.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--slide-transition);
}
.slide--active  { opacity: 1; pointer-events: auto; }
.slide--leaving { opacity: 0; }   /* transition fires; remove class after 450ms */
```

**Fragment pattern**:
```css
.fragment { opacity: 0; transform: translateY(12px); transition: opacity var(--fragment-transition), transform var(--fragment-transition); }
.fragment[data-fragment-revealed] { opacity: 1; transform: none; }
```

**Reduced-motion guard** — single block, mirrors `prototypes/index.html` lines 89–103 where CSS carries the default visible state and animation is opt-in:
```css
@media (prefers-reduced-motion: reduce) {
  .slide    { transition: none; }
  .fragment { transition: none; }
  .deck-card { animation: none; opacity: 1; transform: none; }  /* index deal-out */
}
```
This is the exact same inversion pattern as `prototypes/index.html` lines 84–103: visible by default, motion applied only inside `@media (prefers-reduced-motion: no-preference)`. Mirror that structure.

**Glass card pattern** for the HUD (nav bar, counter) — copy from `assets/style.css` lines 143–168 `.tool-card` base:
```css
/* HUD bar inherits the glass card aesthetic */
background: rgba(10, 10, 12, 0.85);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border-bottom: 1px solid var(--glass-border);
```
Exact same values used in `prototypes/index.html` `.tool-nav` (lines 10–23).

**Progress bar accent gradient** — derives from the site accent gradient:
```css
.deck-progress-fill {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}
```
Pattern source: `prototypes/index.html` `.bar-grav` (line 235): `background: linear-gradient(90deg, var(--accent), var(--accent-2))`.

---

### `assets/deck.js` (shared-runtime, event-driven state machine)

**Analog:** `prototypes/index.html` script block (lines 1044–1110)

**Reduced-motion guard pattern** (`prototypes/index.html` lines 1096–1109):
```js
// Pattern: check once at top, gate all animation in JS on this boolean
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && stage) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      document.querySelector('.journey-path')?.classList.add('is-visible');
      document.querySelectorAll('.proto-node').forEach(n => n.classList.add('is-visible'));
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(stage);
}
// reducedMotion=true: CSS default already shows everything
```
For `deck.js`: use the same `const reducedMotion = window.matchMedia(...).matches` guard. Gate the deal-out animation and any JS-driven entrance motion on this flag. CSS transitions are already gated by the media query in `deck.css`.

**Esc-key handler with priority ordering** (`prototypes/index.html` lines 1071):
```js
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});
```
The deck needs the same priority model but with two consumers (demo-mode exit beats overview-grid toggle). Mirror the single-listener pattern; add the priority check:
```js
// Copy this single-listener pattern; gate sub-handlers by state:
document.addEventListener('keydown', e => {
  if (document.body.hasAttribute('data-demo-active')) {
    if (e.key === 'Escape') { deactivateIframe(); e.stopPropagation(); }
    return;   // deck keys disabled in demo mode
  }
  if (e.key === 'Escape' && document.body.hasAttribute('data-overview')) { closeOverview(); return; }
  handleDeckKey(e);  // arrow / space / O
});
```

**View-swap pattern** (`prototypes/index.html` lines 1074–1093) — the deck does not use view-swap (D-04: real page load), but the `hidden` attribute toggling pattern for overview grid is identical:
```js
function showDetail(protoId) {
  document.getElementById('journey-view').hidden = true;
  document.getElementById('detail-view').hidden = false;
  // ...
}
```
Copy: use `element.hidden = true/false` (not CSS class) for the overview grid panel.

**fitStage function** (RESEARCH.md, no codebase analog — transcribe directly):
```js
function fitStage() {
  const scaleX = window.innerWidth  / 1280;
  const scaleY = window.innerHeight / 720;
  const scale  = Math.min(scaleX, scaleY);
  const tx     = (window.innerWidth  - 1280 * scale) / 2;
  const ty     = (window.innerHeight - 720  * scale) / 2;
  stage.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
}
window.addEventListener('resize', fitStage);
fitStage();
```

**Hash routing** (RESEARCH.md, no codebase analog — transcribe directly):
```js
function updateURL() {
  history.replaceState(null, '', `#/${slideIdx + 1}`);  // replaceState NOT pushState (file:// Firefox)
}
function readURL() {
  const match = location.hash.match(/^#\/(\d+)$/);
  if (match) goToSlide(parseInt(match[1], 10) - 1);
}
window.addEventListener('hashchange', readURL);
document.addEventListener('DOMContentLoaded', readURL);
```

---

### `decks/index.html` (presentations index page, component)

**Analog:** `prototypes/index.html` — primary template for full-page structure, blob chrome, nav bar, and animation pattern.

**Document shell** (`prototypes/index.html` lines 1–8):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Presentations — Thesis Tools</title>
  <link rel="stylesheet" href="../assets/style.css" />
  <!-- deck-index-specific styles go in a <style> block here; no extra shared CSS -->
</head>
```
Note: `decks/index.html` does NOT load `deck.css` or `deck.js` — those are deck-runtime files, not index-page files.

**Blob chrome** (`prototypes/index.html` lines 440–445, `index.html` lines 24–28):
```html
<div class="bg-blobs" aria-hidden="true">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
</div>
```
Copy verbatim. The `.bg-blobs`/`.blob` styles live in `assets/style.css` (lines 29–73) and need no redefinition.

**Nav bar** (`prototypes/index.html` lines 447–450):
```html
<nav class="tool-nav animate-in" style="--delay:0s">
  <a class="nav-back" href="../index.html">← Resources</a>
  <span class="nav-title">Prototype Design Space</span>
</nav>
```
For `decks/index.html`, mirror exactly — change text only:
```html
<nav class="tool-nav animate-in" style="--delay:0s">
  <a class="nav-back" href="../index.html">← Resources</a>
  <span class="nav-title">Presentations</span>
</nav>
```
The `.tool-nav` style block must be defined in the page's own `<style>` (same values as every tool page — `prototypes/index.html` lines 10–26 or `tools/peristaltic-roller-displaced-volume-model/index.html` lines 16–29):
```css
.tool-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 32px;
  border-bottom: 1px solid var(--glass-border);
  position: sticky; top: 0; z-index: 10;
  background: rgba(10, 10, 12, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.nav-back  { color: var(--accent); font-size: 0.85rem; letter-spacing: 0.04em; }
.nav-back:hover { opacity: 0.75; }
.nav-title { font-size: 0.85rem; color: var(--text-muted); letter-spacing: 0.04em; }
```

**Animate-in entrance with `--delay` stagger** (`assets/style.css` lines 207–216):
```css
/* Already in assets/style.css — just USE the class, don't redefine */
.animate-in {
  opacity: 0;
  transform: translateY(28px);
  animation: fade-up 0.75s cubic-bezier(.22,.68,0,1) forwards;
  animation-delay: var(--delay, 0s);
}
```
Apply `class="animate-in" style="--delay:Xs"` staggered on each deck card during the deal-out (or as the reduced-motion fallback).

**Card deal-out animation** (no codebase analog — D-06 is new; design within established conventions):
- Fan cards starting slightly rotated (`rotate(-8deg)` to `rotate(8deg)`) and overlapping, then transition to spread/grid layout on load.
- Gate the animation inside `@media (prefers-reduced-motion: no-preference)` exactly as `prototypes/index.html` lines 89–103 do for the path draw.
- Reduced-motion fallback: cards visible at full opacity, no transform, identical to `prototypes/index.html` lines 84–86: `.proto-node { opacity: 1; }` as the default.

**Deck card structure** — base from `assets/style.css` `.tool-card` (lines 143–193), adapt for deck cards:
```html
<!-- One card per deck, hand-authored (D-05) -->
<a href="lab-meeting-2026-06/index.html" class="deck-card animate-in" style="--delay:0.3s">
  <div class="card-body">
    <h2 class="card-title">Lab Meeting — June 2026</h2>
    <p class="card-desc">GSD workflow · rotor solver · displaced-volume model · proto-01 · proto-02 · test-campaign app</p>
  </div>
  <span class="card-date">2026-06-24</span>
  <span class="card-link">Open deck →</span>
</a>
```

**Single-language decision** — `decks/index.html` and all deck pages are single-language (English only). Precedent: `tools/peristaltic-roller-displaced-volume-model/index.html` has NO `data-i18n` attributes and NO lang-toggle button. Do not add `data-i18n` to any deck page.

---

### `decks/<slug>/index.html` (deck thin shell, page)

**Analog:** Any tool `index.html` for the shell structure; `deck.css`/`deck.js` replace inline styles/scripts.

**Document shell** — the key difference from tool pages is that shared runtime files are loaded here (the D-01 sanctioned exception):
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lab Meeting Jun 2026 — Thesis Tools</title>
  <link rel="stylesheet" href="../../assets/style.css" />
  <link rel="stylesheet" href="../../assets/deck.css" />
</head>
<body>
  <div class="deck-viewport">
    <div class="deck-stage" tabindex="0">
      <!-- slides authored here as flat <section class="slide"> sequence -->
      <section class="slide slide--active">...</section>
      <section class="slide">...</section>
    </div>
  </div>
  <!-- HUD (progress bar, counter, nav arrows) injected by deck.js or authored here -->
  <script src="../../assets/deck.js"></script>
</body>
</html>
```
No `<style>` block needed for slide layout — that all lives in `deck.css`.
Deck-specific overrides (e.g., a custom slide background image) go in a `<style>` block in the deck HTML, not in `deck.css`.

**"← Presentations" persistent link** — modelled on `.tool-nav` back link pattern (`prototypes/index.html` line 448, `tools/peristaltic-roller-displaced-volume-model/index.html` line 358):
```html
<!-- Inside .deck-stage or as overlay — idle-fade acceptable -->
<a class="deck-back-link" href="../../decks/index.html">← Presentations</a>
```
Style from the `.nav-back` pattern:
```css
.deck-back-link { color: var(--accent); font-size: 0.85rem; letter-spacing: 0.04em; }
.deck-back-link:hover { opacity: 0.75; }
```

**iframe embed slide structure** (RESEARCH.md section 4 — no codebase analog; transcribe directly):
```html
<section class="slide">
  <h2 class="slide-title">Rotor Geometry Solver</h2>
  <div class="iframe-wrapper">
    <iframe src="../../tools/rotor-solver/index.html" tabindex="-1"></iframe>
    <div class="iframe-overlay" aria-hidden="true"></div>
  </div>
</section>
```

**No CDN-without-local-fallback rule** — if any deck-specific asset needs a CDN (e.g., a font or icon set), provide a local fallback in `decks/<slug>/assets/`. Precedent: `tools/peristaltic-roller-displaced-volume-model/katex/` folder (KaTeX local copy). The `deck.css`/`deck.js` are local by definition.

---

### `decks/<slug>/SPEC.md` (deck spec / config)

**Analog:** `tools/rotor-solver/SPEC.md` pattern (per CLAUDE.md tool-spec standard).

Per CLAUDE.md: every tool/deck has a co-located `SPEC.md` with purpose, inputs/outputs (for a deck: segments, slide count, tools embedded), and assumptions (single-language, offline-first).

---

### `index.html` (root landing page — edit, add Presentations section)

**Analog:** `index.html` itself — duplicate the existing `<section>` block pattern (lines 67–77).

**Pattern to copy** (`index.html` lines 67–77):
```html
<section aria-label="Hardware prototypes">
  <p class="section-label animate-in" style="--delay: 0.75s;">Prototypes</p>
  <p class="section-desc animate-in" style="--delay: 0.80s;">Hardware iterations logged with design parameters, test data, and design reasoning.</p>
  <div class="tools-grid">
    <a href="prototypes/index.html" class="tool-card animate-in" style="--delay: 0.88s;">
      <div class="card-icon">🧪</div>
      <div class="card-body">
        <h2 class="card-title">Prototype Design Space</h2>
        <p class="card-desc">...</p>
      </div>
      <span class="card-link">Explore →</span>
    </a>
  </div>
</section>
```
Add a new `<section aria-label="Presentations">` block after this, with `--delay` incremented from the last existing delay (~0.88s → ~1.0s stagger).

Do NOT add `data-i18n` attributes to the new presentations section (single-language decision, consistent with no-i18n precedent).

---

## Shared Patterns

### Blob chrome (apply to: `decks/index.html`)
**Source:** `assets/style.css` lines 29–73 (styles) + `prototypes/index.html` lines 440–445 (HTML)
```html
<div class="bg-blobs" aria-hidden="true">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
</div>
```
No style redefinition needed — already in `assets/style.css`.

### Animate-in entrance (apply to: `decks/index.html` sections and cards)
**Source:** `assets/style.css` lines 207–216
```css
/* Already defined — just add class + --delay inline style */
class="animate-in" style="--delay: 0.3s;"
```
Stagger `--delay` by 0.1–0.15s per element, starting at 0s for the nav.

### Accent gradient (apply to: `deck.css` progress bar)
**Source:** `prototypes/index.html` line 235 (`.bar-grav`)
```css
background: linear-gradient(90deg, var(--accent), var(--accent-2));
```

### Glass nav-bar (apply to: `decks/index.html` `.tool-nav`, deck HUD bar)
**Source:** `prototypes/index.html` lines 10–26
```css
background: rgba(10, 10, 12, 0.85);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border-bottom: 1px solid var(--glass-border);
```

### Reduced-motion guard structure (apply to: `deck.css` ALL animations, `decks/index.html` deal-out)
**Source:** `prototypes/index.html` lines 84–103 (the inversion pattern)
Rule: CSS default = motion disabled / fully visible. Motion enabled only inside `@media (prefers-reduced-motion: no-preference) { ... }`.
```css
/* Default: visible (no-motion-safe) */
.deck-card { opacity: 1; transform: none; }

@media (prefers-reduced-motion: no-preference) {
  .deck-card {
    opacity: 0;
    transform: rotate(var(--card-angle, 0deg)) translateY(40px);
    transition: opacity 0.5s ease, transform 0.6s cubic-bezier(.22,.68,0,1.2);
    transition-delay: var(--delay, 0s);
  }
  .deck-card.is-visible { opacity: 1; transform: rotate(var(--card-angle, 0deg)) translateY(0); }
}
```

### Back-link nav pattern (apply to: `decks/index.html`, deck pages)
**Source:** `prototypes/index.html` lines 447–450 + `tools/peristaltic-roller-displaced-volume-model/index.html` lines 357–358
```html
<nav class="tool-nav animate-in" style="--delay:0s">
  <a class="nav-back" href="../index.html">← Resources</a>
  <span class="nav-title">[page title]</span>
</nav>
```

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `assets/deck.js` state machine core | utility | event-driven | No existing JS state machine in repo; all prior JS is simple DOM manipulation. Use RESEARCH.md code shapes directly. |
| Card deal-out / fan animation | CSS animation | event-driven | No fanned-card animation exists; design within `@media (prefers-reduced-motion)` inversion pattern from `prototypes/index.html`. |

---

## Metadata

**Analog search scope:** `assets/`, `tools/` (all 3 tool pages), `prototypes/index.html`, `index.html`
**Files read:** 5 source files (full read)
**Pattern extraction date:** 2026-06-24
