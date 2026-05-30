# Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

## What This Is

A growing collection of self-contained interactive design tools built alongside a DTU master's thesis on modular automated liquid dispensing for point-of-care use. Each tool is a static HTML/JS page that runs offline from a USB drive and is cited in the written thesis via QR codes. The site is a one-person project authored by Sirio Vittorio Feltrin (2025–2026).

**Site structure:** A landing page (`index.html`) links to all available tools. Each tool lives at its own path (e.g. `tools/rotor-solver/index.html`) and is fully self-contained — its own HTML, inline `<style>`, and inline `<script>`. Tools are independent; they share only the design system (`assets/style.css`) and the nav bar back-link. A new tool is just a new card on the landing page.

## Core Value

A thesis companion site where each tool is developed on demand — when a design decision needs computational support, a new tool is built, documented, and linked. Tools share a common visual style but are developed and maintained independently. The collection grows with the thesis, is always usable offline, and is cited in the written work via QR codes.

## Requirements

### Validated

- ✓ Peristaltic Rotor Geometry Solver — solves rotor radius for target stroke volume, checks 3 feasibility constraints across roller counts 3–12. (Phase 0 / shipped)
- ✓ Motor & Microstepping Panel — 6 per-row motor columns (contact rollers, steps/stroke, µL/step, torque rim, FoS with traffic light, max step rate), voltage-dependent speed derating, dynamic Time column, RPM card, full EN/IT documentation. (Phase 1 / shipped)

### Active

*(none — ready to plan next tool)*

### Out of Scope

| Feature | Reason |
|---------|--------|
| Automatic browser-language detection | Non-goal for v1 language switcher; user must choose explicitly |
| More than two languages (e.g., German, French) | Thesis audience is English/Italian only |
| Editable motor specification fields | Proto 1 targets fixed hardware (Wantai 42BYGHW811 / DRV8825); generality deferred |
| External JS or CSS files for tool-specific logic | Project convention: inline scripts/styles only |
| CDN-only dependencies | Must work offline; no external fallback = not allowed |
| Build tools, npm, frameworks | Static site constraint is hard |

## Context

- Live URL: https://sirsirio.github.io/thesis-tools/
- Hardware under development: peristaltic pump with NEMA17 stepper (Wantai 42BYGHW811), DRV8825 driver, Sensirion flow sensor, rotating peristaltic head, modular fluidic interface
- Design system: dark glassmorphic theme; tokens defined in `assets/style.css`; each tool page brings its own `<style>` block
- Development workflow: GSD (`/gsd:discuss-phase` → `/gsd:plan-phase` → `/gsd:execute-phase`); one phase per tool or tool enhancement. OpenSpec change files in `openspec/` are preserved as historical reference.
- Tool spec standard: every tool has a `SPEC.md` co-located with its `index.html` (`tools/<name>/SPEC.md`). This is the canonical reference for that tool's purpose, inputs, outputs, formulas, hardware constants, and assumptions. Only `assets/style.css` is shared between tools — everything else is tool-local.
- Do NOT use VS Code Live Preview (rewrites relative paths and strips inline scripts); use `serve.bat` → `http://localhost:7331` instead
- Site grows as the thesis progresses; each new tool is triggered by a new design decision needing computational support
- Backlog tools (no spec yet): flow sensor calibration curve viewer, dispense protocol calculator, tube occlusion efficiency estimator, BOM/component selector

## Constraints

- **Tech stack**: Static HTML/CSS/JS only — no build tools, no npm, no frameworks
- **Offline / USB**: All resources must be local or have local fallbacks; relative paths must resolve from file system and GitHub Pages
- **Inline logic**: All calculation logic in inline `<script>` tags; tool-specific styles in inline `<style>` blocks
- **No new files for features**: Motor panel must not create new source files; language switcher must not create `assets/i18n.js`
- **No horizontal scroll**: At 1280px and 375px viewport widths on every page
- **No new CSS variables**: Language switcher button uses existing glass/border tokens only
- **localStorage key**: Language preference stored as `lang` — no other key name acceptable
- **localStorage error handling**: All access wrapped in try/catch; fallback to English

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| data-i18n attribute pattern for language switching | Avoids DOM reconstruction; keeps translation trivially simple; no event-listener breakage | — Pending |
| Inline per-page translation dictionaries (no shared i18n.js) | USB/offline path handling is fragile; inline is already the project norm | — Pending |
| localStorage key "lang", default "en" | Simple, predictable, wrapped in try/catch for private-browsing resilience | — Pending |
| Toggle button in existing nav bar, no new CSS variables | Reuses existing glass/border tokens; minimal visual disruption | — Pending |
| No auto browser-language detection | User must choose explicitly; RTL and additional languages out of scope | — Pending |
| Hard-code Wantai 42BYGHW811 / DRV8825 motor params | Proto 1 scope; generality not needed yet | ✓ Shipped Phase 1 |
| Motor panel changes only tools/rotor-solver/index.html | Keeps feature self-contained; consistent with project convention | ✓ Shipped Phase 1 |
| Voltage-dependent speed derating on torque/FoS (min(1, f_max/SP)) | DRV8825 chopper can't reach rated current above inductive ceiling; derating makes FoS physically accurate | ✓ Added post-Phase 1 |

---
*Last updated: 2026-05-30 after Phase 1 — Motor & Microstepping Panel*
