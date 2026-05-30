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
**Requirements**: TBD in discuss-phase
**Success Criteria** (what must be TRUE):

  1. A new tool page at `tools/gsd-workflow/index.html` exists and is linked from the landing page
  2. The page displays a visual diagram of the GSD workflow showing the core loop and optional steps
  3. The tool follows the same dark glassmorphic theme and nav-bar pattern as existing tools
  4. No new shared files — all logic and styles are inline

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Motor & Microstepping Panel | 3/3 | Complete    | 2026-05-30 |
| 2. GSD Workflow Visualizer | 0/? | Discussing | — |
