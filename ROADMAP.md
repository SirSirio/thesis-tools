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
| System Architecture Explorer | Promoted from an ad-hoc design-record page. Editable component-price BOM with source/confidence tags, live DKK↔EUR converter, sortable/filterable 20-variant control-electronics matrix (driver type, comms layer, complexity, cost, pins free) with expandable per-variant BOM breakdowns, a pin-budget feasibility readout (selectable SPI vs 8-bit-parallel screen scenario), and a live variant-driven SVG system diagram. Persists prices/rate via localStorage. Partially retires the "Bill of materials / component selector" backlog item. |
| Dispense Choreography & Throughput Simulator | Cocktail-pipeline scheduler for a 6-nozzle linear indexing line (8×4-sample rack). Concurrency slider 1…N with A1/A2 endpoint markers, lockstep-vs-independent mode toggle, stroke-quantized dose timing (rollers×µL/stroke×RPM), full wall-clock accounting (fill/steady/drain + rack changes). Row-per-station Gantt (steady-state window), bottleneck highlight, A1-vs-A2 time-saved headline, illustrative rack-indexing animation. Answers U5 (does the architecture need per-motor independent rates) empirically. |
| Pump Testing Protocol | Document-first, two-layer dispensing-accuracy qualification protocol. Top layer: market-grade ISO 23783-2 Annex D gravimetric method + ISO 8655 pipette-equivalence benchmark, deep metrological core (balance/environment, mass→volume Z-factor, replicates, trueness/precision, reporting) plus a lighter go-to-market map (safety/reliability, biocompatibility, QMS/regulatory) and alternate-methods comparison. Bottom layer: the actual proto-02 test protocol with every deviation from the ISO ideal reasoned and justified against prototype-stage hardware limits. No calculator — a citable protocol document. |
| Operator Interface Prototypes | The UI design record published as live artifacts: five self-contained HTML pages (rounds 1–3 designing the interface, rounds 4–5 revisiting the home screen after use) copied verbatim into `tools/ui-prototypes/rounds/`, wrapped by an index page with live scaled iframe previews. Two mechanical edits only: Montserrat vendored to `assets/fonts/montserrat/` (offline requirement) and a back-link per artifact. Thesis chapter 9 prints this page's address (frozen path). Executed as GSD quick task 20260901-ui-prototypes. |
| Live User Interface | `tools/ui-mockup/`, the address chapter 9 reserved: an interactive mock of the finished firmware interface built on the device-captured frame set (134 frames, 30 screens, 320 × 240, RGB565-exact) rather than an HTML rebuild, so nothing can drift from the firmware. Hotspots per screen come from the screen builders' geometry, destinations from the firmware's navigation table; a conditions panel flips the interlock variants, timed sequences play the run, fill, reset and calibration phases, and the screen map beside the panel is two-way linked to it. Captures served from `tools/ui-mockup/screens/` unchanged. |

---

## Shipped, September 2026: the showcase redesign

One pass over the whole site once the thesis was written, so it reads as the record of a
finished instrument rather than a folder of calculators. The cited addresses did not move:
the root, `tools/ui-prototypes/` and every `tools/<slug>/` still answer at the same URL. A
pre-redesign copy is kept in the sibling folder `02. GitHub Thesis Tools Page - BACKUP
2026-09-18` and at the git tag `backup/pre-showcase-2026-09-18`.

| Item | Description |
|------|-------------|
| Showcase landing page | Rewritten as one read. A three breath opening (the rotor motif kept, GSAP still local), the problem statement, then the assembled machine in photographs with leader-line callouts. `#machine` adds a floating clip cluster and strips of development photos; `#journey` walks seven stops, vial, pump, nozzle, rack, screen, electronics and landing, with each tool anchored to the module it served and a fixed route map alongside; `#method` closes on how the work was run. English and Italian strings are in place, the Italian pass is still to come. |
| Shared site frame | `assets/site.css` and `assets/site-nav.js`, new sanctioned shared files on the same footing as the deck runtime. Tokens, the Geist display face for headings on every page, a water background wash that restyles the `.bg-blobs` markup each page already had, the sticky glass nav, the Instruments panel, the footer, the `.reveal` helper, the buttons and the 28px tool marks. `assets/FRAME-SNIPPET.html` documents the markup per folder depth. Every tool page, both deck pages and every prototype record now carry it; their calculators and content were left untouched, only visible dashes in the copy were replaced. |
| Instruments page | `tools/index.html`, a plain index of all nine tools and the three records, grouped Pump, Electronics, Interface, Method and Records. Same list the nav panel renders from `site-nav.js`, and it works with JavaScript off. |
| Prototypes river | `prototypes/index.html` rebuilt from two threads to three, pump orange, alignment violet, nozzle teal-blue, converging into one Integration node for the assembled machine. Ghost cards for builds that never happened are gone; `prototypes/SPEC.md` was rewritten to match. |
| Nozzle module record | New `prototypes/Prototype-3-Nozzle-Module/`, both the deep `PROTOTYPE.md` and its page: the inherited mechanism and why it did not work, the rebuild into a six seat carrier with vibration release, the mount on the chassis, the tip trials that set the boundary, and the forty-tube validation inside the 5 mm landing tolerance. |
| Alignment V3 record | New `prototypes/Prototype-2-Alignment-Module/v3-two-axis-chassis/index.html`, written from the V3 section appended to the module `PROTOTYPE.md`: the two-axis chassis with an input queue, a dispensing lane and an output tray. |
| Media library | `assets/media/` now holds the web-sized photographs and renders, grouped `device/`, `pump/`, `alignment/`, `nozzle/`, `ui/`, `storage/`, `method/` and `video/`. The four clips are re-encoded H.264, muted, each with a poster frame. Masters stay in the thesis folders. |
| Droplet release clip, published | Moved up from Planned. `assets/media/video/droplet-slowmo.mp4` with its poster, shown on the nozzle record at `#droplet-video`. Captioned as the regime in which the vibration burst is effective, not as the normal dispensing mode: on the assembled machine delivery is jet-like across most of the range, and the thesis reports that. |

---

## Next

| Item | Description |
|------|-------------|
| Whole-machine dispensing clip | Done 2026-09-20: the outdoor forty-tube run on battery (`assets/media/video/machine-outdoor-run.mp4`, 44 s sped up, 1080 wide, no audio) plays in the landing page's centre slot with its own poster; the placeholder note is gone. |
| Italian translation pass | Every visible string on the landing page carries a `data-i18n` key and the English side is complete. The Italian dictionary still needs a full pass before the switch earns its place. |

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
