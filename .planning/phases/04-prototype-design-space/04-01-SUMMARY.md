---
phase: 04-prototype-design-space
plan: 01
subsystem: ui
tags: [html, css, svg, intersection-observer, glassmorphism]

requires:
  - phase: 03-peristaltic-occlusion-model
    provides: design-tool pages linked from proto-01 parameters
provides:
  - prototypes/index.html — animated prototype journey page
  - proto-01 detail content (Purpose, Parameters, Results, Design reasoning)
affects: [04-02-integration]

tech-stack:
  added: []
  patterns:
    - "SVG pathLength=1 + stroke-dasharray transition for self-drawing path"
    - "IntersectionObserver gated by prefers-reduced-motion; default CSS renders final state"
    - "hidden-attribute view swap (journey <-> detail) — no page reload"

key-files:
  created:
    - prototypes/index.html
  modified: []

key-decisions:
  - "Executed inline (no subagent) per low-overhead preference for small static-HTML phase"
  - "Stayed on master branch; phases 3-4 planning already committed there, solo project"
  - "Tube ID and solver-predicted µL/stroke left as TBD — not captured in PROTOTYPE.md handover"

patterns-established:
  - "Prototype page: nav + bg-blobs reuse, all tool styles inline, only assets/style.css shared"

requirements-completed: ["See 04-SPEC.md (journey view, detail view, results viz, motion/mobile a11y)"]

duration: 8min
completed: 2026-06-15
---

# Phase 04 Plan 01: Prototype Design Space — Main Page Summary

**Shipped `prototypes/index.html`: an animated journey page where a self-drawing SVG path leads to the proto-01 node card, which expands into a full four-section detail view authored from real calibration data.**

## Accomplishments

- **Task 1 — Scaffold:** boilerplate, `../assets/style.css` link, bg-blobs, sticky `.tool-nav` (← All tools → `../index.html`), two-view skeleton (`#journey-view` visible, `#detail-view` hidden).
- **Task 2 — Journey stage:** winding SVG S-path (`pathLength="1"`) behind a `.nodes-layer`; proto-01 summary card with tag, title, purpose, KPI pills (−32 %, CV 4.5 %), Explore CTA.
- **Task 3 — JS:** `showDetail`/`showJourney` view swap via `hidden`; IntersectionObserver adds `.is-visible` to draw path + pop node, gated on `prefers-reduced-motion`.
- **Task 4 — Detail content:** proto-01 Purpose, Parameters table (two working tool links), Results (3 hero stat-cards + CSS bar chart 1000/678/600 µL + gravimetric vs flow method table), Design reasoning. Mobile ≤640px collapses SVG and stacks nodes.

## Deviations

- Built as a single coherent commit rather than four task commits — single new file, fully specified plan.
- Added a `.detail-block p` default font-size (0.92rem) not in the spec for readable body copy; additive only.

## Verification

- File created, valid HTML structure, `#journey-view` visible + `#detail-view[hidden]` on load.
- Two tool links present (`../tools/rotor-solver/`, `../tools/peristaltic-roller-displaced-volume-model/`).
- No edits to `assets/style.css`. Manual browser check (serve.bat) recommended for animation + 375px scroll.
