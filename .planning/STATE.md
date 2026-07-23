---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: executing
stopped_at: Phase 9 context gathered
last_updated: "2026-07-23T13:19:24.968Z"
last_activity: 2026-07-23 -- Phase 09 planning complete
progress:
  total_phases: 10
  completed_phases: 6
  total_plans: 37
  completed_plans: 29
  percent: 60
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-30)

**Core value:** Self-contained interactive design tools that support hardware decisions for Proto 1, usable offline from a USB drive and cited in the thesis with QR codes
**Current focus:** Phase 08 — dispense-choreography-throughput-simulator-tool-interactive-

## Current Position

Phase: 08
Plan: Not started
Status: Ready to execute
Last activity: 2026-07-23 -- Phase 09 planning complete

Progress: [█████████░] 93%

## Performance Metrics

**Velocity:**

- Total plans completed: 20
- Average duration: 20m
- Total execution time: 0.67 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-motor-microstepping-panel | 2 | 40m | 20m |
| 01 | 3 | - | - |
| 6 | 6 | - | - |
| 06.1 | 5 | - | - |

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
| Phase 06.1 P04 | 10min | 2 tasks | 1 files |
| Phase 06.1 P05 | 25min | 3 tasks | 6 files |
| Phase 07 P01 | 5min | 2 tasks | 4 files |
| Phase 07 P02 | 50min | 2 tasks | 1 files |
| Phase 07 P03 | 13min | 2 tasks | 1 files |
| Phase 07 P04 | 15min | 3 tasks | 3 files |
| Phase 08-dispense-choreography-throughput-simulator P01 | 12min | 2 tasks | 1 files |
| Phase 08 P02 | 13min | 3 tasks | 1 files |
| Phase 08 P03 | 6min | 1 tasks | 1 files |
| Phase 08 P04 | 7min | 2 tasks | 4 files |

## Accumulated Context

### Roadmap Evolution

- Phase 5 added (2026-06-24): HTML Presentation Decks — reveal-style slide system + creative dated presentations index, first deck = 15-min lab meeting (GSD, two design tools, proto-01, proto-02, automated test-campaign app). Milestone v1.0 reopened from `completed` to accommodate.
- Phase 6 added (2026-07-12): System Architecture Explorer — the live cost/complexity matrix built ad-hoc in `prototypes/System-Architecture/index.html` has outgrown a design-record page (editable BOM, DKK↔EUR converter, sortable/filterable 17-variant matrix, expandable per-variant BOM math). Promote it to a first-class tool at `tools/system-architecture-explorer/` (index.html + SPEC.md + nav + landing card + README row); **keep the three decision records** (ARCHITECTURE.md, PUMP-CONTROL-CONCEPTS.md, SOLUTION-MATRIX.md) in `prototypes/System-Architecture/` as design documentation, matching the `multi-liquid-architecture/` precedent. Partially retires the deferred **"BOM / component selector"** v2 backlog item.
- Phase 06.1 inserted after Phase 6: Architecture refinement: full-system module schema, design-direction gallery, design-type matrix column (URGENT)
- Phase 7 added (2026-07-16): Thesis Showcase Landing Page — remodel `index.html` from a tool directory into a showcase of the thesis itself (project introduction, media/video slot, motion on load), with the tool grid demoted to one section. Distinct from the 2026-07-13 homepage-redesign quick task, which restyled the directory without changing what the page is about. Key unresolved question for discuss-phase: vendored animation runtime (Rive/Lottie/Spline, KaTeX-style local fallback) vs hand-built CSS/SVG motion — the offline/USB + no-CDN constraint makes this a real decision, not a preference.
- Phase 8 added (2026-07-20): Dispense Choreography & Throughput Simulator tool — new interactive tool at `tools/dispense-throughput-simulator/`. User sets number of pumps allowed to act simultaneously, assigns liquids (with volumes) to nozzles, and sets pump flow params (rollers, µL/stroke, RPM) + sample-stage move time; the tool schedules a linear nozzle/sample indexing line (6 nozzles in a line, 8 samples/rack × 4 racks moving beneath) and outputs total run time, per-station timeline, and the bottleneck station. Purpose: decide **U5 (concurrency)** empirically instead of by intuition — the open question the System Architecture Explorer's cost matrix cannot answer alone. Benchmark: 4 rollers × 5 µL/stroke = 20 µL/rev; 180 RPM → 60 µL/s; liquids 600/200/175/25 µL (serial 16.67 s/sample; pipelined ceiling = 10 s at the 600 µL bottleneck).
- Phase 9 added (2026-07-23): Pump Testing tool — new page at `tools/pump-testing/` with two stacked layers. **Top (righteous protocol):** how a market-grade dispensing-accuracy qualification of the peristaltic pump *should* be run — grounded in DS/EN ISO 23783-2:2023 single-channel gravimetric method (Annex D), with the balance-readability→compliant-volume lookup (Table 3), environmental limits (Table D.1), evaporation-blank workflow, preparation/priming rules, mass→volume Z-factor conversion (Annex A), replicate convention (n=10), and reporting/uncertainty rules — plus alternate methods where they apply and the "slope method" for sub-balance-resolution volumes. **Bottom (actual prototype protocol):** the method actually used on proto-02, with the logical justification for each deviation from the restrictive ISO requirements given prototype-stage hardware limits. **User will supply the actual prototype protocol before/during discuss-phase.** Discuss-phase must reconsider scope from first principles (do not assume the seed's planner+calculator framing is correct) and resolve: pump-specific vs general engine, planner-only vs planner+results-calculator, gravimetric-only vs photometric branch, interactive vs fixed Z-factor, and output formats. Source: DTU-licensed ISO PDF at `prototypes/DS_EN ISO 23783-2_2023.pdf`; proto-02 data at `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PROTOTYPE.md`.

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
- [Phase 06.1-04]: Recounted 'components not stocked by bitbyg' to Seven (was Six) and added the previously-omitted espscreen32 entry -- recounted from shipped DEFAULTS rather than trusting the plan's phrasing
- [Phase 06.1-04]: Fixed pin-budget pseudocode block missing the +1 vibration-PWM term and the Live-system-diagram/post-power-table prose still describing the old dual-rail topology -- both were drift bugs directly in scope of the D-18 consistency pass
- [Phase 06.1-05]: SOLUTION-MATRIX.md's Component unit prices intro no longer claims to drive the tool's cost math -- the tool now maintains its own richer 26-component model
- [Phase 06.1-05]: SOLUTION-MATRIX.md's own Alignment motor #2 (TBD) price-table row resolved to 28BYJ-48 12V + ULN2003 (resolved D-13), historical EUR estimate left untouched
- [Phase 06.1-05]: Landing card, README, and CLAUDE.md avoid stating a hardcoded variant count anywhere, not just README which required it -- same D-18 drift lesson applied preemptively
- [Phase 07-01]: CRF 26 at 540x960 hit the 1-3 MB target on first pass (1,746,708 bytes); no re-run needed
- [Phase 07-01]: Poster extracted at -ss 8 from the same source clip (not head-result.jpeg) to guarantee no visual jump on playback
- [Phase 07-01]: Generous Geist-Bold glyph subset (Basic Latin + Latin-1 Supplement + em-dash + curly quotes) used instead of exact-glyph subset, since D-19 copy edits have not landed yet
- [Phase 07-02]: Sync fix -- liquid-arc segments moved into the SAME rotating .rotor-spin-outer/.rotor-spin-inner groups as the roller ring so the identical CSS animation drives both, phase-locking the liquid to roller position rather than merely period-matching it
- [Phase 07-02]: Hero motif reworked post-checkpoint (not approved as originally built) into a full fluidic path: 50ml source tube -> inlet -> pump (top tube-wrap) -> outlet -> nozzle -> 1.5ml collection tube, per Sirio's request; self-verified per his explicit authorization rather than a second visual checkpoint
- [Phase 07]: [Phase 07-03]: Rejected RESEARCH's recommendation for a second IntersectionObserver -- extended the existing one with a target-identity branch for video play/pause (D-11)
- [Phase 07]: [Phase 07-03]: Six module-graphic labels kept identical in LANG.en/LANG.it, matching the System Architecture Explorer's own untranslated technical vocabulary
- [Phase 07]: [Phase 07-03]: Checkpoint approved as drafted by Sirio -- zero copy edits to any of the 14 narrative/module LANG key pairs
- [Phase 07]: 07-04: Re-verified Tasks 1-3 (resource-section collapse, invariant checker, CLAUDE.md doc pass) as already committed from a prior session rather than redoing them
- [Phase 07]: 07-04: Sirio approved the finished landing page and explicitly confirmed the vendored GSAP exception (D-01/D-03 amendment) is justified and should be kept
- [Phase 07]: 07-04: README.md's Tech section 'no external dependencies' claim corrected post-approval -- now notes the locally-vendored GSAP core, no other change
- [Phase ?]: 08-01: Adopted totalCycles = M + N - 1 (standard pipeline math) over the literal M + 2(N-1) reading of D-07's prose
- [Phase ?]: 08-01: Mode toggle (a1/a2) wired but not applied as a numeric lockstep penalty at fixed K -- both modes are numerically identical under global flow params; Plan 08-02 owns the teaching copy
- [Phase ?]: 08-01: LPT grouping (sort descending, chunk into groups of <=K, sum group maxima) resolves 1<K<N concurrency partitioning
- [Phase 08-02]: 08-02: min-width Npx CSS converted to em units so the whole-file negative grep (added for the Gantt) doesn't false-positive on unrelated 08-01 slider/label affordances
- [Phase 08-02]: 08-02: stationOffsetsForCycle() mirrors groupDispenseTime()'s LPT sort/chunk rule to expose per-station Gantt-bar offsets without touching the engine
- [Phase 08-02]: 08-02: Tasks 1-3 committed as one commit (68f4368) since metrics/Gantt/rack-anim CSS and recompute() wiring were implemented as one coherent, tightly-coupled edit pass
- [Phase 08-03]: SPEC.md documents the resolved-assumption footnotes (32+(N-1) cycle reading, 3x rack-change convention, flat-additive rack changes, global flow params, A1/A2 fixed-K numerical equality) as permanent record — No new modelling decisions made -- purely documentation of prior-plan (08-01/08-02) choices, matching CLAUDE.md's tool-spec standard
- [Phase ?]: Landing-page card icon set to timer glyph (U+23F1), placed as terminal Tools-grid card with --rd: 0.5s; CLAUDE.md's system-architecture-explorer tree entry changed from a terminal connector to a mid-list one to append dispense-throughput-simulator as the new last block

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
| 2026-07-20 | architecture-explorer Phase 6.1 adjustments (260720-a4x): module-schema SVG font enlarged (titles 12.5→15, chips 9.5→12 with taller pills, barrier/legend 10→12) — verified no overflow; component-prices `<details>` boxed (glass card + hover cue) so it clearly reads as expandable; page-flow cleanup — divider pills renumbered to a consistent Part 1–4 spine and the per-variant diagram demoted to a muted "Selected-variant view" companion under the matrix, with more separation between top-level parts. Style tokens untouched | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md` |
| 2026-07-20 | architecture-explorer expanded-row breakdown tables (260720-pbc): `pinsOf(v)` refactored to expose a per-term `terms` breakdown (single source of truth with the matrix column). Every expanded row now shows two mini-tables — **Pin budget** (Screen/Sensors/Bus/Drivers/Microstep/Vibration → used vs usable → OVERRUN by N / N free), so an overrun row shows its own cause, and **Peripheral controllers** (UART/I²C/SPI used·have·status), replacing the cramped inline text with a row-by-row table. Scoped `.pin-mini` CSS; verified numbers match pinsOf/periphOf, no new overflow (640px+ clean) | `tools/system-architecture-explorer/index.html` |
| 2026-07-20 | architecture-explorer peripheral-instance ceiling check (260720-pcp): new **`periphOf(v)`** computes hardware-controller demand (UART/I²C/SPI vs ESP32's 3/2/2) — the "TX for two things" limit a pin count can't see. Matrix pin cell gains a ⚠ UART 3/3 flag; every expanded row gains a **Peripheral controllers** line (demand + fits/tight/conflict + fix). Flags exactly **T9-fused-485** (2 TMC UART lines + RS-485 = 3/3, no console); T9-fused-i2c stays clean (2/3). Recorded that the 6×ENABLE fan-out is a wanted battery power-gating feature, and that TMC2209 gives the same per-motor current control over UART (IRUN/IHOLD/TOFF) without the 6-GPIO cost. SPEC Open Q#6 resolved | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md`, `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`, `.planning/quick/260720-pcp-peripheral-instance-check/` |
| 2026-07-20 | architecture-explorer deep pin-budget analysis (260720-pbd): new permanent **PIN-BUDGET-ANALYSIS.md** cross-check — per-hardware signal map, two ceilings (GPIO count + peripheral instances: 3 UART/2 I²C/2 SPI), every overrun variant worked pin-by-pin, digital/analog reality, the TMC2209 "TX for two things" UART-contention on T9-fused-485. New **Part-3 "The Pin Budget" expandable** in the tool: colored formula + CSS pin-ledger visual (segmented bar, dashed usable-GPIO ceiling, hatched overflow) worked on S1-i2c, per-hardware table, GPIO-matrix + peripheral-ceiling explanation. SPEC Open Question #6 logs the uncomputed peripheral ceiling. Verified in browser, no horizontal overflow, shared tokens untouched | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md`, `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`, `.planning/quick/260720-pbd-pin-budget-deep-analysis/` |
| 2026-07-20 | architecture-explorer Microstepping pin control + research round (260720-msp): new **Pin budget → Microstepping** control (`msMode`, default `fixed`); `dynamic` adds +3 (shared M0/M1/M2 bus) only to brain-wired dumb drivers (S1-\*/D2-\*/ESPINT-dumb), smart/offloaded unaffected; OVERRUN readout now shows "by N" deficit. Research round verified all 8 pin figures vs primary sources — key correction: the model already assumed *fixed* microstepping, so the S1/D2 overrun is driven by 6-driver ENABLE/STEP-DIR fan-out, not microstepping. Default `fixed` reproduces every prior number | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md`, `.planning/quick/260720-msp-microstepping-pin-control/` |
| 2026-07-20 | architecture-explorer component pinout audit (260720-pva): full **component-by-component datasheet pinout audit** — the search Sirio assumed was already done. Verified every budget-contributing part vs its datasheet/module ref (ESP32 DOIT 30-pin, ILI9341+XPT2046, LM75, MPR121, MAX485, MCP2515, DRV8825, TMC2209, TMC5160, IRF520). Result: **no figure wrong; several conservative** (screen 8→could be 6; CAN 4→2 on shared SPI; DOIT 30-pin ≈16 safe outputs justifies the 15 ceiling). Recorded as **§7 + verification-log** in PIN-BUDGET-ANALYSIS.md (already indexed in CLAUDE.md; description refined). Confidence-pill re-rating and OVERRUN-row dimming both documented as separate edits **pending sign-off** — no `index.html` change | `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`, `CLAUDE.md`, `.planning/quick/260720-pva-component-pinout-audit/` |
| 2026-07-20 | Arduino Nano as a design option + missing-variant sweep (260720-l0e): added **2 variants** (set 20→22) — `N2-nano-i2c` (11/15 pins, 4 free) and `N2-nano-485` (14/15, 1 free): one Arduino Nano pump-node drives all 6 DRV8825 at **2-concurrent** (its 2 hardware timers cap it at 2 trains = validated U5=2), offloading the fan-out off the ESP32 so DRV8825 finally fits the pin budget. The **cheapest fully-all-bitbyg build that fits**, reusing in-house parts (1 Nano + DRV8825s). Sweep verdict recorded (Nano barred from brain seat; Nano-per-pump already = Pro-Mini `P6-dist-*`; A4988/ESP32-S3 are part-swaps not topologies). Synced tool `VARIANTS` + `directionOf`/gallery counts + PIN-BUDGET-ANALYSIS.md (fit list, worked table, "Where the Nano fits" role sweep) + SPEC.md (5 count/list spots). Validated by node: 22 parse, both fit, satellite class | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`, `tools/system-architecture-explorer/SPEC.md`, `.planning/quick/260720-l0e-add-arduino-nano-as-a-first-class-design/` |
| 2026-07-20 | confidence re-rate + unfeasible-row de-emphasis + bibliography (260720-pvc): `pinConfidenceOf` re-rated on the §7 datasheet audit — Layer-B pins + `esp32.gpioConf` Medium→**High**, Layer-C High except TMC2209-on-brain (stays Medium, single-wire UART open Q); most rows now read High, fused-TMC rows Medium. OVERRUN rows **dimmed (0.42) + sunk below feasible** (feasibility = primary sort key; full strength on hover/expand). Clarified the ceiling is **per-brain** (`brain.gpioUsable` 15/9/3, never global; nodes never enter it). Added a **thesis-ready IEEE bibliography** (14 entries, datasheets w/ rev + live links + accessed date) to PIN-BUDGET-ANALYSIS.md; SPEC confidence paragraph updated. Verified in browser: 14 feasible top / 8 dimmed bottom, confidence pills correct | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md`, `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`, `.planning/quick/260720-pvc-confidence-rerate-dim-rows/` |
| 2026-07-20 | per-MCU audited GPIO thresholds + integrated-screen fix (260720-pmt): applied the **audited free-GPIO count per specific brain** — bare ESP32 (DOIT 30-pin) **15→16** (safe output-capable set), integrated 2.4″ (ESP32-2432S024) **9→3** (**corrected error**: only 21/22/35 broken out, 35 input-only, 21 backlight), 3.2″ stays 3. Consequence: **ESPINT-fused-i2c now correctly OVERRUNs** — a 3-free-pin integrated board can't fuse pump control, only a pure I²C brain (ESPINT32-brain-i2c fits at 3). Confirms the integrated-screen accounting (Screen(A)=0, ceiling = post-screen free count). Synced §1/§2/§4/§7 + ceiling table + fits-list + bibliography (CYD source) in PIN-BUDGET-ANALYSIS.md and 3 spots in SPEC.md. Verified: 13 feasible / 9 infeasible, no bare-ESP32 flips, no overflow | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md`, `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`, `.planning/quick/260720-pmt-per-mcu-threshold-integrated-screen/` |
| 2026-07-21 | architecture-explorer Part 5 decision section + shared-clock variants + SD/homing/expander model (interactive session, no slug): added a thesis-ready **Part 5 "Architecture Decision & Recommendation"** synthesis (feasibility→cost→run-time, tables, 11-ref bibliography); added `SD_PINS=1`, 2× homing micro switch + MCP23017 to the cost model; added shared-clock variants `SC6-rp-i2c` / `SC6-exp-i2c` (`absorbsAlign` drops the alignment Nano via one `skipShared()` rule); reconciled Part 3's price-fragile "smart is cheapest" claim and removed GSD `U`-number abbreviations from user-facing prose. Whole-page consistency fixes (15→16 ceilings, 9→3 integrated) | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md`, `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md` |
| 2026-07-22 | architecture-explorer ESP32-S3 single-MCU variant + two-build recommendation (20260722-s3-single-mcu-variant): added `esp32s3` brain (bitbyg ESP32-S3-Nano, €19.93, 21 usable GPIO, 8 MB octal PSRAM) + `brainKeyOf()` so `pinsOf()`/diagram/BOM budget S3 rows against 21 not 16; new variant **`SC6-s3exp-i2c`** (fused single-MCU, ENABLE on direct GPIO, alignment on MCP23017; 24→25 variants); Part 5 rewritten to present **two builds** — final design `SC6-s3exp-i2c` (€248.30) and prototype (DOIT ESP32 + owned Nanos). Consistency pass: Open Q#3 (no bare S3) → RESOLVED; brain table 15→16 + S3 row; BOM/component/direction counts (console 10, total 25); PIN-BUDGET usable-GPIO line + SC6 worked table + second-ceiling note. Verified by node engine (25 variants, S3 20/21, costs match) + browser render | `tools/system-architecture-explorer/index.html`, `tools/system-architecture-explorer/SPEC.md`, `tools/system-architecture-explorer/PIN-BUDGET-ANALYSIS.md`, `.planning/quick/20260722-s3-single-mcu-variant/` |

## Session Continuity

Last session: 2026-07-23T12:45:39.072Z
Stopped at: Phase 9 context gathered
Resume file: 
.planning/phases/09-pump-testing/09-CONTEXT.md
