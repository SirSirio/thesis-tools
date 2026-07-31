# SPEC: Prototype Design Space

## Purpose

A visual, animated prototype-journey page tracking each hardware prototype from design
parameters to measured results. The journey page is an index: one winding path per hardware
module, one summary card per build. Each card links to that prototype's **own subpage**,
which carries the full record (purpose, parameters, worked calculations, measured results,
design reasoning). HTML is the content source of truth — hand-authored and maintained via chat.

Primary purpose: a space to design new prototypes with AI assistance and to review past
ones to improve the process. Documentation is a byproduct of that loop.

## Inputs

None — static content only. All content authored directly into the HTML files.

## Content Structure

The page set is **one journey index plus one subpage per prototype**. It is no longer a
single-file application with detail views toggled in place; `prototypes/index.html` holds
the journey and nothing else.

### `prototypes/index.html` — the journey index

- **Two threads**, stacked, not interleaved. One thread = one hardware module = one curve
  with its own node set. A reader following the pump story is never cut across by
  alignment nodes.
  - `.thread.thread--pump` — Pump Module, five nodes, stage height `2500px`
  - `.thread.thread--align` — Alignment Module, four nodes, stage height `2000px`
- Each thread has its own `.thread-head` (eyebrow, title, one-line subtitle), its own
  `.stage-inner`, its own SVG `.journey-path`, and its own `.nodes-layer`.
- Cards sit **on** the path: at load/resize, JS samples that thread's own `.journey-path`
  (`getPointAtLength`, 240 samples) and sets each node's `left` so the card centre lands on
  the curve at the card's vertical middle (viewBox units map linearly to stage fractions
  because `preserveAspectRatio="none"`; clamped so cards never overflow the stage). No-JS
  fallback: cards stay in the CSS centre column.
- Each prototype: summary card with tag, title, one-line purpose, result pills, "Explore →"
  call to action. Built prototypes are `<a>` links to their subpage; unbuilt ones are
  dashed-outline ghost cards with no link.
- Vertical placement is per node, via a `--node-top` custom property set inline on
  `.proto-node`. Stage height is per thread, via `--stage-h`. Neither is keyed by element
  ID, so adding a node or a thread needs no new CSS rule.

### Thread accent contract

Each thread sets six custom properties on its own wrapper; every accent-coloured rule
inside a thread reads those, never the global `--accent`. The global tokens stay orange
because the navigation bar, the background blobs and every other page depend on them.

| Property | Pump thread | Alignment thread |
|----------|-------------|------------------|
| `--t-accent` | `#ff6b2b` | `#9b7fe0` |
| `--t-accent-2` | `#e83535` | `#5a8fd8` |
| `--t-accent-soft` | `#ffb08a` | `#c3aef5` |
| `--t-glow` | `rgba(255,107,43,0.25)` | `rgba(155,127,224,0.28)` |
| `--t-border` | `rgba(255,107,43,0.18)` | `rgba(155,127,224,0.22)` |
| `--t-path` | `rgba(255,107,43,0.25)` | `rgba(155,127,224,0.28)` |

The path stroke is set in CSS from `--t-path`, **not** as a literal `stroke` attribute on
the SVG element — a hard-coded attribute would leave the second thread's curve orange.
Warning chips deliberately do **not** follow the accent: they stay red on both threads,
because on the violet thread `--t-accent-2` is blue and would read as information.

### Subpage contract

Each prototype's subpage is **co-located with that prototype's `PROTOTYPE.md` and media**,
so a folder stays one prototype and media references collapse to bare filenames.

| Prototype | Subpage |
|-----------|---------|
| proto-01 | `Prototype-1-Pump-Module/proto-01-5ul-4roller/index.html` |
| proto-02 | `Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/index.html` |
| Alignment module | `Prototype-2-Alignment-Module/index.html` — at **module root**, because this module's detail is not filed under a `proto-NN-<slug>/` subfolder |

Every subpage:

- links `assets/style.css` then `assets/prototype-page.css` (in that order), and only then
  its own small inline `<style>` for genuinely page-specific rules;
- puts the class `.proto-page` on its `<main>` element, with the optional accent modifier
  `.proto-page--align` for the violet family;
- carries a sticky `.nav-back` bar and an in-page `.proto-back` link, both pointing at the
  journey index;
- opens links to tools and to external suppliers in a new tab
  (`target="_blank" rel="noopener"`), so a reader never loses their place in the record.

Section order on a subpage: header block (eyebrow → title → status chips → one-line summary
→ meta line) → table of contents → `.detail-block` sections → optional lightbox. Pages with
maths load the local KaTeX fallback at `prototypes/katex/`; the alignment subpage has no
maths and loads none.

### Shared component vocabulary

`assets/prototype-page.css` is the single visual system behind all three subpages. Its
blocks: page shell and back link, header, prose and content blocks, tables, hero stat cards,
CSS bar chart, figures and inline SVG schematics, video, lightbox (`#lightbox`,
`#lightbox-img`, `#lightbox-close`), equations and worked-calculation blocks, chips,
callouts (good/warn/note), table of contents, collapsible version panels, next-prototype
brief, motion, responsive rules, print. Per-page accent flows through eight `--p-*`
properties (`--p-accent`, `--p-accent-2`, `--p-accent-soft`, `--p-glow`, `--p-border`,
`--p-tint`, `--p-fill`, `--p-edge`), which `.proto-page--align` overrides in one place.
Because the sticky navigation bar and the lightbox sit outside `<main>`, the same accent
block is mirrored onto `body:has(.proto-page--align)` so they tint too.

Images live in each prototype's own folder and are referenced by bare filename from that
prototype's subpage (e.g. `Prototype1_Real_Closed.jpg`, `pump-head-web.mp4`,
`AlignmentModuelHomingV2.1.png`).

## Animation Technique

- SVG `<path pathLength="1">` with `stroke-dasharray` CSS transition (NOT `stroke-dashoffset` — reversed in some browsers)
- **One `IntersectionObserver` per thread**, observing that thread's own `.stage-inner` and
  revealing only that stage's path and nodes. A single shared observer would reveal both
  threads the moment either one scrolled into view; every lookup in the reveal and the
  node-alignment routine is scoped to the thread, not to the document.
- Each observer fires once and disconnects
- Node pop-in via staggered `transition-delay` sequenced after path draw
- All motion inside `@media (prefers-reduced-motion: no-preference)` only — default CSS renders everything visible; JS guard handles the reduced-motion state at runtime
- Subpages use only the shared `fade-up` entrance with staggered `--delay`; no path drawing

## Mobile Behaviour (≤ 640px)

- SVG path hidden (`display: none`) and both stage heights released (`min-height: unset`)
- `.proto-node` reverts to `position: static`, full-width vertical stack; the alignment
  routine clears its inline `left` offsets so they do not leak back on resize up to desktop
- No horizontal scroll guaranteed at 320, 640, 1024 and 1440px viewports

## Prototype Registry

### Prototype-1-Pump-Module

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| proto-01 | 5 µL 4-roller peristaltic | Built — superseded by proto-02 | −32.2 % under-dispense; ≈3.39 µL/stroke (gravimetric); model validated to ~11 %; three design errors found (contact count, roller gap, head lock) |
| proto-02 | 5 µL 4-roller — corrected geometry + gap sweep | **v2.3 tested ✅** (2026-07-23) | Gap 1.52 mm measured and concentric; 76-replicate gravimetric campaign → **4.56 µL/stroke (−8.9 %), linear and calibratable**; best precision at 180 rpm; 100-stroke coefficient of variation 0.25 %, below the manual-pipette reference of 0.27 %; single-stroke variation bounded at about 6 % |

Subpages: `proto-01-5ul-4roller/index.html`, `proto-02-5ul-4roller-v2/index.html`.

### Prototype-2-Alignment-Module

Sample-rack indexing stage — it moves the samples under the nozzle, not the dispensing head.
This module's detail is filed at **module root** (`Prototype-2-Alignment-Module/PROTOTYPE.md`
and `Prototype-2-Alignment-Module/index.html`), not in a `proto-NN-<slug>/` subfolder like the
pump prototypes. Its versions are numbered V2 and V2.1 in the module's own scheme.

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| V2 | Rack-and-pinion sample-indexing stage | Built ✅ (2026-06-25) | Gravity-protected layout — motor and pusher mounted above the rail, so spills cannot reach the drive train. Indexes one rack at a time, reliably. Open-loop: no position reference |
| V2.1 | Homing microswitch + three-pass homing | Built ✅ (2026-07-30), bench-validated ✅ (2026-07-31) | Repeatable zero **no worse than ~0.03 mm** (the measurement sits at the resolution floor of the method); 102.0 half-steps/mm confirmed by measurement; full 132 mm home in **22 s**, down from 110 s, with no step loss. ⚠ Usable stroke ~140 mm against the 154 mm the 8-position pattern needs — the one unmet pass criterion; mechanical redesign to >170 mm pending |

Subpage: `Prototype-2-Alignment-Module/index.html`.

## Constraints

- Static site only — no build tools, no npm, no frameworks; must work offline via serve.bat and on GitHub Pages
- HTML is the content source of truth — no JSON/markdown fetch, no generator
- No CDN-only dependencies — all resources inline or local; the two pump subpages use the local KaTeX fallback at `prototypes/katex/`
- No horizontal scroll at 320, 640, 1024 and 1440px viewports (project hard rule)
- Page-specific styles inline in `<style>`; the shared prototype-subpage system lives in `assets/prototype-page.css`, and use of `../assets/style.css` tokens stays additive
- Thread and page accents flow through `--t-*` and `--p-*` properties — never by overriding the global `--accent`
- No cross-repo runtime links — prototype figures are transcribed directly into the HTML (published-site rule)
- No invented numbers: every measured value on a subpage traces to that prototype's `PROTOTYPE.md`, and values the source marks as not measured are shown as gaps rather than quietly omitted
- `Alignment_Module_V2.mp4` (~36 MB) is deliberately not linked from any page; it needs re-encoding first, the way `pump-head-web.mp4` was
