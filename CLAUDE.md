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
│   └── rotor-solver/
│       └── index.html      Peristaltic Rotor Geometry Solver
├── openspec/               OpenSpec specs (one subfolder per tool)
├── CLAUDE.md               This file — keep it updated
├── README.md               GitHub-facing project description and tool table
└── ROADMAP.md              Shipped / planned / backlog tools
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

## Spec-driven workflow (OpenSpec)

New tools follow this sequence:

1. `/opsx:propose "Tool name and idea"` — generates proposal, specs, design, tasks under `openspec/changes/` **and creates a `feature/<name>` git branch automatically**
2. Discuss and refine the spec before touching any code
3. `/opsx:apply` — switches to `feature/<name>` and implements from the spec
4. Add a row to `README.md` tool table and `ROADMAP.md`
5. `/opsx:archive` — move spec to `openspec/changes/archive/`
6. Merge `feature/<name>` into `master` and delete the branch
7. Update `CLAUDE.md` folder structure if new files were added

**Branch convention:** `feature/<change-name>` (kebab-case, matches the OpenSpec change name)

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
