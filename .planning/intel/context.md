# Context

Background and orientation notes extracted from DOC-classified documents. Each topic is attributed to its source.

---

## Topic: Project identity and scope

source: CLAUDE.md, README.md

DTU master's thesis tools site. Author: Sirio Vittorio Feltrin. Thesis title: "Modular Automated Liquid Dispensing for Point-of-Care Use". Timeframe: 2025–2026. Live URL: https://sirsirio.github.io/thesis-tools/

The device under development combines a peristaltic pump (NEMA17 stepper, rotating peristaltic head, Sensirion flow sensor) with a modular fluidic interface for point-of-care diagnostics. The tools support design decisions made during the thesis and are cited in the written work with QR codes linking to the live site.

The site is a one-person project. Each tool is a self-contained HTML/JS page — no installation, no build step, no internet required.

---

## Topic: Folder structure

source: CLAUDE.md

```
/
├── index.html              Landing page — links to all tools
├── assets/style.css        Shared stylesheet — imported by every page
├── tools/
│   └── rotor-solver/
│       └── index.html      Peristaltic Rotor Geometry Solver
├── openspec/               OpenSpec specs (one subfolder per tool)
├── CLAUDE.md               Project orientation file
├── README.md               GitHub-facing project description and tool table
└── ROADMAP.md              Shipped / planned / backlog tools
```

---

## Topic: Design system

source: CLAUDE.md

Dark glassmorphic theme. Key tokens:
- Background: #0a0a0c
- Accent: #ff6b2b (orange) to #e83535 (red)
- Glass cards: rgba(255,255,255,0.04) background, backdrop-filter blur(24px), orange border
- Text: #f0ece8 primary, #7a7068 muted
- Font: system-ui sans-serif stack (no CDN fonts)
- Animations: fade-up entrance with staggered --delay, hover lift + glow on cards

Each tool page links back to ../../index.html via a nav bar and shares the blobs and animate-in pattern from the landing page.

---

## Topic: Development workflow (OpenSpec)

source: CLAUDE.md, README.md

New tools follow the OpenSpec spec-driven sequence:
1. /opsx:propose — generates proposal, specs, design, tasks under openspec/changes/ and creates a feature/<name> git branch automatically
2. Discuss and refine the spec before touching any code
3. /opsx:apply — switches to feature/<name> and implements from the spec
4. Add a row to README.md and ROADMAP.md
5. /opsx:archive — move spec to openspec/changes/archive/
6. Merge feature/<name> into master and delete the branch
7. Update CLAUDE.md folder structure if new files were added

Branch convention: feature/<change-name> (kebab-case, matches the OpenSpec change name).

---

## Topic: Shipped tools

source: ROADMAP.md, README.md

Peristaltic Rotor Geometry Solver (tools/rotor-solver/index.html) — Status: Live.
Solves rotor radius analytically for a target stroke volume. Checks roller collision, hub clearance, and tube length feasibility across roller counts 3–12.

---

## Topic: Planned / Backlog tools

source: ROADMAP.md

Planned: (none formally specified yet — placeholder row in ROADMAP.md)
Backlog ideas:
- Flow sensor calibration curve viewer
- Dispense protocol calculator (multi-step sequences)
- Tube occlusion efficiency estimator from gravimetric data
- Bill of materials / component selector

---

## Topic: In-progress features (active OpenSpec changes)

source: openspec/changes/language-switcher-eng-it/proposal.md, openspec/changes/motor-microstepping-panel/proposal.md

Feature 1 — Language Switcher (ENG/IT):
The thesis tools site is authored by an Italian student at DTU and may be shared with Italian-speaking collaborators, supervisors, or family. The switcher lets the same static site serve both English (primary academic language) and Italian audiences without maintaining separate pages.

Feature 2 — Motor & Microstepping Panel:
The rotor solver outputs geometry but gives no guidance on whether a given stepper motor and microstepping mode can drive the rotor. The motor panel closes this gap so Proto 1 operating-point decisions can be made from calculated data rather than guesswork. Target hardware: Wantai 42BYGHW811 stepper with DRV8825 driver.

---

## Topic: VS Code pitfalls

source: CLAUDE.md

Do not use VS Code Live Preview to open HTML files. Live Preview rewrites relative paths (../../assets/style.css, ../../index.html) to internal vscode-cdn.net URLs and saves them back to disk, breaking the real site. It also strips inline <script> blocks on save.

Use serve.bat instead — run it from the VS Code terminal (.\serve.bat) to get a clean local server at http://localhost:7331.

.vscode/settings.json disables format-on-save for HTML project-wide to mitigate accidental rewrites.

---

## Topic: Language switcher — known risks and trade-offs

source: openspec/changes/language-switcher-eng-it/design.md

- Translation coverage drift: if new text is added to a page without a data-i18n key, it silently stays in English. Mitigation: task checklist includes an audit step before marking done.
- Per-page dictionaries: Italian strings must be maintained in each page separately. Acceptable given small page count; revisit if pages grow beyond ~5.
- localStorage unavailable (private browsing, USB kiosk): applyLang defaults to English silently. Mitigation: wrap in try/catch, fall back to 'en'.

---

## Topic: Language switcher — migration plan and rollback

source: openspec/changes/language-switcher-eng-it/design.md

Order of implementation:
1. Add toggle button + inline JS to index.html
2. Add toggle button + inline JS to tools/rotor-solver/index.html
3. Add toggle button style to assets/style.css
4. Manual smoke-test both pages: switch, reload, confirm persistence
5. Commit and push; GitHub Pages auto-deploys

Rollback: revert the commit — no data migration needed.
