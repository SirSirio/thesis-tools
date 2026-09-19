# Project orientation

DTU master's thesis tools site. One-person project, static HTML/CSS/JS only — no build tools, no npm, no frameworks. Must work offline from a USB drive and on GitHub Pages.

**Thesis:** Modular automated liquid dispensing for point-of-care use  
**Author:** Sirio Vittorio Feltrin · 2025–2026  
**Live URL:** https://sirsirio.github.io/thesis-tools/

---

## Folder structure

```
/
├── index.html              Landing page — showcase of the finished instrument: opening, problem, the machine with leader-line callouts, a seven stop journey with the tools anchored to the module each one served, and the method. EN/IT strings, Italian pass pending
├── assets/
│   ├── style.css           Shared stylesheet — imported by every page
│   ├── site.css            Shared site frame (Sept 2026 showcase redesign), loaded after style.css on every page: new tokens, the Geist display face for h1 and h2, the water background wash that restyles the existing .bg-blobs markup, the sticky nav, the Instruments panel, the footer, .reveal, the pill buttons and the 28px tool marks. Sanctioned shared file, same exception class as the deck runtime
│   ├── site-nav.js         Shared frame behaviour, loaded in <head> with no defer: single source of truth for the tools list, renders the Instruments panel into #instr-panel with every href prefixed by the nav's data-root, drives the .reveal observer, exposes window.ThesisTools. Dependency free
│   ├── FRAME-SNIPPET.html  Documentation only, never served and never linked: the exact frame markup to paste at each folder depth, plus the rules that go with it
│   ├── deck.css            Shared deck runtime (styles/transitions) — D-01 exception
│   ├── deck.js             Shared deck runtime (state machine) — D-01 exception
│   ├── prototype-page.css  Shared visual system for the prototype subpages — same D-01 exception as the deck runtime (several prototype subpages, one system). Root class .proto-page; accent modifiers .proto-page--align (orange to violet) and .proto-page--nozzle (orange to teal-blue) swap the eight --p-* properties
│   ├── fonts/
│   │   ├── geist/
│   │   │   ├── Geist-Bold.woff2  Vendored, subsetted Geist Bold — the display face, declared in site.css and used for h1 and h2 on every page (D-20)
│   │   │   └── LICENSE.txt       SIL Open Font License 1.1 (mandatory to keep alongside a redistributed font)
│   │   └── montserrat/
│   │       ├── montserrat.css    @font-face declarations (weights 400–700, latin + latin-ext) — used only by the archived UI-prototype home studies
│   │       ├── Montserrat-VF-latin.woff2      Vendored variable font, latin subset (Google Fonts v31)
│   │       ├── Montserrat-VF-latin-ext.woff2  Vendored variable font, latin-ext subset
│   │       └── LICENSE.txt       SIL Open Font License 1.1
│   ├── media/              Web-sized copies of the thesis photos and renders, used by the landing page, the prototype records and the instruments index. Masters stay in the thesis folders
│   │   ├── device/         The assembled instrument: outside and inside views, electronics bay, battery cradle, carriers, outdoor shot, validation-run frames
│   │   ├── pump/           Pump module: proto-01 open and closed, v2.3 render, integrated carriers, gravimetric bench, disassembly
│   │   ├── alignment/      Alignment module: concept sketch sheets, rack, motor holder, V2.1 homing photo, V3 chassis renders and annotated views
│   │   ├── nozzle/         Nozzle module: needle assortment, carrier and holder renders, as-built and mounted views, lines over the rack
│   │   ├── ui/             Operator interface: screen captures and the display holder, on the bench and in CAD
│   │   ├── storage/        Reagent storage: cartridge, sleeve, needle holder
│   │   ├── method/         Method shots: calibration rings, shrink bars, proto-01 circuit
│   │   └── video/          H.264 web clips, muted, each beside its -poster.jpg: pump-head, droplet-slowmo, alignment-v2, pump-gravimetric. machine-dispensing.mp4 is a reserved slot, that clip is not filmed yet
│   └── gsap/
│       └── gsap.min.js     Vendored GSAP core, no plugins, no CDN — landing-page hero motif sync only (D-01/D-03 exception)
├── decks/
│   ├── index.html              Presentations index — card deal-out magic
│   └── <slug>/
│       ├── index.html          Slide deck HTML (flat <section class="slide"> sequence)
│       ├── SPEC.md             Deck spec — runtime structure, embedded tools, assumptions
│       └── assets/             Local deck assets (e.g., screenshots of external apps)
├── tools/
│   ├── index.html          Instruments, the plain index of every tool and record, grouped Pump, Electronics, Interface, Method, Records. Works with JavaScript off; the Instruments panel in the nav renders the same list from site-nav.js
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
│   ├── pump-testing/
│   │   ├── index.html      Pump Testing Protocol — document-first, two-layer dispensing-accuracy qualification page: top layer market-grade ISO 23783-2 gravimetric method + ISO 8655 pipette-equivalence benchmark (deep accuracy core + lighter go-to-market map, D-03), bottom layer the actual proto-02 test protocol + justified deviations (D-04). No calculator (D-01)
│   │   ├── SPEC.md         Tool spec — protocol structure, formulas (mass→volume Z-factor, CV, uncertainty), balance/environment constants, deviation-table sources, assumptions
│   │   └── katex/          KaTeX local fallback (katex.min.css, katex.min.js, auto-render.min.js), copied from the displaced-volume-model precedent
│   └── ui-prototypes/
│       ├── index.html      Operator Interface Prototypes — the UI design record published as live artifacts: index page with scaled inert-iframe previews of the five rounds, two-arc framing (rounds 1–3 designed the interface, rounds 4–5 revisited the home screen after use). Document/artifact page, no calculator (D-01). English-only. Thesis ch. 9 prints this page's address — path frozen
│       ├── SPEC.md         Tool spec — the address contract, artifact table with frozen dates, verbatim rule, the two permitted mechanical edits (vendored Montserrat, back-links), preview technique
│       └── rounds/         The five design-record HTML artifacts, copied verbatim — DO NOT EDIT (dated thesis evidence; see SPEC.md)
├── prototypes/
│   ├── index.html              Prototype Design Space — journey index only, no detail views. Three module threads (pump = orange, alignment = violet, nozzle = teal-blue), each with its own curve, node set, accent (--t-* properties) and IntersectionObserver, converging into one wide Integration node. Cards link out to the records
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
│   │   ├── Alignment_Module_V2.mp4        V2 in motion, ~36 MB — deliberately NOT linked from any page; the web copy lives at assets/media/video/alignment-v2.mp4
│   │   └── v3-two-axis-chassis/
│   │       └── index.html      V3 subpage, the two-axis chassis: input queue, dispensing lane, output tray. Written from the V3 section appended to the module PROTOTYPE.md; no PROTOTYPE.md of its own
│   ├── Prototype-3-Nozzle-Module/    Detail lives at MODULE ROOT, like the alignment module
│   │   ├── index.html          Nozzle module subpage (teal-blue thread): six-needle carrier, vibration release, the droplet-release clip at #droplet-video
│   │   └── PROTOTYPE.md        Nozzle module deep detail: inherited concept, rebuild, integration on the chassis, forty-tube validation, open gaps
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
├── mocks/                  Working files from the Sept 2026 redesign, not served pages: three direction mocks (engineering sheet, cinematic product, industrial catalogue) and the tool-marks study. Safe to delete in a later cleanup
├── CLAUDE.md               This file — keep it updated
├── README.md               GitHub-facing project description and tool table
└── ROADMAP.md              Shipped / planned / backlog tools (repo-level)
```

---

## Design system

Dark glassmorphic theme, restated in September 2026 as a calm showcase with water as the underlying metaphor. Base tokens live in `assets/style.css`; the frame tokens added by the redesign live in `assets/site.css`, which every page loads second.

- **Background:** `#0a0a0c` with the water wash. `site.css` restyles the three `.bg-blobs` elements that every page already carried into one slow wash: a warm orange radial at the top left, a red radial at the bottom right, and a deep blue undertone (`--cool: #14203f`) sitting low and off centre. Blurred 120px, drifting over 44 to 52 s, frozen under `prefers-reduced-motion`. The blue is background only, never on text or on a control
- **Accent:** `#ff6b2b` (orange) → `#e83535` (red)
- **Glass cards:** `rgba(255,255,255,0.04)` background, `backdrop-filter: blur(24px)`, orange border
- **Text:** `#f0ece8` primary · `#7a7068` muted
- **Font:** system-ui sans-serif stack (no CDN fonts) for body text on every page. Display type is **Geist Bold**, self-hosted and subsetted (SIL OFL 1.1), declared once in `assets/site.css` as `--display` and used for h1 and h2 on every page, not only the landing page. Numbers and callout labels use the `--mono` stack, tabular. Body text stays `system-ui` everywhere.
- **Shared frame:** every page loads `assets/style.css`, then `assets/site.css`, then `assets/site-nav.js` in the head with no defer, and carries the same markup: the three-element `.bg-blobs` wash, a sticky 64px glass nav with `data-root` set to the relative path back to the repo root, the `#instr-panel` anchor and the shared footer. `assets/FRAME-SNIPPET.html` holds that markup at each folder depth plus the rules that go with it. Page-specific CSS and JS still stay inline in the page.
- **Navigation:** the **Instruments panel** in the nav is the site tool navigation. `assets/site-nav.js` owns the single tools list and renders the panel from it, grouped Pump, Electronics, Interface, Method and Records, one 28px tool mark and one line of purpose per row. `tools/index.html` is the same list as a plain page that works with JavaScript off. The old per page `← All tools` bar is retired.
- **Radius scale:** `--r-lg: 28px` for media frames and large panels, `--r-md: 18px` for cards and tiles, `--r-sm: 10px` for inputs and chips, `--r-pill` for buttons and pills. Nothing sharp on the landing page, the prototypes river or the instruments index; tool pages keep their own inner components as they are.
- **Motion tokens:** one easing curve everywhere, `--ease: cubic-bezier(.22,.68,0,1)`, with `--dur: 480ms` for reveals and `--dur-fast: 220ms` for hover. `.reveal` blocks fade in once with a 14px lift through the IntersectionObserver in `site-nav.js`. Videos are muted, carry a poster and play only while in view. Everything is gated by `prefers-reduced-motion`.
- **Animations:** `fade-up` entrance with staggered `--delay`, hover lift + glow on cards. The landing page's hero motif additionally uses locally-vendored **GSAP core** (`assets/gsap/gsap.min.js`, no plugins, no CDN) to drive one synchronized animation timeline (rotor rotation + liquid-slug highlight) — a D-01/D-03 exception approved specifically for that motif; every other page's motion stays hand-built CSS/SVG.

- **Per-thread accent (prototype pages only):** the Prototype Design Space river carries **three accent families**, one per module thread: pump orange to red (`#ff6b2b` to `#e83535`), alignment violet to indigo-blue (`#9b7fe0` to `#5a8fd8`, also used on `tools/pump-testing/`), nozzle teal to blue (`#4fb3c8` to `#3a7bd5`). This is **scoped to those pages** and does **not** change the global accent: threads set `--t-*` properties on the thread wrapper, prototype subpages set `--p-*` properties on `.proto-page` (`.proto-page--align` for violet, `.proto-page--nozzle` for teal-blue). Never override the global `--accent` for this: the nav, the background wash and every other page depend on it staying orange. Note `--glass-border` is itself orange-tinted, so a card that only swaps `--accent` still reads orange at its border. The Integration node where the three threads meet keeps the global orange, because it is the whole machine.

Every page joins the shared frame instead of rolling its own header: the sticky nav with the Instruments panel carries the way back to the landing page and out to any tool, the background wash and the footer are the same everywhere, and the tool calculators and content sit untouched inside it.

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
- The sanctioned shared files, and only these, are:
  - `assets/style.css`, the base stylesheet every page imports
  - `assets/site.css` and `assets/site-nav.js`, the site frame every page loads after it (tokens, display face, background wash, nav, Instruments panel, footer, reveal helper, tool marks), documented by `assets/FRAME-SNIPPET.html`. Same exception class as the deck runtime: one frame shared by every page beats the same header copied into twenty files
  - the presentation deck runtime, `assets/deck.css` and `assets/deck.js`, a sanctioned D-01 exception for reuse across one-shot decks
  - `assets/prototype-page.css`, the shared visual system for the prototype subpages, sanctioned on exactly the deck-runtime precedent: several subpages share one system, so the CSS lives once rather than being copied per page
  - `assets/fonts/`, vendored web fonts (precedent: `assets/fonts/geist/`). This is the shared-asset location going forward; future vendored fonts belong there, not in a tool-local folder
  - `assets/gsap/gsap.min.js`, vendored GSAP core, referenced only by the landing page hero motif (D-01/D-03 exception)
  - `assets/media/`, the web-sized photos, renders and clips shared by the landing page, the prototype records and the instruments index
- Everything else stays inline in the page that uses it
- `SPEC.md` is the canonical reference; `.planning/phases/` context files point to it
- Keep `SPEC.md` in sync when formulas or constants change

---

## Key constraints

- No CDN-only dependencies — any external resource needs a local fallback
- No horizontal scroll on any page — table columns must wrap headers before adding scroll
- All calculation logic lives in inline `<script>` tags in the tool's `index.html` (the shared exceptions are the deck runtime and `assets/site-nav.js`, which only renders the frame)
- Tool-specific styles go in a `<style>` block inside the tool's HTML; shared styles go in `assets/style.css`, `assets/site.css` and `assets/deck.css`
- Every new page joins the shared frame by pasting the markup from `assets/FRAME-SNIPPET.html` at the right folder depth, and sets `data-root` on the nav accordingly

---

## Known VS Code pitfalls

**⚠ Do not use VS Code Live Preview to open HTML files in this project.**

Live Preview rewrites relative paths (`../../assets/style.css`, `../../index.html`) to internal `vscode-cdn.net` URLs and saves them back to disk, breaking the real site. It also strips inline `<script>` blocks on save.

`.vscode/settings.json` disables format-on-save for HTML project-wide to mitigate this, but Live Preview path rewriting can still occur if files are opened through its interface.

**Use `serve.bat` instead** — run it from the VS Code terminal (`.\serve.bat`) to get a clean local server at `http://localhost:7331` that doesn't touch the files.
