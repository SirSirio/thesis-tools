# Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

**Sirio Vittorio Feltrin** · DTU Department of Health Technology · 2025–2026

Interactive computational tools developed alongside master's thesis research on a modular automated liquid dispensing device for point-of-care and field use. Each tool is a self-contained HTML/JS page — no installation, no build step, no internet required.

**Live site:** [sirsirio.github.io/thesis-tools](https://sirsirio.github.io/thesis-tools/)

---

## Tools

| Tool | Description | Status |
|------|-------------|--------|
| [Peristaltic Rotor Geometry Solver](tools/rotor-solver/index.html) | Solves rotor radius analytically for a target stroke volume. Checks roller collision, hub clearance, and tube length feasibility across roller counts 3–12. Motor & microstepping panel screens each configuration against Wantai 42BYGHW811 / DRV8825 torque margin (FoS), steps/stroke, µL/step resolution, and max step rate — voltage-dependent via inductive ceiling. Full EN/IT interface. | ✅ Live |
| [GSD Workflow Guide](tools/gsd-workflow-guide/index.html) | Interactive reference for the GSD spec-driven development workflow. Visual diagram of the discuss → plan → execute loop with optional quality gates and utility commands. Expandable intro to spec-driven development and getting-started guide for new and existing projects. | ✅ Live |
| [Peristaltic Occlusion & Displaced-Volume Model](tools/peristaltic-roller-displaced-volume-model/index.html) | Two-part geometric reference for tube-deformation mechanics of a rigid-backed peristaltic pump. Part 1: stadium cross-section model (constant-perimeter assumption, residual lumen area, interactive SVG). Part 2: axial contact length, displaced volume per roller, and arc compensation. LaTeX formulas, parameter tables, and assumption lists for thesis-level documentation. | ✅ Live |

---

## Using offline

1. Download or clone this repository
2. Open `index.html` in any modern browser
3. Navigate to individual tools from the landing page — all tools work without an internet connection

---

## Tech

Static HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no external dependencies. Designed to run from a file system or a USB drive as well as GitHub Pages.

---

## Development workflow

New tools are built with [GSD](https://github.com/open-gsd/get-shit-done-redux) and Claude Code. Each tool has a `SPEC.md` alongside its `index.html` documenting inputs, outputs, formulas, and assumptions.

See `CLAUDE.md` for the full project orientation and `ROADMAP.md` for planned tools.

---

## Thesis context

The device under development combines a peristaltic pump (NEMA17 stepper, rotating peristaltic head, Sensirion flow sensor) with a modular fluidic interface for point-of-care diagnostics. These tools support design decisions made during the thesis and are cited in the written work with QR codes linking here.

---

*Technical University of Denmark · Department of Health Technology*
