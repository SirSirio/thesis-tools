---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: verifying
last_updated: "2026-06-24T20:39:01.101Z"
last_activity: 2026-06-24
progress:
  total_phases: 5
  completed_phases: 2
  total_plans: 13
  completed_plans: 10
  percent: 40
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-30)

**Core value:** Self-contained interactive design tools that support hardware decisions for Proto 1, usable offline from a USB drive and cited in the thesis with QR codes
**Current focus:** Phase 05 — html-presentation-decks

## Current Position

Phase: 05 — COMPLETE
Plan: 4 of 4
Status: Phase complete — ready for verification
Last activity: 2026-06-25 - Quick task: lab-meeting deck content revisions (round 2)

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**

- Total plans completed: 5
- Average duration: 20m
- Total execution time: 0.67 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-motor-microstepping-panel | 2 | 40m | 20m |
| 01 | 3 | - | - |

**Recent Trend:**

- Last 5 plans: 01-01 (15m), 01-02 (25m)
- Trend: —

*Updated after each plan completion*

## Accumulated Context

### Roadmap Evolution

- Phase 5 added (2026-06-24): HTML Presentation Decks — reveal-style slide system + creative dated presentations index, first deck = 15-min lab meeting (GSD, two design tools, proto-01, proto-02, automated test-campaign app). Milestone v1.0 reopened from `completed` to accommodate.

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

### Pending Todos

- **[general]** Clarify .agent vs .agents folder difference — `.planning/todos/pending/2026-06-24-clarify-agent-vs-agents.md`: The user is confused about the difference between the `.agent` and `.agents` folders and why they were both present. They want to understand the architecture and why deleting one broke the other.

- Prototype tracker established (2026-06-15). Entry point:
  `.planning/notes/2026-06-15-prototype-tracker-architecture.md`. Back-fill
  proto-01 design params in `prototypes/Prototype-1-Pump-Module/proto-01-5ul-4roller/PROTOTYPE.md`.

- **OPEN DECISION (candidate phase):** per-prototype test-plan & pass-criteria
  schema — `.planning/notes/2026-06-15-prototype-test-schema-decision.md`.
  `03. CODING` is blocked on this before emitting test reports.

- **[ui]** Open tool links in new tab from prototype detail view — `prototypes/index.html`: add `target="_blank" rel="noopener"` to Parameters table tool links.

- **[ui]** Redesign and restructure landing page for many tools — `index.html`: flat card grid needs rethinking now that 4+ tools + prototype space exist.

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

## Session Continuity

Last session: 2026-06-24T17:27:19.311Z
Stopped at: Phase 5 context gathered
Resume file: .planning/phases/05-html-presentation-decks-build-a-reveal-style-slide-system-on/05-CONTEXT.md
