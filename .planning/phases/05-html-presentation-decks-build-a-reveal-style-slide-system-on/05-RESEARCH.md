# Phase 5: HTML Presentation Decks — Research

**Researched:** 2026-06-24
**Domain:** Vanilla-JS/CSS slide runtime (no libraries)
**Confidence:** HIGH — all four mechanics are well-trodden browser territory; no external packages; verified against own training knowledge of the Web platform.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- D-01: Shared runtime — `assets/deck.css` + `assets/deck.js`
- D-02: Decks at `decks/<slug>/index.html`; slides are `<section class="slide">`
- D-03: Fixed 1280×720 stage, CSS `transform: scale()` letterbox
- D-04: Each deck is a real page load (no in-page swap)
- D-05: Hand-authored index cards (no manifest/JSON)
- D-06: Index "magic" = card-deck fan / deal-out on load
- D-07: Live `<iframe>` embeds of site tools
- D-08: iframe in framed ~70% panel with slide title
- D-09: Click-to-activate overlay; Esc / click-outside returns keyboard control
- D-10: External test-campaign app = screenshots / muted recording (not iframe)
- D-11: Hash-per-slide deep links (`#/7`); slide granularity only (no fragment in URL)
- D-12: Progress bar, slide counter, prev/next arrow buttons (idle-fade OK)
- D-13: Reveal-style stepping — next fragment on current slide, then advance
- D-14: Overview grid (O / Esc), persistent "← Presentations" link
- D-15: No external animation/slide libraries; native only; USB + GitHub Pages
- D-16: Reuse `assets/style.css` design tokens
- D-17: `prefers-reduced-motion` guard on all animations

### Claude's Discretion
- Exact slide-transition style (fade / slide / push) and fragment animation curves
- Precise hash format (`#/7` vs `#slide-7`), overview-grid layout, idle-fade timing
- iframe scaling / lazy-loading mechanics inside the framed panel

### Deferred Ideas (OUT OF SCOPE)
- Fragment-level deep linking (`#/7/2`)
- Home/End jump keys
- Additional decks beyond the first lab-meeting deck
- Live-iframe snapshot of the test-campaign app
</user_constraints>

---

## Summary

Four non-trivial implementation mechanics stand between a working plan and a rework loop. Everything else in this phase (slide HTML authoring, design tokens, index card layout) is straightforward given the existing site patterns. The four mechanics are: the scale-to-fit letterbox stage, reveal-style fragment/slide stepping, hash deep-linking on static file:// + GitHub Pages, and iframe click-to-activate focus capture. Each is documented below with the recommended technique, the single key gotcha, and a minimal code shape.

**Primary recommendation:** Build the runtime as a single `deck.js` state machine (slideIndex, fragmentIndex) plus a `deck.css` that owns all transition and layout rules. Keep JavaScript and CSS cleanly separated — JS only toggles classes and attributes; CSS does all visual work. This makes `prefers-reduced-motion` guards trivial (one media query, no JS branching).

---

## 1. Scale-to-Fit Letterbox Stage [ASSUMED]

### Technique

Two-div pattern: an outer `.deck-viewport` (fills 100vw/100vh, `overflow:hidden`, `display:flex`, `align-items:center`, `justify-content:center`) and an inner `.deck-stage` (`width:1280px; height:720px; transform-origin: top left` — NOT `center center`).

`transform-origin: top left` is the key. The stage is translated to the center after scaling:

```js
function fitStage() {
  const scaleX = window.innerWidth  / 1280;
  const scaleY = window.innerHeight / 720;
  const scale  = Math.min(scaleX, scaleY);           // maintain aspect ratio
  const tx     = (window.innerWidth  - 1280 * scale) / 2;
  const ty     = (window.innerHeight - 720  * scale) / 2;
  stage.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
}
window.addEventListener('resize', fitStage);
fitStage();
```

Letterbox bars come for free from the viewport's background color (set to `#0a0a0c`).

### Gotcha — subpixel blur

Scaling to a non-integer factor blurs text in some browsers. Mitigation: set `will-change: transform` on the stage (promotes to its own compositing layer, avoids sub-pixel interpolation on most GPU renderers). Do NOT round the scale to an integer — that would break projector fitting. The `will-change` hint is enough in practice.

```css
.deck-stage {
  width: 1280px;
  height: 720px;
  transform-origin: top left;
  will-change: transform;
  position: relative;          /* stacking context for slides */
  overflow: hidden;
}
.deck-viewport {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;               /* not strictly needed with translate approach but fine */
  background: #0a0a0c;
}
```

The translate+scale approach (not `margin: auto`) is preferred because it keeps the stage at `position: absolute; top: 0; left: 0` inside the viewport, which avoids flexbox/scroll interference when the scaled stage is larger than a dimension (e.g., very wide projector).

---

## 2. Reveal-Style Fragment Stepping + Slide Transitions [ASSUMED]

### State model

```js
let slideIdx    = 0;   // 0-based index into slides[]
let fragmentIdx = -1;  // -1 = no fragment revealed yet on this slide

const slides    = Array.from(document.querySelectorAll('.slide'));

function advance() {
  const frags = Array.from(
    slides[slideIdx].querySelectorAll('.fragment')
  ).filter(f => !f.hasAttribute('data-fragment-revealed'));

  if (frags.length > 0) {
    frags[0].setAttribute('data-fragment-revealed', '');
    fragmentIdx++;
  } else {
    goToSlide(slideIdx + 1);
  }
}

function retreat() {
  if (fragmentIdx >= 0) {
    // un-reveal last fragment
    const revealed = Array.from(
      slides[slideIdx].querySelectorAll('[data-fragment-revealed]')
    );
    revealed[revealed.length - 1].removeAttribute('data-fragment-revealed');
    fragmentIdx--;
  } else {
    goToSlide(slideIdx - 1, 'last'); // land at end of prev slide's fragments
  }
}
```

Fragments start hidden via CSS:

```css
.fragment            { opacity: 0; transform: translateY(12px); transition: opacity .35s ease, transform .35s ease; }
.fragment[data-fragment-revealed] { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .fragment { transition: none; }
}
```

### Slide transitions

Active slide carries `.slide--active`. Entering slide starts from `opacity:0` and fades in; leaving slide fades out. Do this with two classes: `.slide--leaving` and `.slide--active`.

```css
.slide {
  position: absolute; inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity .4s ease;
}
.slide--active {
  opacity: 1;
  pointer-events: auto;
}
.slide--leaving {
  opacity: 0;          /* just the fade-out; transition still fires */
}

@media (prefers-reduced-motion: reduce) {
  .slide { transition: none; }
}
```

JS in `goToSlide()`:

```js
function goToSlide(idx, landAt) {
  if (idx < 0 || idx >= slides.length) return;
  const prev = slides[slideIdx];
  prev.classList.remove('slide--active');
  prev.classList.add('slide--leaving');
  setTimeout(() => prev.classList.remove('slide--leaving'), 450); // match transition

  slideIdx    = idx;
  fragmentIdx = landAt === 'last'
    ? slides[slideIdx].querySelectorAll('.fragment').length - 1
    : -1;

  // re-reveal fragments up to fragmentIdx (for back-navigation)
  slides[slideIdx].querySelectorAll('.fragment').forEach((f, i) => {
    i <= fragmentIdx
      ? f.setAttribute('data-fragment-revealed', '')
      : f.removeAttribute('data-fragment-revealed');
  });

  slides[slideIdx].classList.add('slide--active');
  updateURL();
  updateHUD();
}
```

Gotcha: do NOT remove `.slide--leaving` immediately — let the CSS transition complete first (the `setTimeout` at transition duration). Otherwise the leaving slide snaps away before fading.

---

## 3. Hash-Per-Slide Deep Linking [ASSUMED]

### Tradeoff: `location.hash` vs `history.pushState`

Use `location.hash`. Reason: `pushState` on `file://` works in Chrome/Edge but is blocked in Firefox (SecurityError). GitHub Pages (http/https) supports both, but `file://` is a hard requirement (D-15). `location.hash` works on both origins without any server.

Format: `#/7` (1-based, matches Reveal.js convention, easy to cite: "slide 7 of the deck").

```js
function updateURL() {
  // slideIdx is 0-based internally; URL is 1-based
  history.replaceState(null, '', `#/${slideIdx + 1}`);
}

function readURL() {
  const match = location.hash.match(/^#\/(\d+)$/);
  if (match) {
    const idx = parseInt(match[1], 10) - 1;
    goToSlide(Math.max(0, Math.min(idx, slides.length - 1)));
  }
}

window.addEventListener('hashchange', readURL);
document.addEventListener('DOMContentLoaded', readURL);
```

Use `history.replaceState` (not `pushState`) for in-deck navigation so that browser back/forward step between decks (or between the index and a deck), not between every slide. Slide-to-slide navigation within the deck does NOT add history entries. Browser Back closes the deck.

Gotcha: if you want back/forward to step through slides, use `pushState`. But that requires `file://` Firefox support, which fails. The simpler approach (replaceState + the progress bar / prev-next buttons as primary nav) is correct for this project.

If in-deck browser-back is wanted later: the planner can guard `pushState` behind a try/catch and fall back to hash-only on `file://`. For now, lock: `replaceState` only.

---

## 4. iframe Click-to-Activate Focus Capture [ASSUMED]

### Pattern

Each tool-embed slide has this structure inside `.slide`:

```html
<div class="iframe-wrapper">
  <iframe src="../../tools/rotor-solver/index.html" tabindex="-1"></iframe>
  <div class="iframe-overlay" aria-hidden="true"></div>
</div>
```

The `.iframe-overlay` is `position:absolute; inset:0; cursor:pointer; z-index:2` on top of the iframe. It absorbs all pointer events. The iframe has `tabindex="-1"` so it is not reachable by keyboard while inactive.

Activation (first click on overlay):

```js
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';    // remove overlay
  iframe.removeAttribute('tabindex');
  iframe.focus();
  document.body.setAttribute('data-demo-active', '');
});
```

Deactivation (Esc key or click outside iframe-wrapper):

```js
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.body.hasAttribute('data-demo-active')) {
    deactivateIframe();
    e.stopPropagation();             // don't also trigger overview grid toggle
    return;
  }
  if (!document.body.hasAttribute('data-demo-active')) {
    handleDeckKey(e);                // arrow / space / O only when deck is active
  }
});

function deactivateIframe() {
  overlay.style.display = '';
  iframe.setAttribute('tabindex', '-1');
  iframe.blur();
  document.body.removeAttribute('data-demo-active');
  // return focus to the stage so keyboard events fire on document again
  document.querySelector('.deck-stage').focus();
}
```

Click-outside detection:

```js
document.addEventListener('click', e => {
  if (!document.body.hasAttribute('data-demo-active')) return;
  if (!e.target.closest('.iframe-wrapper')) {
    deactivateIframe();
  }
});
```

### Gotcha — keyboard events inside iframe never reach the parent document

Once the iframe has focus, `keydown` events fire on the iframe's document, NOT the parent. This is expected and correct — the tool inside needs keys. Deactivation relies on Esc being handled by the iframe page bubbling up OR, more reliably, the parent listening for `blur` on the iframe element:

```js
iframe.addEventListener('blur', () => {
  // fires when focus leaves the iframe (e.g., user tabs out)
  // do NOT auto-deactivate here — only deactivate on explicit Esc or click-outside
  // otherwise tabbing within the tool would close demo mode unexpectedly
});
```

Do NOT auto-deactivate on `blur`. The presenter may tab between fields inside the tool. Only Esc and click-outside deactivate. The overlay's `display:none` state is the single source of truth for active/inactive.

### Same-origin note

All tool pages are in the same repo, so same-origin (`file://` same directory tree, GitHub Pages same domain). No cross-origin iframe restrictions apply. `iframe.focus()` works without restriction. If the deck were ever served from a different origin than the tools, `focus()` and `blur` event listening would be blocked — not a concern here.

### `.deck-stage` focus

Give `.deck-stage` `tabindex="0"` so it can hold focus and receive `keydown` events when the iframe is inactive:

```html
<div class="deck-stage" tabindex="0">...</div>
```

Call `stage.focus()` on DOMContentLoaded and after deactivating an iframe.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| CSS transitions | JS-animated timers | CSS `transition` + class toggling |
| reduced-motion | JS `matchMedia` branching everywhere | Single `@media (prefers-reduced-motion)` block in `deck.css` that disables `transition` and `animation` |
| Scale math | CSS `zoom` or `vw`-relative font sizes | `transform: scale()` on fixed-px stage |
| Slide visibility | `display:none`/`block` toggling | `opacity` + `pointer-events` via CSS classes (keeps layout stable, allows transitions) |

---

## Common Pitfalls

### Pitfall 1: Using `display:none` for inactive slides
**What goes wrong:** `display:none` collapses layout and prevents CSS transitions from firing on enter/exit — you get instant snap, not a fade.
**Fix:** Use `opacity: 0; pointer-events: none` for hidden slides and `opacity: 1; pointer-events: auto` for active. All slides remain in layout flow (they are `position:absolute` inside the stage, so they don't affect document flow).

### Pitfall 2: `transform-origin: center center` on the stage
**What goes wrong:** The stage scales from its center, so the translate math is wrong and the stage drifts off-screen at unexpected aspect ratios.
**Fix:** `transform-origin: top left` and apply the centering manually via `translate(tx, ty)` as shown above.

### Pitfall 3: `pushState` on `file://` in Firefox
**What goes wrong:** `history.pushState` throws a `SecurityError` on `file://` in Firefox. Deck breaks at runtime on USB.
**Fix:** Use `location.hash` + `replaceState` (never `pushState`) for in-deck navigation.

### Pitfall 4: `data-demo-active` check missing from keydown handler
**What goes wrong:** Arrow keys are handled by the deck AND passed to the iframe, double-advancing slides when the tool is active.
**Fix:** All deck keydown logic must be gated: `if (document.body.hasAttribute('data-demo-active')) return;`

### Pitfall 5: Esc key collision between demo-mode exit and overview-grid toggle
**What goes wrong:** Esc is used both to exit demo mode (D-09) and to close the overview grid (D-14). If both listeners run, the overview opens immediately after closing demo mode.
**Fix:** In the Esc handler, call `e.stopPropagation()` (or check priority order) — demo-mode exit wins. Overview toggle only fires when neither the overview is open nor demo mode is active.

---

## Architecture Patterns

### Recommended File Structure

```
assets/
  style.css          (existing — unchanged)
  deck.css           (new — stage layout, slide transitions, fragment CSS, HUD)
  deck.js            (new — state machine, key/click handlers, hash sync, iframe control)
decks/
  index.html         (presentations index — card-deck fan/deal-out)
  <slug>/
    index.html       (deck HTML — thin wrapper: loads deck.css + deck.js, contains <section class="slide"> elements)
    SPEC.md          (deck spec)
    assets/          (any deck-specific images / recordings)
```

### deck.js State Machine

```
State: { slideIdx, fragmentIdx, demoActive, overviewOpen }

Events → State transitions:
  → / Space       : advance() → fragment or next slide
  ← / Backspace   : retreat() → un-fragment or prev slide
  O               : toggle overview grid
  Esc             : close overview OR exit demo mode (priority: demo first)
  overlay click   : enter demo mode
  click-outside   : exit demo mode
  hashchange      : goToSlide(url index)
  resize          : fitStage()
```

### CSS Class Convention

| Class | Meaning |
|---|---|
| `.slide--active` | Currently visible slide |
| `.slide--leaving` | Transitioning out (remove after transition ends) |
| `.fragment[data-fragment-revealed]` | Fragment is visible |
| `body[data-demo-active]` | iframe demo mode is on |
| `body[data-overview]` | Overview grid is open |

---

## Assumptions Log

| # | Claim | Risk if Wrong |
|---|-------|---------------|
| A1 | `history.replaceState` works on `file://` in all target browsers | Deck URL never updates on USB; low impact since slides still work |
| A2 | `iframe.focus()` from parent is permitted same-origin on all browsers | Demo mode can't grab iframe keyboard; workaround: user clicks inside iframe directly |
| A3 | CSS `opacity` transition fires correctly on `position:absolute` slides without `display:none` | If a browser collapses zero-opacity absolutely-positioned elements, switch to `visibility` |
| A4 | `will-change: transform` on `.deck-stage` mitigates subpixel blur sufficiently | Text may appear slightly soft on some GPU/scale combinations; not fixable without integer scale |

---

## Sources

### Primary (HIGH confidence — Web platform specifications / MDN)
- CSS Transforms spec: `transform-origin`, `transform: scale()` — [ASSUMED] well-established since CSS3
- Web History API: `replaceState` vs `pushState`, `hashchange` event — [ASSUMED]; `file://` Firefox pushState restriction is a known documented behavior
- iframe focus model: same-origin `focus()`/`blur()` permitted — [ASSUMED]; cross-origin restriction is well-documented

### No external packages required — no Package Legitimacy Audit needed.

---

**Research date:** 2026-06-24
**Valid until:** Indefinite — pure Web platform, no library versioning concerns
