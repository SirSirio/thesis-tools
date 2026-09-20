# Visual material available for the defense deck (inventory 2026-09-19)

Paths relative to the repo root unless noted. `Pictures/` means `D:\03. DTU - Offline\03. MASTER THESIS\01. Thesis Document LaTex\latex\Pictures\`. Exports means `01. Thesis Document LaTex\assets\exports\`.

## Videos: four subjects exist, nothing else

| Web copy (with `-poster.jpg`) | Length | Frame | Content |
|---|---|---|---|
| `assets/media/video/pump-head.mp4` | 23 s | 540 x 960 portrait | Pump head v2.3 running, close-up |
| `assets/media/video/pump-gravimetric.mp4` | 11 s | 540 x 960 portrait | Gravimetric run on the balance, proto v2.3 |
| `assets/media/video/droplet-slowmo.mp4` | 7 s | 720 x 1280 portrait | Slow-motion droplet detaching from a needle tip |
| `assets/media/video/alignment-v2.mp4` | 14 s | 1080 x 1024 near square | Alignment stage V2 indexing a rack |

Masters: `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/PrototypePumpHeadV2.3Dispensing.mp4` (720 x 1280), `pump-pprototype-2-3-measurement-video.mp4` at repo root, `prototypes/DropletDetachmentSlowMo.mp4` (1080 x 1920), `prototypes/Prototype-2-Alignment-Module/Alignment_Module_V2.mp4` (34 MB).

**Whole-machine clips, found 2026-09-20** in `01. Thesis Document LaTex\assets\exports\Full Prototype\` (masters) and encoded to `assets/media/video/` with `-poster.jpg` beside each:

| Web copy | Master | Length | Frame | Size | Content |
|---|---|---|---|---|---|
| `machine-dispensing.mp4` | MachineDispensingVeryNice2.mp4 | 7 s | 1280 x 720 | 0.8 MB | the machine dispensing, close and clean; cover loop |
| `machine-dispensing-portrait.mp4` | MachineDispensingVeryNice.mp4 | 27 s | 540 x 960 | 2.6 MB | the machine dispensing, portrait |
| `machine-demo.mp4` | DemoSpedUp.mp4 | 20 s | 1280 x 720 | 3.9 MB | a sped-up run |
| `machine-outdoor-run.mp4` | OutDoorFullRunSpedUp.mp4 | 44 s | 1280 x 720 | 7.8 MB | the full run outdoors on battery, sped up |

Encoded H.264, 30 fps, faststart, with the master's AAC audio kept (the sped-up demo master has no audio track). Re-encoded with sound on 2026-09-20 after Sirio asked for it.
**Still missing:** a screen recording of the operator panel, the six-needle carrier or vibration release in motion, the V3 chassis in motion.

## Web-sized stills in `assets/media/` (75 files, all deck ready)

- `device/` (20): outdoor.jpg, top.jpg, outside-side.jpg, outside-side-right.jpg, top-front-inside.jpg, inside-left.jpg, inside-right.jpg, electronics-bay.jpg, battery-empty.jpg, battery-loaded.jpg, battery-cradle-cad.png, carriers-rear.jpg, carriers-side.jpg, pump-storage-back.jpg, pump-storage-side.jpg, sample-front.jpg, sample-back.jpg, validation-start.jpg, validation-done.jpg, validation-battery.jpg
- `pump/` (10): proto01-open.jpg, proto01-closed.jpg, v23-render.png, disassembly.jpg, pegs-roller.jpg, bearing-pocket-test.jpg, gravimetric.jpg, carrier-central-empty.png, carrier-central-full.png, carrier-left-full.png
- `alignment/` (17): sketch-1.jpg, sketch-2.jpg, sketch-3.jpg, sketch-6.jpg, rack.png, motor-holder-front.png, pusher-axis-1.png, pusher-axis-2.png, lid-fouling.jpg, v21-homing.jpg, v3-iso.png, v3-top.png, v3-bottom.png, v3-top-annotated.png, v3-bottom-annotated.png, v3-left-end.jpg, v3-markings.jpg
- `nozzle/` (8): needle-assortment.jpg, carrier-top.png, carrier-in-holder-top.png, holder-vibr-top.png, holder-vibr-bottom.png, as-built.jpg, mounted-front.jpg, lines-over-rack.jpg
- `ui/` (13): display-holder-cad-front.png, display-holder-cad-side.png, display-side.jpg, display-top.jpg, round1-machine-state.png, screen-home.png, screen-home-dark.png, screen-run.png, screen-check.png, screen-assign.png, screen-diag.png, screen-done.png, screen-recipes.png (640 x 480)
- `storage/` (3): cartridge.jpg, sleeve.jpg, needle-holder.jpg
- `method/` (3): calibration-rings.jpg, shrink-bars.jpg, proto01-circuit.jpg

## Thesis masters worth pulling in (not yet web-sized)

- Vector diagrams (PDF, convert to SVG or PNG): fig-module-hierarchy, fig-module-relationships, fig-architecture-selected, fig-power-tree, fig-pump-principles, fig-rotor-geometry, fig-pump-head-gap, fig-pump-parts (exploded pump), fig-roller-footprint, fig-roller-peg-taper, fig-bead-sequence, fig-dispensing-landscape, fig-opportunity-matrix, fig-double-diamond, fig-design-build-test, fig-gsd-loop, fig-ai-working-loop, fig-project-timeline, fig-preparation-families, fig-pipette-anatomy
- Plots (PDF): fig-pump-accuracy, fig-pump-precision, fig-low-volume-precision, fig-pipetting-precision, fig-error-types-a/b, fig-flow-oscillation, fig-v21-gap-around-arc, fig-print-compensation, fig-printer-calibration
- v2.3 campaign plots (PNG, SVG sources beside them): `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/test-figures-v2.3/` accuracy_vs_strokes, cv_vs_speed, cv_vs_volume, evaporation, per_stroke_vs_speed; and `Tests/pump-performance-1.52.png`
- Sketches: alignment-sketch-4 (push direction scoring), sketch-5 (mechanism scoring), app-sketch-discrete-peristaltic, app-sketch-fixed-height-gravity; alignment-v1-stage.png (V1 photo strip)
- Tool screenshots: tool-rotor-*, tool-occlusion-*, tool-tensioned-path, tool-architecture-*, tool-dispensing-choreography, tool-pin-budget, tool-benchmark-comparison
- Commercial and literature instruments (check attribution before use): instr-opentrons-flex, instr-tecan-fluent, instr-mantis, instr-sidekick, instr-cobas-liat-tube, instr-nanopipette-system, instr-yin-handheld, instr-phil-robot, fig-portable-qpcr, chen-sample-to-answer (4.5 MB), app-perry-syringe-pump (3.5 MB, CC BY-NC-ND)
- Firmware screens: 131 captures at 1280 x 960 in `Pictures/ui/` (families: home, run, assign, check, fill, reset, recipes, liquids, logs, diag, picker, done, fault, settings, lang); 134 at 320 x 240 in `tools/ui-mockup/screens/`
- Exports extras: `alignment-mod/align-all-front-top.png`, `rack-bottom-grooves.png`, `rack-hole-detail.png`; the eight-view carrier set; `Prototype-2-Alignment-Module/cad-planning/reference/layout-v3-iso.png` (1920 x 1080, the only 16:9 render)
- Site motif: `Pictures/tools-site-mark.png` and `tools-site-mark-fade.png` (orange line art, tube to rotor to nozzle to sample)

## Embeddable pages (same origin, iframe friendly)

Tools: rotor-solver, peristaltic-roller-displaced-volume-model (`#calculator` deep link), peristaltic-tensioned-path-model, pump-testing, system-architecture-explorer, dispense-throughput-simulator, ui-prototypes, ui-mockup, gsd-workflow-guide, thesis-timeline. Records: prototypes/index.html and the five prototype subpages, the landing page.

## Housekeeping noticed

`head-result.jpeg` at the repo root is a page screenshot, not a pump head. `pump-prototype-2-3-final-measurment-picture-cropped.jpg` duplicates `assets/media/pump/gravimetric.jpg`. `prototypes/.../pump-head-web.mp4` duplicates the web pump-head clip byte for byte.
