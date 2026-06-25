# Phase 4: Prototype Design Space - Context

**Gathered:** 2026-06-15
**Status:** Ready for planning

<domain>
## Phase Boundary

A static, animated **Prototype Design Space** page on the tools site: a winding visual "journey" of prototypes that each open into a full detail view (purpose, parameters with tool links, per-prototype results), authored end-to-end for proto-01. HTML is the content source of truth (hand-maintained via chat) — no build pipeline, no JSON data model, no runtime fetch.

**Scope narrowed during discussion:** the reasoning-skills showcase (SPEC #5) and the design-capture convention (SPEC #6) are **deferred to a future phase** by user decision — they'll be decided when actually living the design process. This phase ships the prototype journey + proto-01 only.

</domain>

<spec_lock>
## Requirements (locked via SPEC.md)

**6 requirements are locked.** See `04-SPEC.md` for full requirements, boundaries, and acceptance criteria.

Downstream agents MUST read `04-SPEC.md` before planning or implementing. Requirements are not duplicated here.

**In scope (from SPEC.md):**
- The Prototype Design Space HTML page (styled, animated, linked from landing)
- Animated prototype journey/path with summary→detail interaction
- Per-prototype detail: Purpose, Parameters table (+ tool links), Results (per-prototype metrics), Design reasoning, optional pictures
- proto-01 authored end-to-end from real `03. CODING` report data

**Out of scope (from SPEC.md):**
- A universal JSON/report data model or test-plan/pass-criteria schema — per-prototype, discussed individually
- Unblocking `03. CODING` with a global results contract
- Any build pipeline, generator script, or runtime JSON/markdown fetch — HTML is hand-authored
- Designing new prototypes (proto-02+) within this phase
- Per-prototype pass/fail gating or scoring logic

**⚠ Deferred from this phase by discussion (was SPEC #5/#6):**
- SPEC #5 reasoning-skills showcase section → future phase
- SPEC #6 design-capture convention → future phase
- Planner should treat #5/#6 as NOT in this phase's scope. The page may omit the skills section entirely (no stub required unless trivial).

</spec_lock>

<decisions>
## Implementation Decisions

### Journey visual & interaction
- **D-01:** Journey is a **winding SVG path** (curved S-path snaking down the page) with prototype nodes/cards docked along it — NOT a plain stacked-card list, NOT a straight timeline (on desktop).
- **D-02:** Clicking a prototype **swaps to a full single-prototype detail view** (client-side show/hide within the one HTML file, no page reload), with a **back-to-journey** control. This supersedes the SPEC's "inline expand/collapse" wording — the interaction is navigate-to-detail, not accordion.
- **D-03:** **Single prototype detail at a time** (only one detail view shown; consistent with the swap model).
- **D-04:** **Bespoke animation — do NOT recycle** the existing GSD-guide accordion or the landing `.tool-card` pattern for the journey. This page gets its own signature motion. (The existing patterns may still inform unrelated chrome like the nav bar, but the journey is custom.)
- **D-05:** **Magic entrance:** on the journey view, the winding SVG line **draws itself** (animated reveal), then prototype nodes **pop in sequentially** along it.
- **D-06:** **Mobile (≤ breakpoint, target ~375px):** the winding path **straightens into a clean vertical timeline**, cards full-width and readable. Magic stays on desktop, sanity on mobile.

### Journey animation technique (locked — researched for first-time reliability)
- **D-07:** Path draw uses an SVG `<path>` with **`pathLength="1"`** set, animating **`stroke-dasharray`** (NOT `stroke-dashoffset` — older Firefox/Linux reversed dashoffset). `pathLength="1"` normalizes length so no `getTotalLength()` JS math is needed (removes the #1 failure mode).
- **D-08:** Trigger the draw with **`IntersectionObserver`** adding an `.is-visible` class when the path scrolls into view — off-main-thread, no scroll jank, fires reliably once.
- **D-09:** Nodes pop in via **staggered CSS `transition-delay`**, sequenced to begin as the line finishes drawing.
- **D-10:** Wrap all motion in **`@media (prefers-reduced-motion: no-preference)`** plus a JS `matchMedia('(prefers-reduced-motion: reduce)')` guard — reduced-motion users get the final drawn state instantly, never a broken half-drawn path.
- **D-11:** No external animation libraries (GSAP etc.) — native SVG/CSS/IntersectionObserver only, honoring the offline/static/no-CDN constraint.

### Results layout (per-prototype KPIs)
- **D-12:** Detail Results = **hero stat-card(s)** at the top (1–3 headline metrics) → a **small visual** for the key result → **detailed data table(s)** below. Below the hero, results are **mostly free-form per prototype**.
- **D-13:** Use a **light shared skeleton** (recommended, not enforced) for the table — e.g. **Metric / Measured / Target / Verdict** columns — reused across prototypes for comparability, with rows added/dropped freely per prototype.
- **D-14:** The headline visual is a **pure-CSS/SVG mini chart** (no libraries) where it clarifies the result — for proto-01, a **measured-vs-target bar** (e.g. ~678 µL vs 1000 µL command, or 3.4 vs 5.0 µL/stroke).
- **D-15:** **Build proto-01's results concretely first**; that authored layout becomes the reusable template the user retakes/edits for future prototypes.

### proto-01 content (authored from real data)
- **D-16:** proto-01 hero metrics: **≈3.4 µL/stroke (gravimetric)**, **−32% under-dispense**, **CV 4.5%**. Detail table = the **flow-vs-gravimetric comparison** transcribed from `03. CODING/manual-dispense-check/proto-01-5ul-4roller/REPORT.md`, with the note that gravimetric is the absolute reference and flow under-reads ~11.5%.
- **D-17:** Numbers are **transcribed/copied into the HTML** (no disk-relative links into the private `03. CODING` sibling — published-site rule).

### Claude's Discretion
- Exact page file path: **`prototypes/index.html`** (co-located with the existing markdown tracker), linked from a new card on landing `index.html`. (Builder decision; revisit only if it complicates relative asset paths.)
- Whether/where to add a small headline visual beyond proto-01 — add only when it genuinely clarifies a result, else tables.
- Precise curve geometry of the winding path and node styling, within the dark glassmorphic system.

### Advisor mode (process note, not a build decision)
- User asked about advisor mode; it's OFF (no `USER-PROFILE.md`). Decision: **finish Phase 4 discussion inline now, run `/gsd:profile-user` afterward** so advisor mode is on for future discuss-phases. Not a Phase 4 deliverable.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements (locked)
- `.planning/phases/04-prototype-design-space/04-SPEC.md` — Locked requirements, boundaries, acceptance criteria. MUST read before planning. Note the #5/#6 deferral recorded in this CONTEXT.

### Prototype tracker & handover
- `.planning/notes/2026-06-15-prototype-tracker-architecture.md` — the design/test split, two-tier knowledge, why prototypes live in this repo
- `.planning/notes/2026-06-15-prototype-test-schema-decision.md` — open per-prototype schema decision (out of scope here; context only)
- `prototypes/PROTOTYPES.md` — registry + conventions
- `prototypes/Prototype-1-Pump-Module/proto-01-5ul-4roller/PROTOTYPE.md` — proto-01 deep detail; some design-param TODOs to back-fill into the page

### proto-01 test data (sibling repo — transcribe, do NOT runtime-link)
- `../03. CODING Thesis Out of Drive/manual-dispense-check/proto-01-5ul-4roller/REPORT.md` — flow + gravimetric results; source for proto-01's Results section
- `../03. CODING Thesis Out of Drive/PROTOTYPE-INDEX.md` — cross-repo contact point (status: results contract pending, per-prototype)
- `../03. CODING Thesis Out of Drive/app/analysis.py` — KPI shapes (`accuracy_pct`, `precision.cv_pct`, etc.); reference only, not adopted as a fixed schema

### Animation technique (researched)
- SVG line animation / `stroke-dasharray` + `pathLength`: https://css-tricks.com/svg-line-animation-works/ and https://www.stefanjudis.com/today-i-learned/pathlength-makes-makes-svg-path-animations-easier-to-manage/
- IntersectionObserver scroll-trigger + `prefers-reduced-motion`: https://coolcssanimation.com/how-to-trigger-a-css-animation-on-scroll/

### Project conventions
- `CLAUDE.md` — static/offline/no-build constraints, design system, VS Code Live Preview pitfall, `serve.bat`
- `assets/style.css` — design tokens (`--accent`, blobs, `fade-up`); reuse tokens, additive-only changes
- `index.html` — landing page; add the Prototype Design Space card here

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `assets/style.css`: `--accent`/`--accent-2`/`--accent-glow` tokens, `.blob` ambient background, `.animate-in` + `fade-up` keyframes, glass card (`backdrop-filter: blur(24px)`). Reuse tokens and chrome (nav, blobs). The journey motion itself is bespoke (D-04).
- Landing `index.html`: `.tool-card.animate-in` with staggered `--delay` — pattern to add the new page's card.
- `tools/gsd-workflow-guide/index.html`: has an accordion (`.open` + rotating `▸` + `aria-expanded`) — reference for general toggle wiring only; NOT the journey interaction (which is swap-to-detail, D-02).

### Established Patterns
- Every tool page: dark glassmorphic theme, `← All tools` nav bar back to `../../index.html` (this page at `prototypes/index.html` → back to `../index.html`), all logic/styles inline, no CDN-only deps.
- No horizontal scroll at 1280px and 375px (project hard rule).

### Integration Points
- New file `prototypes/index.html` (co-located with `PROTOTYPES.md`).
- New card in `index.html` landing grid.
- README.md tool table + CLAUDE.md folder structure updates (per project workflow).

</code_context>

<specifics>
## Specific Ideas

- "Touch of magic, but professional, elegant, modern" — the winding path that draws itself with sequential node pop-in is the headline moment (D-01, D-05, D-07..D-10).
- "Just works the first time" — the explicit reason the animation technique was researched and locked (D-07..D-11), rather than improvised.
- "Build something for this prototype, then I can retake the design and edit for others" — proto-01 is the authored reference implementation; future prototypes reuse its layout (D-15).
- The reasoning-skills section, when it returns in a future phase, should sit at the page bottom, de-emphasized, collapsed — focus stays on the prototypes (carried from SPEC #5 for the future phase).

</specifics>

<deferred>
## Deferred Ideas

- **Reasoning-skills showcase (SPEC #5)** → future phase. Functional Claude skills + a de-emphasized expandable bottom section transcribing them. Decide storage/invokability (`.claude/skills/` vs co-located) when living the process.
- **Design-capture convention (SPEC #6)** → future phase. `/gsd:thread` per prototype vs `DESIGN-LOG.md` in `prototypes/proto-NN/`. Decide when actually capturing a design discussion.
- Suggest a future **"Phase 5: Prototype design-capture & reasoning-skills"** to hold both.
- proto-02 redesign and per-prototype test-plan/KPI schema — already tracked in the prototype notes; not this phase.

</deferred>

---

*Phase: 4-prototype-design-space*
*Context gathered: 2026-06-15*
