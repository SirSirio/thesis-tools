# Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

**Sirio Vittorio Feltrin** · DTU Department of Health Technology · 2025–2026

Interactive computational tools developed alongside master's thesis research on a modular automated liquid dispensing device for point-of-care and field use. Each tool is a self-contained HTML/JS page — no installation, no build step, no internet required.

**Live site:** [sirio.github.io/thesis-tools](https://github.com) *(update with your actual URL after deploying)*

---

## Tools

| Tool | Description | Status |
|------|-------------|--------|
| [Peristaltic Rotor Geometry Solver](tools/rotor-solver/index.html) | Solves rotor radius analytically for a target stroke volume. Checks roller collision, hub clearance, and tube length feasibility across roller counts 3–12. | ✅ Live |

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

New tools are built using [OpenSpec](https://github.com/Fission-AI/OpenSpec) (spec-driven development) with Claude Code. The OpenSpec skills have been customised for this project:

- **`/opsx:propose "tool idea"`** — creates a full spec (proposal, design, tasks) under `openspec/changes/` and automatically creates a `feature/<name>` git branch
- **`/opsx:apply`** — switches to the correct feature branch and implements the spec tasks
- **`/opsx:archive`** — archives the spec once the tool ships; branch is then merged into `master` and deleted

Each tool lives on its own branch during development so work-in-progress tools never affect the live site on `master`. See `CLAUDE.md` for the full project orientation and `ROADMAP.md` for planned tools.

---

## Thesis context

The device under development combines a peristaltic pump (NEMA17 stepper, rotating peristaltic head, Sensirion flow sensor) with a modular fluidic interface for point-of-care diagnostics. These tools support design decisions made during the thesis and are cited in the written work with QR codes linking here.

---

*Technical University of Denmark · Department of Health Technology*
