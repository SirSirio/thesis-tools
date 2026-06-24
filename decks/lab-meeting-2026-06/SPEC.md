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

The seed deck covers six sequential segments:
1. **Title Slide:** Introduction and agenda.
2. **Coding-with-AI (GSD):** Overview of the spec-driven development loop.
3. **Designing-with-AI (Rotor Solver):** Features a **live iframe** embed of the Peristaltic Rotor Geometry Solver tool.
4. **Designing-with-AI (Displaced-Volume Model):** Features a **live iframe** embed of the Occlusion & Displaced-Volume Model, deep-linked to the `#calculator` anchor.
5. **proto-01:** Static content detailing the 5 µL 4-roller baseline test.
6. **proto-02:** Static content detailing the gap-sweep redesign.
7. **Test-Campaign App:** Static media (screenshots/recording) of the external test-campaign app, as it cannot be served via same-origin iframe (D-10).

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
