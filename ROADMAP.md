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
