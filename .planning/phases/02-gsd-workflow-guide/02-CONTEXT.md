# Phase 2: GSD Workflow Guide - Context

**Gathered:** 2026-05-30
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a new standalone tool page at `tools/gsd-workflow-guide/index.html` that renders the GSD spec-driven development workflow as an interactive visual diagram. The page is linked from the landing page and follows all existing site conventions. It serves as both a personal reference and a thesis showcase demonstrating that spec-driven development was used throughout the project.

</domain>

<decisions>
## Implementation Decisions

### Diagram Rendering
- **D-01:** Nodes are HTML `<div>` elements with inline styles following the glassmorphic design system (glass-panel pattern, orange accent border, `#0a0a0c` background)
- **D-02:** Connecting arrows are CSS-only — pseudo-elements, border tricks, or clip-path. No external libraries, no SVG layer, no canvas
- **D-03:** The diagram must look polished and match the established dark glassmorphic theme (accent `#ff6b2b`, muted text `#7a7068`, glass cards `rgba(255,255,255,0.04)`, `backdrop-filter: blur(24px)`)

### Interactivity
- **D-04:** Each command node shows: command name + a very brief one-line description (always visible)
- **D-05:** Clicking a node expands it in-place (the node grows downward) to reveal a full description + the exact slash command to type (e.g., `/gsd:discuss-phase 2`)
- **D-06:** Expand/collapse is a CSS height/opacity transition triggered by a class toggle in inline JS — no library
- **D-07:** Only one node can be expanded at a time (clicking a second node collapses the first) OR multiple nodes can stay open simultaneously — **Claude's discretion**

### Content Scope
- **D-08:** Full picture — three content areas:
  1. **Core loop** (main flow): `discuss-phase` → `plan-phase` → `execute-phase`
  2. **Optional steps** (branches off the core loop): `spec-phase` (before discuss), `verify-work` (after execute), `code-review` (after verify), `ship` (after all phases done)
  3. **Utility commands sidebar**: `progress`, `quick`, `fast`, `debug`, `capture`
- **D-09:** No project lifecycle overview (new-project → roadmap) — keep scope tight; that's a separate capability

### Page Structure
- **D-10:** Full explanation header section before the diagram — paragraph-length explanation of spec-driven development and that this workflow was used throughout the thesis project
- **D-11:** Tool folder: `tools/gsd-workflow-guide/` → `tools/gsd-workflow-guide/index.html`
- **D-12:** No EN/IT language toggle — new tools going forward do not get the language switcher added (existing pages keep theirs)

### Diagram Layout
- **Claude's Discretion:** Choose top-to-bottom vs left-to-right based on which makes the full-picture content (core loop + optional branches + utility sidebar) most readable. No viewport constraint preference expressed.

### Claude's Discretion
- Single vs multiple nodes expanded simultaneously — pick whichever feels more natural for a reference diagram
- Diagram layout direction (top-to-bottom or left-to-right) — pick for readability of full content
- Exact visual treatment of optional branches vs core path (dashed border? muted color? "optional" label?) — follow glassmorphic design language

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `assets/style.css` — All shared CSS tokens (background, accent, glass card pattern, radius, animations). Tool-specific styles go in inline `<style>` block only — do NOT modify this file.

### Existing Tool Pattern (reference implementation)
- `tools/rotor-solver/index.html` — Canonical example of tool page structure: nav bar with `← All tools` back-link, tool header with gradient h1, glass-panel sections, inline `<style>` + `<script>`. Copy this structural pattern.

### Landing Page (integration point)
- `index.html` — Add a new tool card here (duplicate the existing rotor-solver card block, update href, title, description). The card grid already handles multiple tools.

### Project Conventions
- `CLAUDE.md` — Key constraints: no CDN-only deps, no horizontal scroll, inline logic only, no new shared files, no `assets/style.css` changes. Also contains the VS Code Live Preview warning (use `serve.bat` instead).

### No external specs — requirements will be fully captured in planning from decisions above

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.glass-panel` pattern (from `tools/rotor-solver/index.html`): `background: rgba(255,255,255,0.035)`, `border: 1px solid rgba(255,107,43,0.15)`, `border-radius: var(--radius)`, `backdrop-filter: blur(24px)` — use for node cards
- `.tool-nav` bar: flex row with `← All tools` link, tool name span, and (on rotor solver) the lang toggle span — copy this, omit the lang toggle span
- `.tool-header h1`: gradient text (`background: linear-gradient(130deg, #ffffff 35%, var(--accent) 100%)`), clamp font-size — use for page title
- `animate-in` + `--delay` CSS animation pattern: staggered entrance for page elements — apply to diagram nodes
- `bg-blobs` ambient background: three positioned divs for glassmorphism depth — copy from any existing page

### Established Patterns
- All calculation/interaction logic lives in a single inline `<script>` block at the bottom of `<body>`
- Tool-specific styles live in a single `<style>` block in `<head>`, after the `<link>` to `assets/style.css`
- No `id` collisions with shared CSS — tool-specific class names don't overlap with shared tokens

### Integration Points
- `index.html` tool grid: add a new `<a href="tools/gsd-workflow-guide/index.html" class="tool-card animate-in">` block inside `.tools-grid`
- `README.md` tool table: add a new row (repo-level, not a blocker for the tool itself)

</code_context>

<specifics>
## Specific Ideas

- User described the node UX as: "the name and a very brief description [always visible], but if I click on them they expand and a more detailed description appears" — this is the canonical interaction model
- The tool should serve as a thesis showcase artifact: it demonstrates that spec-driven development (GSD) was the development methodology used for the thesis tools site

</specifics>

<deferred>
## Deferred Ideas

- **Remove EN/IT toggle from existing pages** — user clarified they only meant "don't add it to new tools." Existing pages (rotor-solver, landing) keep their toggles. No action in this phase.
- **Project lifecycle overview** (new-project → roadmap → phase loop) — mentioned in early conversation but explicitly excluded from D-09; belongs in a richer v2 if ever needed

</deferred>

---

*Phase: 2-gsd-workflow-guide*
*Context gathered: 2026-05-30*
