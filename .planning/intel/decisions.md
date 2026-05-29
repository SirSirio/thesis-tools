# Decisions

Extracted from ADR-classified documents. Precedence: ADR > SPEC > PRD > DOC.

---

## ADR-001: data-i18n attribute pattern for language switching

source: openspec/changes/language-switcher-eng-it/design.md (Decision D1)
status: proposed (no explicit "Accepted" status declared)
scope: language-switcher, i18n, index.html, tools/rotor-solver/index.html

Decision: Tag every translatable element with a `data-i18n="key"` attribute. A small `applyLang(lang)` function walks `querySelectorAll('[data-i18n]')` and sets `textContent` from a plain JS dictionary object. This avoids DOM reconstruction and keeps translation logic trivially simple.

Alternative rejected: Template literals re-rendering the whole page — rejected because it is too invasive and breaks event listeners on tool pages.

---

## ADR-002: Inline per-page script, shared structure (no shared i18n file)

source: openspec/changes/language-switcher-eng-it/design.md (Decision D2)
status: proposed
scope: language-switcher, assets/i18n.js (rejected), inline script pattern

Decision: Each page owns its own translation dictionary and `applyLang` function in an inline `<script>` tag, consistent with the project's existing pattern. Dictionary shape is identical across pages so the pattern is copy-paste-and-fill.

Alternative rejected: A shared `assets/i18n.js` loaded via `<script src>`. Rejected because USB/offline path handling is fragile and inline is already the project norm.

---

## ADR-003: localStorage key "lang", default "en"

source: openspec/changes/language-switcher-eng-it/design.md (Decision D3)
status: proposed
scope: language-switcher, localStorage, i18n

Decision: On page load, read `localStorage.getItem('lang') ?? 'en'`, apply immediately, and set the toggle button label. On toggle click: flip, save to localStorage, call `applyLang`. All localStorage access wrapped in `try/catch`; fallback to `'en'`.

---

## ADR-004: Toggle button in existing nav bar, no new CSS variables

source: openspec/changes/language-switcher-eng-it/design.md (Decision D4)
status: proposed
scope: language-switcher, nav bar, assets/style.css, index.html, tools/rotor-solver/index.html

Decision: A small `<button id="lang-toggle">` sits at the right end of the existing nav bar (or, on the landing page, top-right corner of the header). Styled with existing glass/border tokens — no new CSS variables needed. Label shows the *other* language: "IT" when English is active, "ENG" when Italian is active.

---

## ADR-005: No automatic browser-language detection

source: openspec/changes/language-switcher-eng-it/design.md (Goals / Non-Goals)
status: proposed
scope: language-switcher, i18n

Decision: The switcher supports exactly two languages (English, Italian). No automatic browser-language detection is implemented. The user must choose explicitly. RTL support and additional languages are explicit non-goals in this version.

---

## ADR-006: Motor panel parameters hard-coded for Wantai 42BYGHW811 / DRV8825

source: openspec/changes/motor-microstepping-panel/proposal.md
status: proposed
scope: motor-microstepping-panel, rotor-solver, tools/rotor-solver/index.html

Decision: All motor parameters are hard-coded for the Wantai 42BYGHW811 / DRV8825 combination. No editable motor spec fields are included in this version. This is a deliberate scope constraint for the Proto 1 operating-point phase.

---

## ADR-007: Motor panel changes only tools/rotor-solver/index.html

source: openspec/changes/motor-microstepping-panel/proposal.md (Impact section)
status: proposed
scope: motor-microstepping-panel, rotor-solver

Decision: The motor and microstepping panel is entirely contained within `tools/rotor-solver/index.html`. All new logic stays in the existing inline `<script>` block; new styles go in the existing `<style>` block. No new files, no shared stylesheet changes, no CDN dependencies.

---

## ADR-008: Project-wide — static HTML/CSS/JS only, no build tools

source: CLAUDE.md
status: proposed (project-wide standing constraint)
scope: project-structure, development-constraints, GitHub Pages, offline

Decision: The project is static HTML/CSS/JS only — no build tools, no npm, no frameworks. Must work offline from a USB drive and on GitHub Pages. No CDN-only dependencies; any external resource needs a local fallback. All calculation logic lives in inline `<script>` tags. Tool-specific styles go in `<style>` blocks inside the tool's HTML; shared styles go in `assets/style.css`.
