# SPEC: Prototype Design Space

## Purpose

`prototypes/index.html` is the journey index of the hardware prototypes: three module
threads (pump, alignment, nozzle), one winding curve per thread, one summary card per build,
and one wide Integration node where the three curves meet. Each card links to the record
that holds the full story (purpose, parameters, worked calculations, measured results,
design reasoning). HTML is the content source of truth: hand-authored, no generator, no
data fetch.

The thesis is finished, so the page shows only what was built. The former ghost cards for
planned builds are gone; the only forward-looking line is the muted "Next" sentence under
the Integration node.

## Inputs

None. Static content only.

## Page structure

The page joins the shared frame at depth 1 (`assets/FRAME-SNIPPET.html`): `style.css`,
then `site.css`, then `site-nav.js` in `<head>` with no defer; `<body class="site-frame">`;
the three-element `.bg-blobs` wash; `.site-nav` with `data-root="../"`; the `#instr-panel`
anchor; the shared `.site-foot`. The page carries no eyebrows (no uppercase tracked labels)
and no em-dashes or en-dashes.

Order inside `main.journey`:

1. `.journey-header`: `h1` "Prototype Design Space" in the display face, one line under it.
2. `.river`: the three `.thread` sections, the desktop `.river-svg`, the `.confluence`
   section (Integration node) and the `.confluence-next` line.

### Threads

One thread = one module = one curve + its own node set. Each thread has a `.thread-head`
(`h2` title, one line, no eyebrow), a `.journey-stage > .stage-inner` with its own
`.thread-svg` (used when the threads are stacked) and a `.nodes-layer` holding three
`.proto-node` cards.

| Thread | Class | `data-thread` | Accent family |
|--------|-------|---------------|---------------|
| Pump module | `.thread--pump` | `pump` | orange to red |
| Alignment module | `.thread--align` | `align` | violet to indigo-blue |
| Nozzle module | `.thread--nozzle` | `nozzle` | teal to blue |

### Nodes

Every node is `<a class="proto-card">` with a round photo thumb (`.proto-thumb`, 76px,
`object-fit: cover`; renders on a white ground use `.proto-thumb--render` with
`object-fit: contain`), a mono tag in the thread accent (`.proto-tag`, normal case), an
`h3` title, a one-line purpose, two or three mono numbers (`.num` chips, `--r-sm`) and an
"Open record" call to action. Thumbs come from `../assets/media/`.

| Thread | Node | Thumb | Numbers | Link |
|--------|------|-------|---------|------|
| Pump | Proto-01, 5 µL four-roller head | `pump/proto01-closed.jpg` | 3.39 µL per stroke, 5 µL nominal, 4 rollers | `Prototype-1-Pump-Module/proto-01-5ul-4roller/index.html` |
| Pump | Proto-02, v2.1 to v2.3 | `pump/v23-render.png` | 4.53 µL per stroke, CV 0.25 to 0.34 %, gap 1.52 mm | `Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/index.html` |
| Pump | Integrated pump heads | `pump/carrier-central-full.png` | 3.94 and 4.10 µL per stroke, 2 of 6 channels | `../index.html#stop-pump` |
| Alignment | Concept sheets | `alignment/sketch-1.jpg` | about 50 concepts, 6 sketch sheets | `Prototype-2-Alignment-Module/index.html` |
| Alignment | V2 and V2.1, rack-indexing stage with homing | `alignment/v21-homing.jpg` | homing ≤ 0.03 mm, 22 s to home, 22 mm pitch | `Prototype-2-Alignment-Module/index.html` |
| Alignment | V3, two-axis chassis | `alignment/v3-iso.png` | 5 racks, 40 tubes, about 500 mm | `Prototype-2-Alignment-Module/v3-two-axis-chassis/index.html` |
| Nozzle | Inherited needle carrier | `nozzle/needle-assortment.jpg` | 27 to 21 G tried, 6 needles | `Prototype-3-Nozzle-Module/index.html` |
| Nozzle | Rebuilt, six-seat carrier with vibration release | `nozzle/holder-vibr-top.png` | 6 seats, 22 G validated, 5 mm radius | `Prototype-3-Nozzle-Module/index.html` |
| Nozzle | Droplet release, on camera | `video/droplet-slowmo-poster.jpg` | 22 G, 40 of 40 tubes, 5 mm radius | `Prototype-3-Nozzle-Module/index.html#droplet-video` |
| Integration | Integrated prototype (wide node) | `device/top.jpg` | 50 × 35 × 18 cm, 2 of 6 channels, 40 tubes per run | `../index.html#machine` |

Numbers trace to the thesis facts in the redesign brief and to the records; nothing is
invented. The muted line under the Integration node reads: "Next: six channels, a custom
PCB, an enclosure, a run with real reagents."

Vertical placement is per node through inline custom properties on `.proto-node`:
`--node-top` for the stacked layout and `--node-top-wide` for the desktop layout, plus
`--i` for the reveal stagger. Stage height is per thread through `--stage-h`. Nothing is
keyed by element ID, so adding a node or a thread needs no new CSS rule.

## Thread accent contract

Each thread sets six custom properties on its wrapper, and the matching river path carries
the same class block so the desktop curve takes the same colour. Every accent-coloured rule
inside a thread reads these, never the global `--accent`: the nav, the background wash and
every other page depend on the global staying orange.

| Property | Pump | Alignment | Nozzle |
|----------|------|-----------|--------|
| `--t-accent` | `#ff6b2b` | `#9b7fe0` | `#4fb3c8` |
| `--t-accent-2` | `#e83535` | `#5a8fd8` | `#3a7bd5` |
| `--t-accent-soft` | `#ffb08a` | `#c3aef5` | `#a9dbe6` |
| `--t-glow` | `rgba(255,107,43,.25)` | `rgba(155,127,224,.28)` | `rgba(79,179,200,.28)` |
| `--t-border` | `rgba(255,107,43,.18)` | `rgba(155,127,224,.22)` | `rgba(79,179,200,.22)` |
| `--t-path` | `rgba(255,107,43,.28)` | `rgba(155,127,224,.28)` | `rgba(79,179,200,.28)` |

The path stroke is set in CSS from `--t-path`, not as a `stroke` attribute on the SVG
element. The Integration node uses the global orange, because it is the whole machine.

## Layout and convergence geometry

Three layouts, chosen by viewport width:

### Desktop, 1100px and up: three columns, one river

`.river` becomes a grid of three equal columns (40px gap, `main` widened to 1440px) with
four rows: thread heads, stages, Integration node, "Next" line. The `.thread` sections
switch to `display: contents`, so each head lands in row 1 and each stage in row 2 of its
own column; custom properties still inherit through them. All three stages share
`--stage-h: 1700px`, so the three curves start and end at the same y.

One SVG (`.river-svg`, `viewBox="0 0 1800 2200"`, `preserveAspectRatio="none"`) is an
absolutely positioned grid child spanning row 2 across all three columns, behind the
stages. It holds three paths, `data-thread` pump, align and nozzle. Each path is three
half-waves of 660 viewBox units (a cubic from the column centre back to the column centre,
control points 80 units to the side and a third of the way in, so the crest sits 60 units
off centre at mid-wave) followed by one bend into the shared end point at (900, 2200), the
bottom centre of row 2:

```
pump    M 285 0  C 205 220, 205 440, 285 660  C 365 880, 365 1100, 285 1320  C 205 1540, 205 1760, 285 1980  C 341 2134, 600 2200, 900 2200
align   M 900 0  C 980 220, 980 440, 900 660  C 820 880, 820 1100, 900 1320  C 980 1540, 980 1760, 900 1980  C 860 2090, 900 2150, 900 2200
nozzle  M 1515 0 C 1595 220, 1595 440, 1515 660 C 1435 880, 1435 1100, 1515 1320 C 1595 1540, 1595 1760, 1515 1980 C 1459 2134, 1200 2200, 900 2200
```

The pump and nozzle curves mirror each other about the centre line; the alignment curve
runs the same phase as the nozzle. The pump arrives at the meeting point from the left and
level, the nozzle from the right and level, the alignment from above and vertical. The
Integration node sits in row 3 with no top margin, so the meeting point is the top centre
of that section, where a 14px orange dot (`.confluence::before`) marks the confluence. The
viewBox aspect (1800 by 2200) is close to the rendered aspect, so the 2.6 unit stroke
renders at about 2px without needing `vector-effect`, which would break the `pathLength`
dash trick.

Node crests: node centres are aimed at y = 330, 990 and 1650 units (5 %, 35 % and 65 %
tops on a 1700px stage), the crest of each half-wave. Cards are `clamp(250px, 72%, 360px)`
of their column so that a 60 unit crest (about 46px at 1376px river width) stays inside the
clamp range and the card centre really sits on the curve.

### Stacked, 641px to 1099px: three threads in sequence

The river SVG is hidden. Threads stack in the order pump, alignment, nozzle, separated by a
1px `--line` rule, each with its own `.thread-svg` (`viewBox="0 0 600 900"`,
`--stage-h: 1400px`) carrying three half-waves of 300 units with 120 unit control offsets:

```
pump, nozzle  M 300 0 C 180 100, 180 200, 300 300 C 420 400, 420 500, 300 600 C 180 700, 180 800, 300 900
alignment     M 300 0 C 420 100, 420 200, 300 300 C 180 400, 180 500, 300 600 C 420 700, 420 800, 300 900
```

Node tops 6 %, 39 % and 72 % put the card centres on the crests. The Integration node
follows the last thread with a 72px top margin; nothing converges in this layout.

### Phones, 640px and under

No curves. `.proto-node` reverts to `position: static`, full width, 20px apart; stage
heights are released; the alignment routine clears its inline offsets so nothing leaks back
on resize. Padding drops to 16px. No horizontal scroll at 320, 390, 640, 1024 and 1440px.

## Animation technique

- Path draw: `<path pathLength="1">` and a `stroke-dasharray` transition from `0 1` to
  `1 0` over 1.4 s on `--ease` (not `stroke-dashoffset`, which reverses in some browsers).
- One `IntersectionObserver` per thread on that thread's `.stage-inner`. When it enters,
  the script adds `.is-visible` to the thread's own `.thread-svg` path, to the river path
  with the matching `data-thread`, and to the thread's nodes, then disconnects. On desktop
  the three stages share a top edge, so the three streams draw together.
- Nodes rise 14px into place after the draw, staggered 140 ms by `--i`, on `--dur` and
  `--ease`. `:focus-within` forces a node visible so keyboard focus never lands on a hidden
  card.
- The Integration node and the "Next" line use the shared `.reveal` helper from
  `site-nav.js`.
- Hover: cards lift 2px, thumbs scale 1.02, border takes the thread accent. No glow stacks.
- All motion sits under `@media (prefers-reduced-motion: no-preference)` and the `html.js`
  class that `site-nav.js` adds before first paint. Default CSS shows everything, so a
  visitor with reduced motion, or without JavaScript, sees the drawn curves and every card.
- No scroll listener. Node placement re-runs on `load`, `resize` and a `ResizeObserver` on
  `.river`.

## Node placement routine

`alignNodesToPath()` puts each card's centre on its thread's curve. It samples the path
(`getPointAtLength`, 300 samples; `pathLength` only rescales dashes) and picks the sample
nearest the card's vertical middle:

- Desktop: the card's centre y relative to the river SVG maps to viewBox y (2200 units over
  the SVG height); the sampled x maps to a page x (1800 units over the SVG width) and is
  shifted into the card's own column by the column's left edge.
- Stacked: stage fractions map directly (900 units over the stage height, 600 over its
  width).
- The result is clamped to the column so a card never overflows its stage, then written
  as an inline `left` in px; `transform: translateX(-50%)` centres the card on it.

## Subpage contract

Every node links to a record subpage co-located with that prototype's `PROTOTYPE.md` and
media.

| Record | Subpage |
|--------|---------|
| proto-01 | `Prototype-1-Pump-Module/proto-01-5ul-4roller/index.html` |
| proto-02 | `Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/index.html` |
| Alignment V2 and V2.1 | `Prototype-2-Alignment-Module/index.html` (module root; this module keeps no `proto-NN-<slug>/` subfolder) |
| Alignment V3 | `Prototype-2-Alignment-Module/v3-two-axis-chassis/index.html` |
| Nozzle module | `Prototype-3-Nozzle-Module/index.html` (module root; the release section is `#droplet-video`) |
| Integrated heads, integrated prototype | the landing page stops `../index.html#stop-pump` and `../index.html#machine` |

Subpages link `assets/style.css` then `assets/prototype-page.css`, then their own small
inline `<style>`; they put `.proto-page` on `<main>` with `.proto-page--align` for the violet
family; per-page accent flows through the eight `--p-*` properties. Pages with maths load the
local KaTeX fallback at `prototypes/katex/`. Images live in each prototype's folder or under
`assets/media/`.

## Prototype registry

### Prototype-1-Pump-Module

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| proto-01 | 5 µL four-roller peristaltic | Built, superseded by proto-02 | 3.39 µL of a nominal 5 µL; the shortfall triggered the printer characterisation (external dimensions shrink about 0.65 %, bores lose 0.14 mm) |
| proto-02 | 5 µL four-roller, corrected geometry and gap sweep | v2.3 qualified (2026-07-23) | Gap 1.52 mm measured; 4.53 µL per stroke; CV 0.25 to 0.34 %, against 0.27 % for a micropipette on the same balance |
| Integrated heads | Two heads on the instrument | Run on the assembled machine | 3.94 and 4.10 µL per stroke after per-head calibration; 40-tube run unattended |

### Prototype-2-Alignment-Module

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| Concepts | About 50 concepts on 6 sketch sheets | Paper only | One concept built |
| V2 | Rack-and-pinion sample-indexing stage | Built (2026-06-25) | Motor and pusher above the rail; indexes one rack at a time |
| V2.1 | Homing microswitch and three-pass homing | Bench-validated (2026-07-31) | Repeatable zero no worse than 0.03 mm; 22 s to home; 22 mm pitch |
| V3 | Two-axis chassis | Built, run on the assembled instrument | About 500 mm long; five racks, 40 tubes per batch; motorless fishbone ejection |

### Prototype-3-Nozzle-Module

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| Inherited | Companion thesis needle carrier | Superseded | Needle gauges 27 to 21 G tried; droplets stayed pinned |
| Rebuilt | Six-seat hub carrier with vibration release | Built, system-tested | 22 G validated; droplets land within a 5 mm radius; 40 of 40 tubes on the validation run |

## Constraints

- Static site only: no build tools, no npm, no frameworks; works offline and on GitHub Pages.
- HTML is the content source of truth: no JSON or markdown fetch, no generator.
- No CDN-only dependencies; the pump subpages use the local KaTeX fallback at
  `prototypes/katex/`.
- No horizontal scroll at 320, 390, 640, 1024 and 1440px (project hard rule).
- Page-specific styles stay in the page's `<style>`; the shared frame is `assets/site.css`
  and `assets/site-nav.js`; the shared subpage system is `assets/prototype-page.css`.
- Thread and page accents flow through `--t-*` and `--p-*` properties, never by overriding
  the global `--accent`.
- No em-dashes or en-dashes, no eyebrows, no internal codes in visible text.
- No invented numbers: every value on this page traces to the thesis facts or a record.
- `Alignment_Module_V2.mp4` (about 36 MB) stays unlinked; the web-sized clip is
  `assets/media/video/alignment-v2.mp4`.
