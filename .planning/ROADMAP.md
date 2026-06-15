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
**Depends on**: Prototype tracker handover (`.planning/notes/2026-06-15-prototype-tracker-architecture.md`, `2026-06-15-prototype-test-schema-decision.md`), `prototypes/PROTOTYPES.md`, `prototypes/proto-01-5ul-4roller/PROTOTYPE.md`, sibling `03. CODING` report (`manual-dispense-check/proto-01-5ul-4roller/REPORT.md`)
**Requirements**: See `04-SPEC.md` (6 requirements locked)
**Success Criteria**: See `04-SPEC.md` acceptance criteria

**Plans**: 2 plans
**Wave 1**

- [x] 04-01-PLAN.md — Main page: SVG winding path, animated prototype journey, swap-to-detail interaction, proto-01 all four sections with real data

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 04-02-PLAN.md — Integration: SPEC.md, landing page card, README row, CLAUDE.md update

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Motor & Microstepping Panel | 3/3 | Complete    | 2026-05-30 |
| 2. GSD Workflow Visualizer | 2/2 | Complete | 2026-05-30 |
| 3. Peristaltic Occlusion & Displaced-Volume Model | 1/1 | Complete | 2026-05-31 |
| 4. Prototype Design Space | 2/2 | Complete   | 2026-06-15 |
