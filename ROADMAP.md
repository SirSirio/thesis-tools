# Roadmap

Tools planned, in progress, and shipped for the thesis tools site.

---

## Shipped

| Tool | Description |
|------|-------------|
| Peristaltic Rotor Geometry Solver | Solves rotor radius for target stroke volume; checks 3 feasibility constraints across roller counts 3–12. |
| Rotor Solver — Motor & Microstepping Panel | Per-row motor screening: rollers in contact, steps/stroke, µL/step, torque rim (g), FoS with traffic light (green/amber/red), max step rate. Voltage-dependent torque via inductive ceiling derating. RPM summary card. Full EN/IT translation. Wantai 42BYGHW811 / DRV8825. |
| Rotor Solver — Arc Compensation & Geometry Diagram | Manual arc-compensation (ΔArc_total) input replacing the occlusion-efficiency slider, linked to the displaced-volume model's `#calculator`. Live top-down SVG geometry diagram below the results table: roller-count selector (defaults to smallest feasible R), dimensioning R, OD, boss ∅, bearing OD, hub clr, arc gap, tube arc and ID, with per-config feasibility status. ENG/IT. |
| Peristaltic Occlusion & Displaced-Volume Model | Two-part geometric reference with thesis-level LaTeX documentation. Part 1: stadium cross-section model (constant-perimeter, residual lumen area A(h), interactive SVG). Part 2: axial contact length L_c, displaced volume V_roller, arc compensation ΔArc, empirical k-factor. |
| Presentations (HTML Decks) | A reveal-style HTML slide deck runtime with live iframe tool embeds, a custom presentations index, and the seed Lab Meeting (June 2026) deck. Built with vanilla HTML/CSS/JS for offline use. |
| Tensioned Tube-Path & Stroke Volume Model | Taut-path packet geometry (tangent runs + α/2 wraps) replacing the 180° arc assumption for tubes pinned at both ends; axial pre-strain corrections (A/λ, w/√λ, δ_ε); forward V/stroke prediction and closed-form corrected rotor radius R*. Motivated by the proto-01 tube-installation findings. |
| Thesis Roadmap & Timeline | JS-driven Gantt of the whole project (Feb–Sep 2026). Owner-coloured, status-shaded bars grouped by work stream (pump, pump test method, alignment, partner modules, integration, writing); today line, milestone diamonds, hover tooltips, live countdown to submission (15 Sep) / defense (28 Sep). Built from the original Miro plan; forward dates are working estimates in an inline `DATA` block. |
| System Architecture Explorer | Promoted from an ad-hoc design-record page. Editable component-price BOM, live DKK↔EUR converter, sortable/filterable 17-variant control-electronics matrix (driver type, comms layer, complexity, cost) with expandable per-variant BOM breakdowns. Persists prices/rate via localStorage. Partially retires the "Bill of materials / component selector" backlog item — pin-budget model and live system diagram are follow-on additions. |

---

## Planned

| Tool | Description | Priority |
|------|-------------|----------|
| *(add tools here)* | | |

---

## Ideas / Backlog

- Flow sensor calibration curve viewer
- Dispense protocol calculator (multi-step sequences)
- Tube occlusion efficiency estimator from gravimetric data
- Bill of materials / component selector

---

*Update this file whenever a tool ships or a new idea is added.*
