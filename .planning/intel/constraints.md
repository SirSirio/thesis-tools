# Constraints

Extracted from SPEC and ADR-classified documents, supplemented by project-wide DOC constraints. Ordered by type.

---

## CONSTRAINT-001: No CDN-only dependencies

type: nfr
source: CLAUDE.md
scope: project-wide, all pages

Any external resource requires a local fallback. The site must function fully offline from a USB drive with no network access.

---

## CONSTRAINT-002: No build tools, no npm, no frameworks

type: nfr
source: CLAUDE.md, README.md
scope: project-wide, all pages

The site is static HTML/CSS/JS only. No build step, no package manager, no JavaScript frameworks.

---

## CONSTRAINT-003: No horizontal scroll on any page

type: nfr
source: CLAUDE.md, openspec/changes/language-switcher-eng-it/tasks.md (4.4)
scope: project-wide, layout

Table columns must wrap headers before a horizontal scroll bar is added. This constraint applies at both 1280px and 375px viewport widths.

---

## CONSTRAINT-004: Inline script blocks only for calculation/logic

type: api-contract
source: CLAUDE.md
scope: project-wide, all tool pages

All calculation and feature logic lives in inline `<script>` tags within each tool's `index.html`. No external `.js` files for tool-specific logic.

---

## CONSTRAINT-005: Tool-specific CSS in per-page style blocks

type: api-contract
source: CLAUDE.md
scope: project-wide, all tool pages

Tool-specific styles go in a `<style>` block inside the tool's HTML. Only truly shared styles go in `assets/style.css`. Adding tool-specific rules to `assets/style.css` is prohibited.

---

## CONSTRAINT-006: GitHub Pages and offline-from-USB compatibility

type: nfr
source: CLAUDE.md, README.md
scope: project-wide, deployment

Relative paths must resolve correctly both when served from GitHub Pages and when opened directly from a file system or USB drive. VS Code Live Preview must not be used to open files (it rewrites paths and strips inline scripts).

---

## CONSTRAINT-007: Language switcher — two languages only, no auto-detection

type: schema
source: openspec/changes/language-switcher-eng-it/design.md (Non-Goals), openspec/changes/language-switcher-eng-it/specs/language-switcher/spec.md
scope: language-switcher, i18n

The switcher supports exactly English and Italian. RTL language support, more than two languages, and automatic browser-language detection are explicit non-goals for this version.

---

## CONSTRAINT-008: Language switcher — do not translate computed values or units

type: schema
source: openspec/changes/language-switcher-eng-it/design.md (Non-Goals), openspec/changes/language-switcher-eng-it/tasks.md (3.5)
scope: language-switcher, rotor-solver

Dynamically computed values, units, numbers, and formula outputs are not covered by the i18n system. Only static UI text with `data-i18n` attributes is translated.

---

## CONSTRAINT-009: Motor panel — hard-coded motor constants only (Wantai 42BYGHW811 / DRV8825)

type: schema
source: openspec/changes/motor-microstepping-panel/proposal.md
scope: motor-microstepping-panel, rotor-solver

All motor parameters are fixed to the Wantai 42BYGHW811 / DRV8825 combination. No user-editable motor spec fields are allowed in this version.

---

## CONSTRAINT-010: Motor panel — no changes outside tools/rotor-solver/index.html

type: api-contract
source: openspec/changes/motor-microstepping-panel/proposal.md (Impact section)
scope: motor-microstepping-panel

The motor panel feature touches exactly one file: `tools/rotor-solver/index.html`. No new source files, no `assets/style.css` changes, no CDN additions are permitted.

---

## CONSTRAINT-011: localStorage key namespace — `lang`

type: schema
source: openspec/changes/language-switcher-eng-it/design.md (Decision D3), openspec/changes/language-switcher-eng-it/specs/language-switcher/spec.md
scope: language-switcher, localStorage

The language preference is stored exclusively under the key `lang`. No other key name is acceptable.

---

## CONSTRAINT-012: Design system tokens — no new CSS variables for language switcher

type: schema
source: openspec/changes/language-switcher-eng-it/design.md (Decision D4)
scope: language-switcher, assets/style.css

The toggle button uses only existing glass/border CSS tokens already defined in `assets/style.css`. Adding new CSS custom properties for the language switcher is prohibited.
