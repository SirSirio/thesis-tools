# Roadmap: Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

## Overview

The site grows incrementally as the thesis generates new design decisions needing computational support. New phases are added when a Proto 1 decision demands a tool — the backlog in `ROADMAP.md` (repo root) lists candidates but they are not pre-committed phases.

## Shipped

| What | Notes |
|------|-------|
| Peristaltic Rotor Geometry Solver | Solves rotor radius analytically for a target stroke volume; checks roller collision, hub clearance, and tube length feasibility across roller counts 3–12. Shipped before GSD setup. |
| Language Switcher (ENG/IT) | ENG/IT toggle on every page, localStorage persistence, data-i18n attribute approach, no page reload. Implemented via OpenSpec change `language-switcher-eng-it`. Shipped before GSD setup. |

## Active Phases

- [x] **Phase 1: Motor & Microstepping Panel** - Extend the rotor solver with motor operating-point calculations so Proto 1 hardware decisions can be made from calculated data (completed 2026-05-30)
- [ ] **Phase 2: GSD Workflow Visualizer** - Build a standalone tool that renders the GSD spec-driven development workflow as an interactive visual diagram
- [x] **Phase 4: Prototype Design Space** - A visual, animated prototype-journey page where the AI helps design prototypes and the author reviews past ones to improve the process; HTML is the content source of truth (completed 2026-06-15)
- [x] **Phase 5: HTML Presentation Decks** - Reveal-style HTML slide system on the tools site, with a creative dated presentations index, seeded by a 15-minute lab-meeting deck (completed 2026-06-24)

- [x] **Phase 6: System Architecture Explorer** - Promote the ad-hoc electronics-architecture cost/complexity matrix into a first-class tool under `tools/`, leaving the decision records in `prototypes/System-Architecture/` (completed 2026-07-15)
- [x] **Phase 6.1: Architecture Refinement** (INSERTED) - Full-system module schema (all 6 modules, not just pump control), visual design-direction gallery, design-type matrix column, bitbyg sourcing of the newly named parts, and consistency pass over the architecture docs (completed 2026-07-16)
- [ ] **Phase 7: Thesis Showcase Landing Page** - Turn `index.html` from a tool directory into a thesis showcase: project introduction, video/media, and motion above the fold, with the tool grid demoted to one section among several

## Phase Details

### Phase 1: Motor & Microstepping Panel

**Goal**: Add motor and microstepping analysis to the peristaltic rotor solver so Proto 1 operating-point decisions (torque margin, steps per stroke, max reliable step rate) can be made from calculated data rather than guesswork
**Depends on**: Nothing (first GSD phase)
**Requirements**: MOTOR-01, MOTOR-02, MOTOR-03, MOTOR-04
**Success Criteria** (what must be TRUE):

  1. User opens the rotor solver and sees a Motor & Microstepping panel below the geometry results table with voltage selector, microstepping dropdown, and step rate input
  2. After solving geometry and setting motor inputs, all seven derived outputs are displayed (steps per stroke, volume per step, torque at rim, compression load range, torque margin indicator, max reliable step rate, RPM)
  3. Changing any motor input updates all outputs instantly without a page reload
  4. No motor spec input fields are present; the panel uses fixed Wantai 42BYGHW811 / DRV8825 constants silently
  5. No new source files exist and assets/style.css is unchanged after the feature merges

**Plans**: 3 plansPlans:
**Wave 1**

- [x] 01-01-PLAN.md — Foundation: voltage + microstepping selects, motor constants block, .warn CSS, event listeners

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 01-02-PLAN.md — Motor calculations in upd(), six table columns, dynamic Time column, RPM summary card

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 01-03-PLAN.md — Notes documentation: FoS + max step rate footnotes, motor constants, compression load range (EN + IT)

**UI hint**: yes

### Phase 2: GSD Workflow Visualizer

**Goal**: Build a new standalone tool page that renders the GSD spec-driven development workflow as an interactive visual diagram, demonstrating the discuss → plan → execute loop with optional steps
**Depends on**: Nothing (Phase 1 complete)
**Requirements**: GSD-01–GSD-04 (see REQUIREMENTS.md)
**Success Criteria** (what must be TRUE):

  1. A new tool page at `tools/gsd-workflow-guide/index.html` exists and is linked from the landing page
  2. The page displays a visual diagram of the GSD workflow showing the core loop (discuss → plan → execute) and optional steps (spec-phase, verify-work, code-review, ship)
  3. The tool follows the same dark glassmorphic theme and nav-bar pattern as existing tools
  4. No new shared files — all logic and styles are inline

**Plans**: 2 plans
**Wave 1**

- [x] 02-01-PLAN.md — Tool page: HTML structure, CSS diagram layout, expand/collapse JS, all 12 nodes

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 02-02-PLAN.md — Integration: SPEC.md, landing page card, README row, CLAUDE.md update

### Phase 3: Peristaltic Roller Occlusion & Displaced-Volume Model

**Goal**: Build a single combined tool page (two-part) documenting and implementing the tube cross-section stadium model (Part 1) and the axial contact length / displaced-volume model (Part 2). Thesis-level documentation with LaTeX formulas in each part, followed by an interactive calculator.
**Depends on**: Nothing (Phase 2 complete)
**Requirements**: OCCL-01–OCCL-04
**Success Criteria** (what must be TRUE):

  1. Page exists at `tools/peristaltic-roller-displaced-volume-model/index.html` and is linked from landing page
  2. Part 1 contains: stadium theory with KaTeX formulas, symbol table, gap equation derivation, and interactive SVG cross-section figure with 3 compression states
  3. Part 2 contains: contact length and displaced-volume theory with KaTeX formulas, and interactive calculator with 6 inputs and 6 outputs including warning logic
  4. All formulas rendered via KaTeX (CDN primary, local `katex/` folder as fallback); no EN/IT toggle; all logic and styles inline

**Plans**: 1 plan (single-file, executed directly from CONTEXT.md)

- [x] Phase 3 — implemented directly (no PLAN.md — single file scope)

### Phase 4: Prototype Design Space

**Goal**: Build a styled, animated "prototype design space" page on the tools site — a vertical journey of prototype cards that expand into full per-prototype detail (purpose, parameters with tool links, per-prototype results/KPIs, design reasoning), plus a de-emphasized expandable section showcasing the author's functional AI reasoning skills. The HTML page is the content source of truth, maintained via chat; proto-01 is authored end-to-end as the seed. Primary purpose: a space where the AI helps design prototypes and the author reviews past ones to improve the process.
**Depends on**: Prototype tracker handover (`.planning/notes/2026-06-15-prototype-tracker-architecture.md`, `2026-06-15-prototype-test-schema-decision.md`), `prototypes/PROTOTYPES.md`, `prototypes/Prototype-1-Pump-Module/proto-01-5ul-4roller/PROTOTYPE.md`, sibling `03. CODING` report (`manual-dispense-check/proto-01-5ul-4roller/REPORT.md`)
**Requirements**: See `04-SPEC.md` (6 requirements locked)
**Success Criteria**: See `04-SPEC.md` acceptance criteria

**Plans**: 2 plans
**Wave 1**

- [x] 04-01-PLAN.md — Main page: SVG winding path, animated prototype journey, swap-to-detail interaction, proto-01 all four sections with real data

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 04-02-PLAN.md — Integration: SPEC.md, landing page card, README row, CLAUDE.md update

### Phase 5: HTML Presentation Decks

**Goal:** Build a reveal-style HTML slide system on the tools site (site theme, keyboard + click navigation, fragment animations) plus a creative, dated presentations index page; seed it with a ~15-minute lab-meeting deck covering Coding-with-AI (GSD), Designing-with-AI (rotor solver + displaced-volume model), proto-01, proto-02, and the automated test-campaign app.
**Depends on:** Phase 4 (prototype content), external `03. CODING` app docs for the test-campaign slides
**Requirements**: SC-1, SC-2, SC-3 (the 3 Success Criteria below — no formal req IDs for this phase)
**Success Criteria** (what must be TRUE):

  1. A presentations index page is linked from the landing page, listing decks by title + date with a distinctive browse interaction
  2. A slide-deck runtime renders full-screen slides in the site's dark glassmorphic theme with click/keyboard navigation and stepped fragment animations + transitions
  3. The first deck covers all six required segments in a sensible order and embeds the most relevant interactive elements / images, runnable offline and on GitHub Pages

**Plans:** 5/5 plans complete

**Wave 1**

- [x] 05-01-PLAN.md — Shared deck runtime (assets/deck.css + assets/deck.js): scale-to-fit stage, fragment stepping, slide transitions, hash routing, HUD, overview grid, iframe focus capture (SC-2)

**Wave 2** *(parallel; both blocked on Wave 1; no shared files)*

- [x] 05-02-PLAN.md — Presentations index (decks/index.html) with card-deck deal-out + landing-page link (SC-1)
- [x] 05-03-PLAN.md — Seed lab-meeting deck (decks/lab-meeting-2026-06/) authoring all six segments + live tool iframes (SC-2, SC-3)

**Wave 3** *(blocked on Waves 1–2)*

- [x] 05-04-PLAN.md — Integration/docs: deck SPEC.md, README row, repo-root ROADMAP, CLAUDE.md folder structure + D-01 exception (SC-1/SC-2/SC-3)

### Phase 6: System Architecture Explorer

**Goal**: Promote the electronics/communication architecture cost-and-complexity matrix — built ad-hoc during the 2026-07 architecture sparring session at `prototypes/System-Architecture/index.html` — into a first-class, integrated tool, so the device's control-architecture decision (which MCU, which stepper driver, which bus, at what cost and complexity) can be explored interactively like every other design decision on the site.

**Depends on**: Nothing (Phase 5 complete). Content already exists: `prototypes/System-Architecture/{ARCHITECTURE.md, PUMP-CONTROL-CONCEPTS.md, SOLUTION-MATRIX.md, index.html}`

**Requirements**: ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05, ARCH-06, ARCH-07, ARCH-08 (registered in REQUIREMENTS.md 2026-07-15)

**Structural decision (the reason this is a phase, not a quick task):**

- The **interactive calculator is a tool** → move to `tools/system-architecture-explorer/` (`index.html` + `SPEC.md`), gaining the standard `← All tools` nav bar, landing-page card, and README row.
- The **three markdown decision records stay** in `prototypes/System-Architecture/` as design documentation — matching the existing `prototypes/Prototype-1-Pump-Module/multi-liquid-architecture/` precedent (a design-study folder that is *not* a `proto-NN`).
- Rationale: `prototypes/` is itself a tool (Prototype Design Space, its own `index.html`); nesting a second tool `index.html` beneath it is structurally wrong. Tools live in `tools/`; decision records live with the design docs. Cross-link both ways.

**Success Criteria** (what must be TRUE):

  1. Tool lives at `tools/system-architecture-explorer/index.html` with a co-located `SPEC.md`, follows the dark glassmorphic theme, and has the standard `← All tools` nav bar
  2. It is reachable from the landing page (card) and listed in the README tool table and repo-root `ROADMAP.md`
  3. It retains all current behaviour: editable component BOM prices, DKK↔EUR converter with adjustable rate, 17-variant matrix, sort by cost/complexity/concurrency, filter by max price / max complexity / concurrency, expandable per-variant BOM math, and a shared-block (whole-system vs controller-only) toggle
  4. `prototypes/System-Architecture/` retains the three decision records, cross-linked to the tool (and the tool links back to them); no orphaned `index.html` left behind
  5. `SPEC.md` documents the component price table, the variant BOMs, the three comms layers (A screen / B system bus / C driver link), and the assumptions behind the cost model
  6. `CLAUDE.md` folder structure updated; all logic and styles remain inline (no new shared files)

**Notes**:

- Partially retires the deferred v2 backlog item **"BOM / component selector"** — this tool *is* a BOM-driven component/architecture selector, scoped to the control electronics.
- Feeds the open unknown **U5** (does the protocol need simultaneous multi-liquid dispensing?) in the multi-liquid architecture study — the tool prices what the answer costs.
- Related pending todo: *"Redesign and restructure landing page for many tools"* — a 6th tool makes this more pressing, but it stays out of scope here.

**Plans**: 6 plans in 4 waves

**Wave 1**

- [x] 06-01-PLAN.md — Promote + reskin + persistence: move the cost engine to `tools/system-architecture-explorer/index.html`, adopt style.css tokens, two-part shell (locked anchors #theory/#matrix/#diagram), localStorage price/rate persistence (D-06), delete old page

**Wave 2** *(both blocked on 06-01; disjoint files, parallel)*

- [x] 06-03-PLAN.md — Theory prose (D-04) + trim the three decision records to pointers, repoint cross-links, SOLUTION-MATRIX reference-view preface (D-05, D-08), PROTOTYPES.md cross-link
- [x] 06-04-PLAN.md — Chrome/docs: landing-page card, README row, repo-root ROADMAP entry, CLAUDE.md folder structure (ARCH-02, ARCH-06)

**Wave 3** *(blocked on 06-01/06-03)*

- [x] 06-05-PLAN.md — Data model: per-component source + confidence tags (D-07/D-11), integrated-screen candidate variants + RAM/PSRAM (D-10/D-12), pin-budget feasibility with both screen scenarios, SPI/Low default + end-of-phase human-check on the owned ILI9341 (D-09)

**Wave 4** *(blocked on 06-05; disjoint files, parallel)*

- [x] 06-06-PLAN.md — Live variant-driven SVG system diagram + row-click selection (D-01, D-02, D-03)
- [x] 06-07-PLAN.md — Co-located SPEC.md documenting prices, variant BOMs, comms layers, pin-budget + power models with confidence tags (ARCH-05)

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Motor & Microstepping Panel | 3/3 | Complete    | 2026-05-30 |
| 2. GSD Workflow Visualizer | 2/2 | Complete | 2026-05-30 |
| 3. Peristaltic Occlusion & Displaced-Volume Model | 1/1 | Complete | 2026-05-31 |
| 4. Prototype Design Space | 2/2 | Complete   | 2026-06-15 |
| 5. HTML Presentation Decks | 5/5 | Complete   | 2026-06-24 |
| 6. System Architecture Explorer | 6/6 | Complete    | 2026-07-15 |

### Phase 06.1: Architecture refinement: full-system module schema, design-direction gallery, design-type matrix column (INSERTED)

**Goal:** Refine the System Architecture Explorer from a pump-control cost matrix into a whole-device architecture page: introduce the system with a general module schema (all six modules — pump, alignment, nozzle, storage, UI, software/electronics — with data/liquid flows), present a small gallery of visual design directions (SVG-first, minimal prose — e.g. standalone-screen vs integrated-screen builds), add a **Design type** column to the variant matrix so every option is compared in one table with price + functionality as the main drivers, and extend the bitbyg-sourced component model with the newly named parts (nozzle vibration motor, capacitive touch-sensor module for DIY volume detection, storage ×6).

**Depends on:** Phase 6 (complete)
**Requirements**: No formal REQ-IDs. The trackable set is CONTEXT.md decisions **D-01…D-18** plus the six Success Criteria **SC-1…SC-6** below (see `06.1-CONTEXT.md`; seed in `06.1-CONTEXT-SEED.md`).

**Scope notes:**

- New full-system schema diagram supersedes the old sticky-note sketch; tube-holding module is gone (custom rack is now part of the alignment module). Spatial layout is free — only connectivity must be right.
- Design directions: creative freedom; the ~2.4–3.2" screen standalone-vs-integrated split is the seed example of two distinct design types.
- Research questions to resolve (researcher): 28BYJ-48 5 V vs 12 V variant (power/torque trade-off, dual-rail implication), whether the 3 V micro vibration motor can take burst overdrive or needs its own rail/PWM drive, capacitive touch-sensor module (bitbyg) channel count vs 6 containers, temp-sensor-based dispense compensation feasibility (note only).
- Consistency pass over `tools/system-architecture-explorer/SPEC.md` + `prototypes/System-Architecture/*.md` — known: 19-vs-20 variant count in SPEC, stale "confirm SPI vs parallel" warning in ARCHITECTURE.md (resolved 2026-07-15), stale pre-bitbyg PSU prices in SPEC power-model table.

**Success Criteria** (what must be TRUE):

  1. The tool opens with a general architecture schema: all six modules, their electronics payload (6× pump steppers, 2× alignment steppers, vibration motor, capacitive sensing, screen+SD+LM75), and data vs liquid flow visually distinguished
  2. A design-direction section shows 2–4 visually distinct build directions as graphics (SVG), each mapping to rows in the matrix
  3. The variant matrix has a Design type column; sorting/filtering still works; price + functionality remain the primary comparison drivers
  4. New components are priced from bitbyg with confidence tags, following the existing COMP/DEFAULTS model
  5. The voltage/power questions are answered (sourced) and reflected in the power-rail model
  6. SPEC.md and the three decision records are internally consistent (variant count, resolved open questions, current prices)

**Plans:** 5/5 plans complete

Plans:

**Wave 1**

- [x] 06.1-01-PLAN.md — Data model: new bitbyg components (vibration motor + IRF520 driver, MPR121, 2× buck converters), SHARED_BOM rebuild resolving alignment-motor-#2, pinsOf() + D-14 guard verification, two-buck power rails in the diagram (D-13/D-14/D-15/D-16, SC-4/SC-5)

**Wave 2** *(blocked on Wave 1 — same file)*

- [x] 06.1-02-PLAN.md — Part 00 module schema: rewritten intro, `#system` section, buildSchema() six-module SVG with payload chips + dual flows + liquid barrier, hover/click/keyboard reveal, D-17 temperature note (D-01…D-05, D-17, SC-1)

**Wave 3** *(blocked on Wave 2 — same file)*

- [x] 06.1-03-PLAN.md — Design directions: directionOf() classifier, `#directions` SVG gallery, Design type matrix column, shared direction filter (gallery + dropdown), break-out matrix width (D-06…D-12, SC-2/SC-3)

**Wave 4** *(blocked on Wave 3; disjoint files, parallel)*

- [x] 06.1-04-PLAN.md — SPEC.md: consistency pass (19→20 variants, recounted component confidence, PSU prices, shared-block total) + new sections for the schema, directions, new components, and the power-rail answer (D-17/D-18, SC-4/SC-5/SC-6)
- [x] 06.1-05-PLAN.md — Decision records + chrome: ARCHITECTURE.md (SPI resolved, motor #2 resolved, rail topology), PUMP-CONTROL-CONCEPTS.md dated preface, SOLUTION-MATRIX.md check, landing card / README / CLAUDE.md copy refresh (D-13/D-15/D-18, SC-6)

### Phase 7: Thesis Showcase Landing Page

**Goal:** Remodel `index.html` from a directory of tools into a showcase of the thesis itself. A visitor who has never heard of the project should land, immediately see what "modular automated liquid dispensing for point-of-care use" *is* — through an introduction, media (a video is coming), and motion that starts on load — and only then find the tools, presented as one section of a larger story rather than the whole page.

**Depends on:** Phase 6.1 (complete). Builds on the 2026-07-13 homepage redesign quick task (fixed glass nav, hero meta chips, numbered sections, icon-tile cards with mouse spotlight, IntersectionObserver reveals, full EN/IT i18n) — that pass restyled the directory; this phase changes what the page *is about*.

**Requirements**: No formal phase REQ-IDs. The trackable set is CONTEXT.md decisions **D-01…D-20** (see `07-CONTEXT.md`), plus the existing i18n contract **LANG-01…LANG-05** from `REQUIREMENTS.md`, which D-18 forbids regressing.

**Scope notes:**

- The tool grid stays, demoted to one section. Every existing tool must remain reachable and the EN/IT i18n coverage must not regress.
- Source material already in the repo to draw the introduction and media from: `prototypes/index.html` (proto journey), `tools/system-architecture-explorer/` (six-module schema), `decks/lab-meeting-2026-06/assets/` (renders, photos, app screenshots, an alignment video), `.planning/PROJECT.md`.
- A hero video is planned but the asset does not exist yet — the phase must define the slot and a graceful no-asset fallback, not block on the file.

**Open questions for `/gsd:discuss-phase 7`:**

  1. **Interactivity approach.** The user asked about "tools online" for richer interaction (Spline, Rive, Lottie, etc.). Constraint D-01 and the offline/USB + GitHub Pages requirement mean no CDN-only dependency: any such runtime would have to be vendored locally (the KaTeX precedent) and would be the first new shared front-end dependency on the site. Decide explicitly: vendored runtime vs. hand-built CSS/SVG/Canvas motion in the existing idiom. Default if unresolved: hand-built, per the user's own fallback ("something modern and quite dynamic, but still with a professional feel").
  2. Page structure — which sections, in what order, and what the hero actually shows before the video asset lands.
  3. Video: hosting (repo-committed vs external), size budget for the USB/Pages constraint, autoplay/muted/poster behaviour.
  4. Whether the landing page becomes the thesis' front door for a QR-code/print audience (affects first-paint weight).

**Success Criteria** (what must be TRUE):

1. A visitor who has never heard of the project lands and meets motive, object, and evidence — problem, device, proof, journey — before reaching any calculator (D-13).
2. The hero animates on load with a hand-built, geometrically real proto-02 rotor (4 rollers, R≈19.7 mm) and a travelling liquid packet; no animation runtime, no gsap, no CDN (D-01, D-05, D-06).
3. The pump-head video autoplays muted on scroll into view and pauses on exit; under `prefers-reduced-motion` it stays a static poster with a play button (D-11).
4. The five resource sections are three — Tools (5 cards), Roadmap, Presentations — with exactly 3 numbered eyebrows, all below the fold (D-14, D-17).
5. All 8 tool destinations remain reachable; EN/IT key sets are identical with no orphans; no horizontal scroll at 1280px or 375px (LANG-01…LANG-05).
6. `assets/style.css` is byte-identical; the `.bg-blobs` suppression is landing-page-only and every other page keeps its blobs (D-07).
7. Geist-Bold is vendored locally, subsetted, and ships with its SIL OFL 1.1 license; the committed video is 1–3 MB with no audio and the 9.9 MB master stays untracked (D-10, D-20).

**Plans:** 3/4 plans executed
Plans:
**Wave 1**

- [x] 07-01-PLAN.md — Prepare assets: re-encode the pump-head clip, extract its poster, vendor + subset Geist with its OFL license

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 07-02-PLAN.md — Rebuild the hero: suppress blobs, wire the Geist headline, hand-build the animated proto-02 rotor

**Wave 3** *(blocked on Wave 2 completion)*

- [x] 07-03-PLAN.md — Insert the narrative: problem, device (six-module graphic), proof (portrait video), journey

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 07-04-PLAN.md — Collapse five resource sections to three, apply Sirio's copy edits, prove the invariants
