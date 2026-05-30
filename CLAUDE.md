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
├── assets/style.css        Shared stylesheet — imported by every page
├── tools/
│   ├── rotor-solver/
│   │   ├── index.html      Peristaltic Rotor Geometry Solver
│   │   └── SPEC.md         Tool spec — inputs, outputs, formulas, constants, assumptions
│   └── gsd-workflow-guide/
│       ├── index.html      GSD Workflow Guide — interactive diagram
│       └── SPEC.md         Tool spec — content, interaction model, layout constants
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
- **Font:** system-ui sans-serif stack (no CDN fonts)
- **Animations:** `fade-up` entrance with staggered `--delay`, hover lift + glow on cards

Each tool page links back to `../../index.html` via a `← All tools` nav bar and shares the blobs + animate-in pattern from the landing page.

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
- The only shared resource between tools is `assets/style.css`
- `SPEC.md` is the canonical reference; `.planning/phases/` context files point to it
- Keep `SPEC.md` in sync when formulas or constants change

---

## Key constraints

- No CDN-only dependencies — any external resource needs a local fallback
- No horizontal scroll on any page — table columns must wrap headers before adding scroll
- All calculation logic lives in inline `<script>` tags in the tool's `index.html`
- Tool-specific styles go in a `<style>` block inside the tool's HTML; shared styles go in `assets/style.css`

---

## Known VS Code pitfalls

**⚠ Do not use VS Code Live Preview to open HTML files in this project.**

Live Preview rewrites relative paths (`../../assets/style.css`, `../../index.html`) to internal `vscode-cdn.net` URLs and saves them back to disk, breaking the real site. It also strips inline `<script>` blocks on save.

`.vscode/settings.json` disables format-on-save for HTML project-wide to mitigate this, but Live Preview path rewriting can still occur if files are opened through its interface.

**Use `serve.bat` instead** — run it from the VS Code terminal (`.\serve.bat`) to get a clean local server at `http://localhost:7331` that doesn't touch the files.
