# Project orientation

DTU master's thesis tools site. One-person project, static HTML/CSS/JS only — no build tools, no npm, no frameworks. Must work offline from a USB drive and on GitHub Pages.

**Thesis:** Modular automated liquid dispensing for point-of-care use  
**Author:** Sirio Vittorio Feltrin · 2025–2026  
**Live URL:** https://sirsirio.github.io/thesis-tools/

---

## Folder structure

```
/
├── index.html              Landing page — links to all tools
├── assets/
│   ├── style.css           Shared stylesheet — imported by every page
│   ├── deck.css            Shared deck runtime (styles/transitions) — D-01 exception
│   ├── deck.js             Shared deck runtime (state machine) — D-01 exception
│   ├── prototype-page.css  Shared visual system for the prototype subpages — same D-01 exception as the deck runtime (three subpages, one system). Root class .proto-page; accent modifier .proto-page--align swaps orange → violet via eight --p-* properties
│   ├── fonts/
│   │   └── geist/
│   │       ├── Geist-Bold.woff2  Vendored, subsetted Geist Bold — landing-page headline only (D-20)
│   │       └── LICENSE.txt       SIL Open Font License 1.1 (mandatory to keep alongside a redistributed font)
│   └── gsap/
│       └── gsap.min.js     Vendored GSAP core, no plugins, no CDN — landing-page hero motif sync only (D-01/D-03 exception)
├── decks/
│   ├── index.html              Presentations index — card deal-out magic
│   └── <slug>/
│       ├── index.html          Slide deck HTML (flat <section class="slide"> sequence)
│       ├── SPEC.md             Deck spec — runtime structure, embedded tools, assumptions
│       └── assets/             Local deck assets (e.g., screenshots of external apps)
├── tools/
│   ├── rotor-solver/
│   │   ├── index.html      Peristaltic Rotor Geometry Solver
│   │   └── SPEC.md         Tool spec — inputs, outputs, formulas, constants, assumptions
│   ├── gsd-workflow-guide/
│   │   ├── index.html      GSD Workflow Guide — interactive diagram
│   │   └── SPEC.md         Tool spec — content, interaction model, layout constants
│   ├── thesis-timeline/
│   │   ├── index.html      Thesis Roadmap & Timeline — JS-driven Gantt (owner/status coded)
│   │   └── SPEC.md         Tool spec — data model, layout constants, key dates, assumptions
│   ├── peristaltic-tensioned-path-model/
│   │   ├── index.html      Tensioned Tube-Path & Stroke Volume Model
│   │   ├── SPEC.md         Tool spec — taut-path packet geometry, pre-strain corrections
│   │   └── katex/          KaTeX local fallback (copied from displaced-volume tool)
│   ├── peristaltic-roller-displaced-volume-model/
│   │   ├── index.html      Peristaltic Occlusion & Displaced-Volume Model (two-part)
│   │   ├── SPEC.md         Tool spec — inputs, formulas, assumptions, sources
│   │   ├── katex/          KaTeX local fallback (katex.min.css, katex.min.js, auto-render.min.js)
│   │   ├── stadium_cross_section.html         Source prototype (unstyled) — do not serve
│   │   ├── peristaltic_occlusion_model.html   Source prototype (unstyled) — do not serve
│   │   ├── stadium_model_documentation.md     Source documentation
│   │   └── Peristaltic roller occlusion & displaced-volume model - Description.md  Source notes
│   ├── system-architecture-explorer/
│   │   ├── index.html      System Architecture Explorer — whole-device architecture page: six-module hardware schema, design-direction gallery, driver/MCU/bus variant matrix (promoted from prototypes/System-Architecture/)
│   │   ├── SPEC.md         Tool spec — module schema, design directions, component prices, variant BOMs, comms-layer/power-rail model, assumptions
│   │   └── PIN-BUDGET-ANALYSIS.md  Permanent pin-budget cross-check — per-hardware signal map, GPIO-count + peripheral-instance ceilings, every overrun variant worked pin-by-pin, and a datasheet-verified component pinout audit (§7)
│   ├── dispense-throughput-simulator/
│   │   ├── index.html      Dispense Choreography & Throughput Simulator — configurable 6-liquid cocktail-pipeline scheduler for a 6-nozzle indexing line (32-sample rack); concurrency slider with A1/A2 endpoint markers, lockstep/independent mode toggle, row-per-station Gantt, bottleneck + A1-vs-A2 delta + throughput headline metrics, illustrative rack animation
│   │   └── SPEC.md         Tool spec — liquid/flow inputs, scheduling formulas (dose-time, LPT grouping, fill/steady/drain cycle count), rack-change convention, benchmark, assumptions
│   └── pump-testing/
│       ├── index.html      Pump Testing Protocol — document-first, two-layer dispensing-accuracy qualification page: top layer market-grade ISO 23783-2 gravimetric method + ISO 8655 pipette-equivalence benchmark (deep accuracy core + lighter go-to-market map, D-03), bottom layer the actual proto-02 test protocol + justified deviations (D-04). No calculator (D-01)
│       ├── SPEC.md         Tool spec — protocol structure, formulas (mass→volume Z-factor, CV, uncertainty), balance/environment constants, deviation-table sources, assumptions
│       └── katex/          KaTeX local fallback (katex.min.css, katex.min.js, auto-render.min.js), copied from the displaced-volume-model precedent
├── prototypes/
│   ├── index.html              Prototype Design Space — journey index only, no detail views. Two module threads (pump = orange, alignment = violet), each with its own S-curve, node set, accent (--t-* properties) and IntersectionObserver. Cards link out to the subpages
│   ├── SPEC.md                 Tool spec — thread model, subpage contract, animation technique, prototype registry
│   ├── PROTOTYPES.md           Shallow prototype registry (scan before opening deep PROTOTYPE.md)
│   ├── REQUIREMENTS-CRITERIA.md  Device requirements (binary) + weighted criteria — canonical concept-evaluation table
│   ├── katex/                  KaTeX local fallback (katex.min.css, katex.min.js, auto-render.min.js, fonts/) shared by both pump subpages
│   ├── Prototype-1-Pump-Module/
│   │   ├── proto-01-5ul-4roller/
│   │   │   ├── index.html      Proto-01 subpage — 5 µL 4-roller baseline
│   │   │   ├── PROTOTYPE.md    Proto-01 deep detail — design params, test forward-links, version log
│   │   │   └── Prototype1_*.{png,jpg}  CAD renders, real-build photos, geometry diagram, tool screenshots
│   │   ├── proto-02-5ul-4roller-v2/
│   │   │   ├── index.html            Proto-02 subpage — corrected geometry + gap sweep, v2.3 tested (uses ../../katex/)
│   │   │   ├── PROTOTYPE.md          Proto-02 deep detail — corrected geometry + gap sweep
│   │   │   ├── TEST-PROTOCOL.md      ISO 23783-2-adapted gravimetric method for this prototype
│   │   │   ├── TEST-RESULTS.md       v2.3 gravimetric campaign results
│   │   │   ├── pump-head-web.mp4     Re-encoded pump-head clip (H.264, portrait, ~1.7MB) — landing-page proof video
│   │   │   └── pump-head-poster.jpg  Poster frame for the pump-head clip
│   │   ├── Tube OD Thikness/
│   │   │   └── tube-wall-thickness-analysis.md  Tube wall measurement & validation
│   │   └── multi-liquid-architecture/
│   │       └── ARCHITECTURE-DECISION.md  Multi-pump scaling study (A vs C) — not a proto-NN; feeds proto-04
│   ├── Prototype-2-Alignment-Module/    Detail lives at MODULE ROOT — no proto-NN-<slug>/ subfolder for this module
│   │   ├── index.html          Alignment module subpage (violet, .proto-page--align) — V2 stage + V2.1 homing, written from PROTOTYPE.md
│   │   ├── PROTOTYPE.md        Alignment module deep detail — V2 rack-indexing stage, V2.1 bench-validated homing, open gaps
│   │   ├── AlignmentModuelHomingV2.1.png  V2.1 bench photo — hero image of the subpage
│   │   └── Alignment_Module_V2.mp4        V2 in motion, ~36 MB — deliberately NOT linked from any page; needs re-encoding first
│   └── System-Architecture/
│       ├── ARCHITECTURE.md         Fixed components, open questions, driver-vs-MCU verdict — trimmed to pointers into the tool's #theory
│       ├── PUMP-CONTROL-CONCEPTS.md  Comms-layer reasoning — trimmed to pointers into the tool's #theory
│       └── SOLUTION-MATRIX.md      Reference snapshot of the variant matrix — tool is authoritative (index.html removed, moved to tools/system-architecture-explorer/)
├── .planning/              GSD planning workspace (workflow artifacts)
│   ├── PROJECT.md          Project context and core value
│   ├── REQUIREMENTS.md     Active requirements with IDs
│   ├── ROADMAP.md          Active phases
│   ├── STATE.md            Current progress and session continuity
│   └── phases/
│       └── 01-motor-microstepping-panel/
│           ├── 01-CONTEXT.md        Phase implementation decisions
│           └── 01-DISCUSSION-LOG.md Audit trail
├── openspec/               Empty — historical OpenSpec folder, kept for git history
├── CLAUDE.md               This file — keep it updated
├── README.md               GitHub-facing project description and tool table
└── ROADMAP.md              Shipped / planned / backlog tools (repo-level)
```

---

## Design system

Dark glassmorphic theme. See `assets/style.css` for all tokens.

- **Background:** `#0a0a0c`
- **Accent:** `#ff6b2b` (orange) → `#e83535` (red)
- **Glass cards:** `rgba(255,255,255,0.04)` background, `backdrop-filter: blur(24px)`, orange border
- **Text:** `#f0ece8` primary · `#7a7068` muted
- **Font:** system-ui sans-serif stack (no CDN fonts) for body text everywhere. The landing page (`index.html`) only additionally vendors **Geist Bold** (self-hosted `@font-face`, subsetted, SIL OFL 1.1) for its `.site-title` headline — body text on the landing page stays `system-ui` like every other page.
- **Animations:** `fade-up` entrance with staggered `--delay`, hover lift + glow on cards. The landing page's hero motif additionally uses locally-vendored **GSAP core** (`assets/gsap/gsap.min.js`, no plugins, no CDN) to drive one synchronized animation timeline (rotor rotation + liquid-slug highlight) — a D-01/D-03 exception approved specifically for that motif; every other page's motion stays hand-built CSS/SVG.

- **Per-thread accent (prototype pages only):** the Prototype Design Space journey carries **two accent families** — the pump thread stays orange → red, the alignment thread is violet → indigo-blue (`#9b7fe0` → `#5a8fd8`, already proven on `tools/pump-testing/`). This is **scoped to those pages** and does **not** change the global accent: threads set `--t-*` properties on the thread wrapper, prototype subpages set `--p-*` properties on `.proto-page` (with `.proto-page--align` for violet). Never override the global `--accent` for this — the nav, the background blobs and every other page depend on it staying orange. Note `--glass-border` is itself orange-tinted, so a card that only swaps `--accent` still reads orange at its border.

Each tool page links back to `../../index.html` via a `← All tools` nav bar and shares the blobs + animate-in pattern from the landing page.

`tools/pump-testing/` is a document-first, no-calculator (D-01) exception to the "enter your parameters and get answers" tool pattern: a citable, two-layer protocol page — top layer the market-grade dispensing-accuracy qualification (deep ISO 23783-2 gravimetric + ISO 8655 pipette-equivalence core, lighter go-to-market map, D-03), bottom layer the actual proto-02 test protocol and its justified deviations from the ideal. No interactive calculator or planner is built for this tool.

---

## Development workflow (GSD)

New tools and enhancements follow this sequence:

1. `/gsd:discuss-phase N` — gather implementation decisions; produces `CONTEXT.md`
2. `/gsd:plan-phase N` — create execution plan from context
3. `/gsd:execute-phase N` — implement from the plan
4. Add/update the tool's `SPEC.md` in its folder
5. Add a row to `README.md` tool table and `ROADMAP.md` (repo root)
6. Update `CLAUDE.md` folder structure if new files were added

**One phase = one tool (or one meaningful enhancement).** New phases are added to `.planning/ROADMAP.md` on demand — not pre-committed.

The `openspec/` folder is now empty — historical artifacts were ingested into `.planning/` and removed. Folder retained for git history.

---

## Tool spec standard

Every tool has a `SPEC.md` file co-located with its `index.html`:

```
tools/<tool-name>/
  index.html   — the tool itself
  SPEC.md      — permanent spec: purpose, inputs, outputs, formulas, constants, assumptions
```

**What goes in SPEC.md:**
- Purpose and scope
- All inputs with types, ranges, and defaults
- All outputs with formulas written out explicitly
- Hardware constants or lookup tables the tool relies on (e.g., motor specs)
- Assumptions (e.g., 180° contact arc, tube availability)
- Known values at the current design point

**Rules:**
- Tool-specific constants and formulas live in `SPEC.md` and inline in the tool's `<script>` — **not** in shared files
- The shared resources between pages are `assets/style.css`, the presentation deck runtime (`assets/deck.css`, `assets/deck.js` — a sanctioned D-01 exception for reuse across one-shot decks), `assets/prototype-page.css` (shared visual system for the prototype subpages — sanctioned on exactly the deck-runtime precedent: three subpages sharing one system, so the CSS lives once rather than being copied three times), and `assets/fonts/` (vendored web fonts, precedent: `assets/fonts/geist/`) and `assets/gsap/gsap.min.js` (vendored GSAP core, referenced only by the landing page's hero motif, D-01/D-03 exception). `assets/fonts/` is a sanctioned shared-asset location going forward — future vendored fonts belong there, not in a tool-local folder
- `SPEC.md` is the canonical reference; `.planning/phases/` context files point to it
- Keep `SPEC.md` in sync when formulas or constants change

---

## Key constraints

- No CDN-only dependencies — any external resource needs a local fallback
- No horizontal scroll on any page — table columns must wrap headers before adding scroll
- All calculation logic lives in inline `<script>` tags in the tool's `index.html` (except for the deck runtime exception)
- Tool-specific styles go in a `<style>` block inside the tool's HTML; shared styles go in `assets/style.css` and `assets/deck.css`

---

## Known VS Code pitfalls

**⚠ Do not use VS Code Live Preview to open HTML files in this project.**

Live Preview rewrites relative paths (`../../assets/style.css`, `../../index.html`) to internal `vscode-cdn.net` URLs and saves them back to disk, breaking the real site. It also strips inline `<script>` blocks on save.

`.vscode/settings.json` disables format-on-save for HTML project-wide to mitigate this, but Live Preview path rewriting can still occur if files are opened through its interface.

**Use `serve.bat` instead** — run it from the VS Code terminal (`.\serve.bat`) to get a clean local server at `http://localhost:7331` that doesn't touch the files.
