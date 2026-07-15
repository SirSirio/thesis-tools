---
phase: 06-system-architecture-explorer-promote-the-electronics-archite
plan: 06
subsystem: ui
tags: [static-html, svg, data-visualization, system-diagram, event-driven]

# Dependency graph
requires:
  - phase: 06-05
    provides: "19-variant VARIANTS/DEFAULTS data model (v.b bus type, v.c/v.driver/v.dk driver topology, v.bom brain key, v.at concurrency, v.cx complexity), pinsOf(v)/pinConfidenceOf(v) pin-budget engine, interfaceMode/interfaceConf globals"
provides:
  - "tools/system-architecture-explorer/index.html — buildDiagram(v): live per-variant SVG system diagram (fixed 880x600 viewBox) rendering Layer A (brain<->screen), Layer B (system bus with real node count), Layer C (driver topology + 6 driver->motor links), a constant alignment node, and a power block (60W/150W PSU, 12V/24V dual rail, common ground)"
  - "topoClassOf(v)/pumpNodeLabelOf(v) — variant-to-topology-class classifier (fused/satellite/distributed/printer) derived from the variant's real bom, no new data fields added"
  - "Row-click selection (D-02): clicking a matrix row highlights it (.selected), redraws #diagram via selectVariant(v), and still expands the BOM detail row — the diagram's only control, rebound on every renderMatrix() so sort/filter/price-edit never break it"
affects: [06-07]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "buildDiagram(v) mirrors rotor-solver's buildFigure(): fixed pixel viewBox, template-string SVG assembly, full rebuild on every state change — not persistent DOM node mutation"
    - "Topology classification is a pure function of the variant's existing bom keys (ramps/skr -> printer, promini -> distributed, rp2040/stm32/nano -> satellite, else -> fused) — no new VARIANTS fields were needed since 06-05's bom already encodes this"
    - "selectedVariantId is the single source of selection truth; renderMatrix() reconciles it after every rebuild (falls back to the first visible row if the previous selection was filtered out, clears the diagram if no rows match)"

key-files:
  created: []
  modified:
    - tools/system-architecture-explorer/index.html

key-decisions:
  - "Topology class derived entirely from existing v.bom keys rather than adding a new classification field to VARIANTS — ramps/skr implies printer-board, promini implies 6-node distributed, rp2040/stm32/nano implies a single satellite pump-node, everything else is fused-into-brain. This kept the diagram plan strictly additive to 06-05's data model."
  - "Node count on Layer B computed as 2 (brain + alignment) + a per-class pump-node count (0/1/6) rather than iterating the bom generically — this exactly reproduces the theory section's own claimed node counts (e.g. 'P6-dist-485: 8 nodes on RS-485' = brain+alignment+6 promini), keeping the diagram consistent with the prose it illustrates"
  - "Pin-budget overrun (06-05's pinsOf(v).overrun) is surfaced as a red stroke on the brain's Layer-A box plus a small '⚠ pins overrun' caption, rather than a separate diagram element — keeps the cue visually anchored to the component that actually runs out of pins"
  - "Diagram auto-selects the first visible (cheapest, by default sort) variant on initial load and after any filter/sort that removes the current selection, rather than showing an empty 'click a row' placeholder — demonstrates the capability immediately per the tool's 'Explorer' name, while still respecting D-02 (selection remains click-driven, this is just a sensible default)"
  - "Layer-C fan-out uses dashed connector lines for satellite/printer classes (pump-node -> drivers) vs solid lines for fused/distributed — a lightweight visual cue distinguishing 'routed through a node' from 'direct/one-per-node' wiring, using only existing site status colours, no new CSS variables"

requirements-completed: [ARCH-03]

# Metrics
duration: 12min
completed: 2026-07-15
---

# Phase 06 Plan 06: Live System Diagram (D-01/D-02/D-03) Summary

**Hand-authored per-topology-class SVG system diagram (`buildDiagram(v)`) that redraws on matrix row click, showing the three comms layers with real bus node counts, driver topology, the alignment node, and a 60W/150W power block — the capability that earns the tool the name "Explorer".**

## Performance

- **Duration:** ~12 min
- **Completed:** 2026-07-15T14:41:02Z
- **Tasks:** 2/2
- **Files modified:** 1

## Accomplishments

- `buildDiagram(v)` renders a fixed-viewBox (880×600) live SVG mirroring rotor-solver's `buildFigure()` template-string technique: Layer A (brain↔screen, SPI/8-bit-parallel per `interfaceMode`, skipped entirely for `espscreen`-integrated boards), Layer B (system bus drawn with the variant's real node count — 2 for fused, 3 for satellite/printer, 8 for distributed), Layer C (driver topology + all 6 driver→motor links, driver ICs coloured by dumb/smart/motion), the constant alignment node, and a power block correctly showing 60 W (1–2 concurrent) vs 150 W (all-6) with the 12 V/24 V dual rail on common ground
- `topoClassOf(v)` classifies all 19 variants into four hand-authored layouts — **fused** (10 variants: brain IS the pump controller), **satellite** (4: one dedicated pump-node MCU), **distributed** (2: six Pro-Mini nodes), **printer** (3: RAMPS/SKR board) — derived purely from each variant's existing `bom` keys, no new data fields
- The 06-05 pin-budget overrun is surfaced as a red-stroked brain node + "⚠ pins overrun" caption directly on the diagram
- Row-click selection (D-02) extends the existing BOM-expand click handler: one click highlights the row (`.selected`, accent box-shadow), redraws `#diagram`, updates a caption heading, and still expands the BOM — rebound on every `renderMatrix()` call so sorting/filtering/price edits never desync the wiring
- No second diagram control was added (dropdown / follow-cheapest both explicitly rejected per D-02) — selection stays click-a-row only
- The `prefers-reduced-motion: no-preference` transition guard on `#diagram svg` (added in 06-01) remains the only redraw transition — with reduced motion, the diagram still updates, just without the opacity transition

## Task Commits

1. **Task 1: Implement buildDiagram(v) — hand-authored template layouts by topology class (D-01, D-03)** - `d8eb253` (feat)
2. **Task 2: Wire row-click selection to redraw the diagram, highlight the row, and expand the BOM (D-02)** - `04a17ca` (feat)

## Files Created/Modified

- `tools/system-architecture-explorer/index.html` — added `topoClassOf()`, `pumpNodeLabelOf()`, `buildDiagram()`; added `selectedVariantId` state, `highlightRow()`, `selectVariant()`; extended the matrix row click handler; added a diagram caption/summary section and `.selected` row CSS

## Decisions Made

See `key-decisions` in frontmatter above for the full list. Highlights: topology class computed from existing `bom` keys (no new VARIANTS fields); Layer-B node counts hand-derived per class to match the theory section's own prose (e.g. "8 nodes on RS-485" for the distributed variant); pin overrun surfaced directly on the Layer-A brain box; diagram defaults to the first visible row on load rather than an empty prompt.

## Deviations from Plan

None — plan executed exactly as written. Both tasks matched their `<action>` specifications; no Rule 1–4 triggers encountered.

## Issues Encountered

None. This repository has no JS test framework (static-site constraint, `tdd_mode: false`) — verification was performed via a Node `vm` harness with a stubbed `document`/`localStorage`/`classList` that loaded the actual inline script and exercised it end-to-end:
- `buildDiagram(v)` invoked for all 19 variants: 0 runtime errors; class distribution 10 fused / 4 satellite / 2 distributed / 3 printer (sums to 19)
- Content assertions across one representative variant per class confirmed all D-03 elements present (Layer A/B/C labels, correct bus-type text, correct link-type text, alignment node, correct 60W/150W PSU text, all 6 motor labels, integrated-screen variant correctly omitting the external ILI9341 box)
- Full DOM-click simulation: on init exactly one row (`S1-i2c`, the cheapest by default sort) is selected and the diagram renders; clicking `P6-dist-485` moves the highlight to exactly that row, updates the caption, and redraws the diagram to show the distributed topology's Pro-Mini nodes — confirming D-02's single-selection, live-redraw behavior end-to-end

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- The tool's live diagram capability (D-01/D-02/D-03) is complete; `ARCHITECTURE.md`'s "see the diagram in index.html" pointer (repointed to `#diagram` in 06-03) is now backed by an actual live diagram
- Remaining phase work (per `.planning/ROADMAP.md`'s Phase 6 plan list): `SPEC.md` creation (06-07) should document `buildDiagram(v)`'s topology-class layouts, the fixed viewBox, and the pin-overrun cue alongside the existing cost/pin-budget documentation
- No blockers. `tools/system-architecture-explorer/index.html`'s inline `<script>` remains the single source of truth (D-08); the diagram consumes only existing, already-canonical variant fields

---
*Phase: 06-system-architecture-explorer-promote-the-electronics-archite*
*Completed: 2026-07-15*

## Self-Check: PASSED

- FOUND: tools/system-architecture-explorer/index.html
- FOUND commit: d8eb253
- FOUND commit: 04a17ca
