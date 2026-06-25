# HTML Presentation Decks & Lab Meeting Jun 2026 — Tool Spec

**Tool:** Presentation Deck System & Lab Meeting Seed Deck  
**File:** `decks/lab-meeting-2026-06/index.html` (Seed Deck) and `decks/index.html` (Presentations Index)  
**Status:** Live

---

## Purpose & Scope

A reveal-style HTML presentation deck system integrated directly into the tools site, allowing project prototypes and analytical models to be showcased inline during talks. This spec covers the reusable deck runtime, the presentations index page, and the seed lab-meeting deck that exercises the system.

---

## The Shared Runtime (D-01 Exception)

To prevent code rot across multiple one-shot presentation decks, the deck architecture employs a shared runtime. **This is a deliberate, sanctioned exception (D-01) to the project's inline-only norm.** 

The runtime consists of two files that are reused by every future deck:
- `assets/deck.css`: Owns the fixed-stage layout, slide transitions, fragment animations, HUD styling (progress bar, counter, arrows), overview grid layout, iframe panel styling, and all `prefers-reduced-motion` guards. It builds on top of the project's only other shared resource, `assets/style.css`.
- `assets/deck.js`: Owns the interactive state machine: scale-to-fit resizing, keyboard and click navigation, fragment stepping, slide transition application, URL hash routing (`#/<n>`), HUD updating, overview grid generation and toggling, and iframe focus capture/release mechanics.

---

## Authoring Model

Decks are authored as static HTML without a build pipeline:
- **Location:** `decks/<slug>/index.html`.
- **Structure:** A flat sequence of `<section class="slide">` elements within a `.deck-stage` container.
- **Stage Size:** Fixed 1280×720 widescreen canvas that scales-to-fit the browser viewport while letterboxing, ensuring standard projector proportions.
- **Fragments:** Elements marked with `.fragment` remain hidden until revealed via forward stepping.
- **Embeds:** Live tools are embedded using a `.iframe-wrapper` container with an inner `<iframe>` and `.iframe-overlay` to manage focus capture safely. Tools use `auto-fade-iframe` to appear smoothly.
- **Copywriting:** Use massive text, minimal bullet points, and message-driven titles (e.g., "Proto 1 proved the concept but underdelivered").
- **Visuals:** Rely on direct technical visual evidence (e.g., raw SVG curve rendering) rather than raw equations.

## Seed Deck Contents (Lab Meeting Jun 2026)

The deck is organised into **three modules, each introduced by a full-bleed section divider**. Order: Alignment → AI → Pump.

1. **Title Slide:** Introduction; agenda lists the three sections.
2. **Divider 01 — Alignment Module:** Full-bleed background = `assets/alignment_poster.jpg`.
3. **Alignment Module:** Title only + embedded `Alignment_Module_V2.mp4` (no bullets). Video auto-plays/pauses on slide activation, muted + looped.
4. **Divider 02 — AI for Engineering:** Full-bleed background = the displaced-volume tool screenshot.
5. **AI as a tool:** Claude Code splash (`CaludeCode_image.png`) in a terminal frame + two points (research partner / build accelerator).
6. **GSD:** Distinguishes **spec-driven development** (the discipline) from **GSD** (one framework that automates it). Discuss → Plan → Execute cards mirror the `gsd-workflow-guide` tool.
7. **Divider 03 — Pump Module:** Full-bleed background = `Prototype1_Render_Open.png`.
8. **Rotor Solver:** **Live iframe** embed of the Peristaltic Rotor Geometry Solver tool.
9. **Displaced-Volume Model:** **Live iframe** embed, deep-linked to the `#calculator` anchor.
10. **proto-01:** CAD render + real-prototype photo side-by-side, plus the open-loop calibration results card.
11. **proto-02:** Gap-sweep hump-curve SVG.
12. **Test-Campaign App:** Static media of the external test-campaign app, which cannot be served via same-origin iframe (D-10).

### Section Dividers (full-bleed image tint)

Each module opens with a divider slide: a full-bleed cover image behind a left-weighted dark scrim, with an eyebrow section number, a large (≈4.6rem) gradient title (≤3 words), and a one-line subtitle. No bullets — the divider is a narrative "breath" that resets audience attention before a new section (per established presentation-design practice). All three dividers share one layout for consistency.

### Image-First Animation Model

All content slides reveal **media first, then writing**. Because inactive slides sit at `opacity:0` (not `display:none`), plain CSS animations would fire once at page load and be finished before a later slide is shown. A **deck-local inline script** (shared `assets/deck.js` is intentionally untouched — D-01) uses a `MutationObserver` to:
- restart every `.auto-anim` element each time its slide gains `slide--active`, so the `avIn` keyframe replays on every visit (media has no delay; writing carries `.delay-1/2/3`);
- `play()`/`pause()` any `video[data-deck-video]` as its slide enters/leaves.

`prefers-reduced-motion` forces `.auto-anim` elements visible and disables the animation.

---

## Navigation

- **Stepping:** Arrow keys or Spacebar advance through fragments (D-13), then transition to the next slide once all fragments are revealed.
- **Deep Links:** Slide-level routing is tracked in the URL hash (`#/<n>`) allowing direct navigation and browser history support (D-11).
- **HUD:** An idle-fading interface overlay provides a progress bar, slide counter, and clickable prev/next arrows (D-12).
- **Overview:** Pressing `O` or `Esc` toggles a glassmorphic thumbnail overview grid. Thumbnails use a JS `ResizeObserver` to perfectly scale the 1280x720 clones (`transform: scale(var(--thumb-scale))`), avoiding CSS container query quirks (D-14).
- **Exit:** A persistent "← Presentations" link returns to the index page.

---

## Assumptions

- **Single-Language:** Decks are authored in English only (no `data-i18n` support by default).
- **Offline-First:** All assets are local; no CDNs are used (D-15).
- **Reduced Motion:** All transitions and structural animations respect OS-level reduced-motion preferences (D-17).
- **Same-Origin Embeds:** Embedded `<iframe>` tools are assumed to be same-origin to prevent cross-origin focus trapping or security issues.
