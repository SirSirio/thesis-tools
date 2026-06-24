# Phase 5: HTML Presentation Decks - Context

**Gathered:** 2026-06-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a **reveal-style HTML slide-deck runtime** on the tools site plus a **creative, dated presentations index page**, seeded with **one ~15-minute lab-meeting deck**. The runtime renders full-screen slides in the site's dark-glass theme with keyboard + click navigation, stepped fragment animations, and slide transitions. The first deck covers six segments: Coding-with-AI (GSD), Designing-with-AI (rotor solver + displaced-volume model), proto-01, proto-02, and the automated test-campaign app.

**This phase clarifies HOW to build the runtime + index + first deck.** Building additional decks, or new tools to feature in them, are separate efforts.

</domain>

<decisions>
## Implementation Decisions

### Deck architecture
- **D-01:** **Shared runtime** — `assets/deck.css` + `assets/deck.js`. Decks are thin HTML that load these two files. This is a deliberate, justified break from the project's inline-only norm (the runtime is reused by every future deck; duplicating it inline per deck would rot). The only other shared resource remains `assets/style.css`, which `deck.css` builds on top of.
- **D-02:** Decks live at **`decks/<slug>/index.html`** (mirrors `tools/` and `prototypes/`). A slide is authored as a flat sequence of **`<section class="slide">`** elements — no nesting, no JSON model. HTML is the hand-authored source of truth.
- **D-03:** **Fixed canvas, PowerPoint widescreen** — 16:9 at **1280×720**. The deck **scales-to-fit** the viewport and **letterboxes** (CSS `transform: scale()` on a fixed-size stage). Authors design against the exact 1280×720 PowerPoint proportions; it looks identical on a laptop and a projector.
- **D-04:** **Each deck is its own real page** — navigating from the index does a full page load to `decks/<slug>/index.html`, **not** an in-page swap. (User explicitly disliked the Phase-4 swap-to-detail model and reversed it here.)
- **D-05:** The presentations **index uses hand-authored cards** — one card per deck (title + date), written by hand in the index HTML. No manifest/JSON, no build pipeline (decks are one-shot, low edit churn).
- **D-06:** **Index "magic" = card-deck fan / deal-out** — decks present as a fanned deck of cards that deals out / spreads on load (slides ≈ a deck of cards pun). This is the index's signature motion, distinct from Phase 4's winding path.

### Embedding live tools
- **D-07:** Site tools (rotor solver, displaced-volume model) are embedded as **live `<iframe>`s of the real tool pages** — fully interactive mid-talk and always in sync; when a tool is improved the deck reflects it automatically (no duplication, no stale screenshots).
- **D-08:** The iframe sits in a **framed "screen" panel (~70% of the slide) with a slide title/caption** beside or above it — it reads as a slide, not a raw website. The slide always keeps a title even though the embed is live.
- **D-09:** **Click-to-activate focus** — the iframe is inert (an overlay catches clicks) until the presenter clicks it to enter "demo mode"; **Esc or click-outside** hands keyboard control back to the deck. This guarantees arrow/space navigation is never swallowed by the embedded tool.
- **D-10:** The **external test-campaign app** (lives in sibling `03. CODING` project, not servable from this static site / GitHub Pages) is shown via **screenshots / a short muted screen-recording** checked into the deck folder. Its slide also keeps a title. (Not a live iframe — chosen specifically because the app is external.)

### Navigation & deep-linking
- **D-11:** **Hash-per-slide deep links** — URL updates as you navigate (`#/7` or `#slide-7`); refresh or a shared link lands on that exact slide; browser back/forward step through slides. Enables citing a specific slide from the thesis. (Fragment-level URLs were considered and *not* chosen — slide granularity only.)
- **D-12:** **On-screen nav aids:** a thin accent-gradient **progress bar**, a **slide counter (7 / 24)**, and **prev/next arrow buttons** (arrows also serve click-navigation and leaving an active iframe). Idle-fade is acceptable.
- **D-13:** **Reveal-style stepping** — `→`/`Space` reveals the next fragment on the current slide; once all fragments are shown, the next press advances to the next slide. One key builds then advances (familiar reveal.js / PowerPoint feel).
- **D-14:** **Jump affordances:** an **overview grid** toggled by **O / Esc** (thumbnail grid of all slides, click to jump) and a persistent (idle-fading) **"← Presentations"** link back to the index, mirroring the site's "← All tools" nav pattern. (Home/End jump keys were offered and not selected — skip unless trivial.)

### Carried forward from Phase 4 (apply unless overridden)
- **D-15:** **No external animation/slide libraries** — no reveal.js CDN, no GSAP. Native HTML/CSS/JS only; must run offline from USB and on GitHub Pages. (All "reveal-style" behavior is bespoke.)
- **D-16:** Reuse `assets/style.css` design tokens and the nav/blob chrome; signature motion (deal-out, transitions) is bespoke.
- **D-17:** **`prefers-reduced-motion` guard** on all deck animations/transitions and the index deal-out, so motion never breaks the experience.

### Claude's Discretion
- Exact slide-transition style (fade / slide / push) and fragment animation curves — planner/executor choose within the bespoke, reduced-motion-guarded constraint.
- Precise hash format (`#/7` vs `#slide-7`), overview-grid layout, and idle-fade timing.
- iframe scaling/lazy-loading mechanics inside the framed panel.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase precedent (animation, page structure, offline constraints)
- `.planning/phases/04-prototype-design-space/04-CONTEXT.md` — closest precedent: bespoke animated journey page, no-library / offline / reduced-motion decisions, HTML-as-source-of-truth.
- `prototypes/index.html` — reference implementation of a bespoke animated page (winding-path journey, animate-in, blob chrome) to mirror in style and beat.

### Design system & shared chrome
- `assets/style.css` — the only existing shared resource; all design tokens (background `#0a0a0c`, accent `#ff6b2b`→`#e83535`, glass cards, text colors, `fade-up` entrance). `assets/deck.css` builds on these.
- `index.html` (repo root) — landing page; the presentations index must be linked from here and reuse its card/nav/blob patterns.

### Tools to embed (live iframes — D-07/D-08)
- `tools/rotor-solver/index.html` — Peristaltic Rotor Geometry Solver (Designing-with-AI segment).
- `tools/peristaltic-roller-displaced-volume-model/index.html` — Occlusion & Displaced-Volume Model (Designing-with-AI segment); note `#calculator` anchor exists for deep-linking into the interactive part.
- `tools/gsd-workflow-guide/index.html` — GSD Workflow Guide (Coding-with-AI segment may reference/embed it).

### First-deck content sources
- `prototypes/proto-01-5ul-4roller/PROTOTYPE.md` — proto-01 segment content.
- `prototypes/proto-02-5ul-4roller-v2/PROTOTYPE.md` — proto-02 segment content.
- `prototypes/PROTOTYPES.md` — shallow prototype registry.
- **External (test-campaign app, screenshots only — D-10):** sibling `03. CODING` project docs (`manual-dispense-check/.../REPORT.md` and the test-campaign app's own docs). Not part of this repo; capture as images checked into the deck folder.

### Project guardrails
- `CLAUDE.md` — design system, offline/GitHub-Pages constraints, no-CDN-without-local-fallback rule, VS Code Live Preview pitfall.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/style.css` tokens (accent gradient, glass cards, `fade-up`, `--delay` stagger) — `deck.css` and the index deal-out extend these rather than redefining.
- Phase-4 bespoke-animation patterns in `prototypes/index.html` (IntersectionObserver/animate-in, SVG path motion, reduced-motion guard) — directly transferable to deck transitions and the deal-out.
- "← All tools" nav-bar pattern (present on every tool page) — template for the deck's "← Presentations" link (D-14).
- KaTeX local-fallback pattern in `tools/peristaltic-roller-displaced-volume-model/katex/` — precedent for the project's "no CDN without local fallback" rule, relevant if any deck needs vendored assets.

### Established Patterns
- Folder convention `tools/<slug>/index.html` and `prototypes/<slug>/` — Phase 5 mirrors it with `decks/<slug>/index.html`.
- Inline-only logic is the norm; **D-01 is the sanctioned exception** (shared `deck.css`/`deck.js`) and must be called out in the tool's SPEC.md and CLAUDE.md.
- Per-page inline i18n (data-i18n) exists site-wide; decide during planning whether decks honor the ENG/IT switch or are single-language (the displaced-volume model already opted out of i18n — precedent for opting out).

### Integration Points
- Landing page `index.html` gains a card/link to the presentations index.
- `README.md` tool table, repo-root `ROADMAP.md`, and `CLAUDE.md` folder structure all need new rows/entries for `decks/` and `assets/deck.css`+`deck.js`.
- New deck SPEC.md co-located per the tool-spec standard.

</code_context>

<specifics>
## Specific Ideas

- "I would like to have some magic" on the index → resolved as the **card-deck fan / deal-out** (D-06).
- Explicit dislike of Phase-4's in-page swap-to-detail → reversed: **real page loads per deck** (D-04).
- "Embed the other page in the slide, so if the tool gets updated I simply have it there" → confirms **live iframes** for site tools (D-07), with the slide still carrying a **title** (D-08).
- Slides must match the **standard PowerPoint** proportions everyone expects on a projector (D-03).

</specifics>

<deferred>
## Deferred Ideas

- Fragment-level deep linking (`#/7/2`) — considered, deferred in favor of slide-granular URLs (D-11). Revisit only if a future deck needs it.
- Home/End jump keys — offered, not selected (D-14). Add later if cheap.
- Additional decks beyond the first lab-meeting deck — out of scope for this phase; the runtime is built to support them.
- A built/exported snapshot of the test-campaign app embedded as a live iframe — deferred (D-10 uses screenshots); revisit if the app gains a static export.

</deferred>

---

*Phase: 5-HTML Presentation Decks*
*Context gathered: 2026-06-24*
