---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
stopped_at: Completed 06.1-03-PLAN.md
last_updated: "2026-07-16T12:23:39.620Z"
last_activity: 2026-07-16
progress:
  total_phases: 7
  completed_phases: 3
  total_plans: 24
  completed_plans: 19
  percent: 43
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-30)

**Core value:** Self-contained interactive design tools that support hardware decisions for Proto 1, usable offline from a USB drive and cited in the thesis with QR codes
**Current focus:** Phase 06.1 — architecture-refinement-full-system-module-schema-design-dir

## Current Position

Phase: 06.1 (architecture-refinement-full-system-module-schema-design-dir) — EXECUTING
Plan: 4 of 5
Status: Ready to execute
Last activity: 2026-07-16

Progress: [█████████░] 89%

## Performance Metrics

**Velocity:**

- Total plans completed: 11
- Average duration: 20m
- Total execution time: 0.67 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-motor-microstepping-panel | 2 | 40m | 20m |
| 01 | 3 | - | - |
| 6 | 6 | - | - |

**Recent Trend:**

- Last 5 plans: 01-01 (15m), 01-02 (25m)
- Trend: —

*Updated after each plan completion*
| Phase 06-system-architecture-explorer-promote-the-electronics-archite P01 | 15m | 2 tasks | 2 files |
| Phase 06-system-architecture-explorer-promote-the-electronics-archite P03 | 25min | 2 tasks | 5 files |
| Phase 06-system-architecture-explorer-promote-the-electronics-archite P04 | 8min | 2 tasks | 4 files |
| Phase 06-system-architecture-explorer-promote-the-electronics-archite P05 | 25min | 3 tasks | 1 files |
| Phase 06-system-architecture-explorer-promote-the-electronics-archite P06 | 12min | 2 tasks | 1 files |
| Phase 06 P07 | 15min | 1 tasks | 1 files |
| Phase 06.1 P01 | 20min | 3 tasks | 1 files |
| Phase 06.1 P02 | 35min | 3 tasks | 1 files |
| Phase 06.1 P03 | 30min | 3 tasks | 1 files |

## Accumulated Context

### Roadmap Evolution

- Phase 5 added (2026-06-24): HTML Presentation Decks — reveal-style slide system + creative dated presentations index, first deck = 15-min lab meeting (GSD, two design tools, proto-01, proto-02, automated test-campaign app). Milestone v1.0 reopened from `completed` to accommodate.
- Phase 6 added (2026-07-12): System Architecture Explorer — the live cost/complexity matrix built ad-hoc in `prototypes/System-Architecture/index.html` has outgrown a design-record page (editable BOM, DKK↔EUR converter, sortable/filterable 17-variant matrix, expandable per-variant BOM math). Promote it to a first-class tool at `tools/system-architecture-explorer/` (index.html + SPEC.md + nav + landing card + README row); **keep the three decision records** (ARCHITECTURE.md, PUMP-CONTROL-CONCEPTS.md, SOLUTION-MATRIX.md) in `prototypes/System-Architecture/` as design documentation, matching the `multi-liquid-architecture/` precedent. Partially retires the deferred **"BOM / component selector"** v2 backlog item.
- Phase 06.1 inserted after Phase 6: Architecture refinement: full-system module schema, design-direction gallery, design-type matrix column (URGENT)

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Phase 1: Hard-code Wantai 42BYGHW811 / DRV8825 motor params; motor panel contained entirely in tools/rotor-solver/index.html
- Language Switcher (shipped pre-GSD): data-i18n attribute toggle, localStorage key "lang", per-page inline dictionaries, no new CSS variables
- 01-01: msSel option values match MS_FACTOR/TORQUE_FRAC keys exactly to prevent silent undefined
- 01-01: MOTOR/MS_FACTOR/TORQUE_FRAC at script scope (not inside upd()) to avoid per-event reallocation
- 01-02: torqueRim = MOTOR.holdingTorque * Tf / R * 10 (×10 converts g·cm/mm to g-force at rim)
- 01-02: maxStepRate is microstepping-independent (V / 2×L×I inductive ceiling); computed once in upd()
- 01-02: motorCols gated on feasible flag — infeasible rows always show — (T-02-02 mitigation)
- Post-Phase 1: speedDerating = min(1, maxStepRate/SP) added to torqueRim — voltage now affects FoS via inductive ceiling
- [Phase 06-01]: Renamed ported <table id=matrix> to id=matrixTable, freeing id=matrix for the D-04 Part-02 container anchor
- [Phase 06-01]: Nav-bar back-link uses 'All tools' (thesis-timeline precedent) rather than 'Resources' (older i18n-era tools)
- [Phase ?]: 06-03: Anchor mapping for repointed links -- #matrix for live cost/variant-table references, #diagram for 'see the diagram' promises, #theory for reasoning pointers
- [Phase ?]: 06-03: Trimmed ARCHITECTURE.md's driver-vs-MCU section, U5-framing bullets, and PUMP-CONTROL-CONCEPTS.md's mental-model section to pointers into the tool's #theory anchor (D-05), keeping fixed components / open questions / the different-Arduino-per-pump verdict untouched
- [Phase ?]: 06-04: Landing card and README copy trimmed to only currently-shipped features (BOM editor, DKK-EUR converter, matrix) -- pin-budget/diagram language deferred until 06-05/06-06 ship
- [Phase ?]: 06-04: CLAUDE.md documents tools/system-architecture-explorer/SPEC.md ahead of its 06-07 creation, matching the site-wide tools/<slug>/ folder-shape convention
- [Phase 06-05]: esp32.gpioUsable set to 15 (upper end of RESEARCH's 10-15 range) to produce a mixed pin-budget result set (S1/D2 overrun, T9-fused-*/T51-*/P6-rp-i2c borderline, printer boards fit) rather than all-pass or all-fail
- [Phase 06-05]: Layer-C driver-link pins attached explicitly per-variant (pinsC field) rather than derived generically, since identical components cost different pin counts depending on wiring topology (S1 shared+EN=8 vs D2 per-motor=12 for the same 6x DRV8825)
- [Phase 06-05]: Added two integrated-screen (espscreen/ESP32-2432S024) variants -- one that fits the 9-IO budget (TMC2209) and one that overruns it even at single concurrency (DRV8825) -- for honest D-11 contrast rather than only the flattering case
- [Phase 06-06]: Topology class (fused/satellite/distributed/printer) derived from existing v.bom keys rather than a new VARIANTS field -- ramps/skr=printer, promini=distributed, rp2040/stm32/nano=satellite, else fused
- [Phase 06-06]: Layer-B bus node count is 2 (brain+alignment) + a per-class pump-node count (0/1/6), matching the theory section's own claimed node counts (e.g. 8 nodes on RS-485 for the distributed variant)
- [Phase 06-06]: Diagram auto-selects the first visible (cheapest) variant on load and after filter/sort removes the current selection, rather than an empty prompt -- selection stays click-driven only (D-02), no second control added
- [Phase 06-07]: Adapted rotor-solver's SPEC.md section structure to this tool's shape (price table, brain specs, variant BOMs, comms layers, pin-budget model, power model, diagram, cost assumptions, persistence, open questions, cross-links)
- [Phase 06-07]: Only the ILI9341 screen documented as High-confidence/sourced in SPEC.md's price table; all other ~19 prices remain Low-confidence rough estimates (sourcing deferred, out of Phase 6 scope)
- [Phase 06-07]: Screen SPI-vs-parallel ambiguity documented as an open item with the exact end-of-phase resolution procedure carried over from 06-05
- [Phase 06.1-01]: align28byj role changed to 'alignment motor x2' and its source note records the 12V winding as the researched choice (D-15), rather than adding a second differently-priced key
- [Phase 06.1-01]: buck12/buck5 grouped into SHARED_BOM alongside the vibration motor and 2x 28BYJ-48, per RESEARCH's recommendation
- [Phase ?]: [Phase 06.1-02] moduleBox() <g> grouping split across commits: data-module in Task 2 (structural), tabindex/role/aria-label/listeners in Task 3 (interactive)
- [Phase ?]: [Phase 06.1-02] selectModule() hover-vs-selection: mouseleave restores the last sticky (click/keyboard) pick rather than losing it to a stray hover
- [Phase ?]: [Phase 06.1-02] Schema spatial layout redesigned freely from the sticky-note sketch (D-05 permits this) -- top row of 4 modules, Alignment beneath, Software and Electronics + liquid barrier at the bottom
- [Phase 06.1-03]: directionOf(v) mirrors topoClassOf(v)'s exact ordered-if-chain, checking 'distributed' first so it can never be shadowed by the fused-vs-not-fused branches
- [Phase 06.1-03]: Gallery click-wiring split into renderDirections() (static build) + wireDirectionsInteractivity() (click listeners), mirroring 06.1-02's buildSchema()/wireSchemaInteractivity() split
- [Phase 06.1-03]: C link column left without hide-sm at 640px pending a human browser pass to confirm the 10-column table isn't too tight on mobile

### Pending Todos

- **[general]** Clarify .agent vs .agents folder difference — `.planning/todos/pending/2026-06-24-clarify-agent-vs-agents.md`: The user is confused about the difference between the `.agent` and `.agents` folders and why they were both present. They want to understand the architecture and why deleting one broke the other.

- Prototype tracker established (2026-06-15). Entry point:
  `.planning/notes/2026-06-15-prototype-tracker-architecture.md`. Back-fill
  proto-01 design params in `prototypes/Prototype-1-Pump-Module/proto-01-5ul-4roller/PROTOTYPE.md`.

- **OPEN DECISION (candidate phase):** per-prototype test-plan & pass-criteria
  schema — `.planning/notes/2026-06-15-prototype-test-schema-decision.md`.
  `03. CODING` is blocked on this before emitting test reports.

- **[ui]** Open tool links in new tab from prototype detail view — `prototypes/index.html`: add `target="_blank" rel="noopener"` to Parameters table tool links.

### Blockers/Concerns

- ADR cross-reference cycle between README.md and CLAUDE.md flagged by ingest (INGEST-CONFLICTS.md — informational only; no synthesis correctness impact, can be dismissed)
- All 8 ADR decisions are proposed, not accepted — confirm with /opsx:apply before treating as locked

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| v2 tools | Flow sensor calibration viewer | Backlog (no phase yet) | 2026-05-29 |
| v2 tools | Dispense protocol calculator | Backlog (no phase yet) | 2026-05-29 |
| v2 tools | Tube occlusion efficiency estimator | Backlog (no phase yet) | 2026-05-29 |
| v2 tools | BOM / component selector | Backlog (no phase yet) | 2026-05-29 |

## Quick Tasks Completed

| Date | Task | Files |
|------|------|-------|
| 2026-06-01 | rotor-solver: replace occlusion-efficiency slider with manual arc-compensation (ΔArc_total) input; link to displaced-volume model `#calculator` anchor | `tools/rotor-solver/index.html`, `tools/peristaltic-roller-displaced-volume-model/index.html`, `tools/rotor-solver/SPEC.md` |
| 2026-06-01 | rotor-solver: add live top-down geometry diagram below results table (roller-count selector, all geometric dimensions labelled, ENG/IT) | `tools/rotor-solver/index.html`, `tools/rotor-solver/SPEC.md` |
| 2026-06-03 | rotor-solver: display all mm measurements (table, summary, figure) to 2 decimals; fix µL column headers rendering as "ΜL"/"ML" (CSS uppercase turned μ→Μ) via `.u { text-transform:none }` | `tools/rotor-solver/index.html` |
| 2026-06-17 | proto-02 initialized: PROTOTYPE.md (corrected N_c=2 → R≈19.7, 4-head gap sweep, screw-clamp lock, n=10 experiment plan), HTML journey stub (proto-02 active card + detail view; proto-03/04/05 grayed ghosts), standards-benchmark note, registries updated | `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md`, `prototypes/index.html`, `.planning/notes/2026-06-17-dispensing-accuracy-standards.md`, `prototypes/PROTOTYPES.md`, `prototypes/SPEC.md` |
| 2026-06-25 | lab-meeting deck restructured into 3 sections (Alignment → AI → Pump) with full-bleed divider slides; new AI-as-a-tool slide (Claude Code splash), rewritten GSD slide (spec-driven-development vs GSD), alignment-module slide with embedded auto-playing video; image-first animation system (per-activation `.auto-anim` replay via deck-local MutationObserver); proto-01 render + real photo side-by-side | `decks/lab-meeting-2026-06/index.html`, `decks/lab-meeting-2026-06/SPEC.md`, `decks/lab-meeting-2026-06/assets/alignment_poster.jpg`, `decks/lab-meeting-2026-06/CaludeCode_image.png`, `.planning/notes/2026-06-24-presentation-guidelines.md` |
| 2026-06-25 | lab-meeting deck content revisions (round 2): fixed alignment divider subtitle; wrote full alignment-module description into PROTOTYPE.md; new alignment roadmap slide (queue schematic); new AI workflow-cycle slide (Document-hub loop, Build outside); reworked test-campaign app slide (DoE/randomization/Arduino-automation/weigh + 2 new app images) → 14 slides | `decks/lab-meeting-2026-06/index.html`, `decks/lab-meeting-2026-06/SPEC.md`, `prototypes/Prototype-2-Alignment-Module/PROTOTYPE.md`, `decks/lab-meeting-2026-06/assets/run-campaign.png`, `decks/lab-meeting-2026-06/assets/pump-validator-app.png` |
| 2026-07-13 | homepage redesign (260713-o6s): fixed glass top nav with segmented EN/IT switch; hero meta chips; numbered section headers with hairline rules; icon-tile cards with mouse spotlight + hover hairline; wide horizontal cards for single-item sections; IntersectionObserver scroll reveals; background grid overlay; inline SVG favicon; full EN/IT i18n coverage (all cards/sections now translate, was ~half); `assets/style.css` untouched. Retires backlog item "Redesign and restructure landing page for many tools" | `index.html` |
| 2026-07-13 | prototype journey cards ride the curve (260713-o8z): `alignNodesToPath()` samples the real `.journey-path` (`getPointAtLength`, 240 pts) at load/resize and sets each `.proto-node`'s `left` so the card centre lands on the SVG S-curve at its own vertical middle — was a straight `left:50%` column. Clamped against stage overflow; clears inline `left` on mobile (≤640px static stack). Verified ≤1px centre-to-curve error at 929/1440px, no horizontal scroll | `prototypes/index.html`, `prototypes/SPEC.md` |
| 2026-07-13 | proto-02 page restructure (20260713-proto-02-page-restructure): TOC card with auto-expanding links; collapsible version panels (design / v2.1 / v2.2, current open); head schematic rebuilt as hatched cross-section with CL + mirrored ghost + A–A locator inset; print-model intro (educated-guess framing) + annotated visual equation; figures repositioned + capped 540px; 0.085 mm play marked estimate; creep/DFM paragraph simplified (plastic = expedient, metal final) | `prototypes/index.html`, `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md` |

## Session Continuity

Last session: 2026-07-16T12:23:39.610Z
Stopped at: Completed 06.1-03-PLAN.md
Resume file: None
