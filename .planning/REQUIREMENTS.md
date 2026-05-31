# Requirements: Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

**Defined:** 2026-05-29
**Core Value:** Each tool is built on demand when a thesis design decision needs computational support — independent, self-contained, same visual style, always offline-capable

## v1 Requirements

### Motor & Microstepping Panel

- [x] **MOTOR-01**: Rotor solver displays a Motor & Microstepping panel below the geometry results table, with a voltage selector (12 V / 24 V), a microstepping mode dropdown (full / 1/2 / 1/4 / 1/8 / 1/16 / 1/32), and a step rate input field
- [x] **MOTOR-02**: Panel computes and displays seven derived outputs wired to rotor geometry results: steps per stroke, volume per step (µL), available torque at rotor rim, estimated cumulative compression load range, torque margin indicator, approximate reliable max step rate, and RPM at user-supplied step rate
- [x] **MOTOR-03**: All motor parameters are hard-coded for the Wantai 42BYGHW811 / DRV8825 combination; no editable motor spec fields are exposed
- [x] **MOTOR-04**: All motor panel logic lives in the existing inline script block of tools/rotor-solver/index.html; no new files, no assets/style.css changes, no CDN dependencies

### Language Switcher (ENG/IT) — ✅ Shipped

- [x] **LANG-01**: Every page displays a language toggle button in the nav bar area; button label shows the other available language ("IT" when English is active, "ENG" when Italian is active)
- [x] **LANG-02**: Clicking the toggle immediately re-renders all data-i18n-tagged elements in the selected language without a page reload; dynamically computed values, units, and numbers are not translated
- [x] **LANG-03**: Selected language is saved to localStorage under the key "lang" and applied on every page load before first paint; first visit defaults to English
- [x] **LANG-04**: All localStorage access is wrapped in try/catch; if unavailable, page loads in English and toggle still functions for the current session without throwing an error
- [x] **LANG-05**: No horizontal scroll is introduced on any page at 1280px or 375px viewport width

### GSD Workflow Guide

- [ ] **GSD-01**: A new tool page at `tools/gsd-workflow-guide/index.html` exists and is linked from the landing page (`index.html` tool card)
- [ ] **GSD-02**: The page displays a top-to-bottom flow diagram with 7 command nodes (spec-phase, discuss-phase, plan-phase, execute-phase, verify-work, code-review, ship) and a utility sidebar (progress, quick, fast, debug, capture)
- [ ] **GSD-03**: Optional nodes (spec-phase, verify-work, code-review, ship) are visually distinct from core nodes via dashed border and "optional" badge; clicking any node expands/collapses its full description and slash command
- [ ] **GSD-04**: All styles and logic are inline (`<style>` and `<script>` blocks); no new shared files; `assets/style.css` is unchanged; no CDN-only dependencies

### Peristaltic Occlusion & Displaced-Volume Model

- [x] **OCCL-01**: Tool page exists at `tools/peristaltic-roller-displaced-volume-model/index.html`; linked from landing page
- [x] **OCCL-02**: Page has two clearly separated sections: (1) stadium cross-section model with theory (derivations, symbol table, gap equation, assumptions, sources) and interactive SVG figure with 3 compression state buttons; (2) displaced-volume model with theory and interactive calculator
- [x] **OCCL-03**: All formulas rendered in LaTeX via KaTeX (CDN primary, local `katex/` folder as offline fallback); KaTeX CSS and JS files present locally
- [x] **OCCL-04**: No EN/IT language toggle; English only; all logic and styles inline; no changes to `assets/style.css`

## v2 Requirements

### Backlog Tools (no spec yet)

- **BACKLOG-01**: Flow sensor calibration curve viewer
- **BACKLOG-02**: Dispense protocol calculator (multi-step sequences)
- **BACKLOG-03**: Tube occlusion efficiency estimator from gravimetric data
- **BACKLOG-04**: Bill of materials / component selector

## Out of Scope

| Feature | Reason |
|---------|--------|
| Automatic browser-language detection | User must choose language explicitly; out of scope for v1 |
| Languages beyond English and Italian | Thesis audience only needs these two |
| Editable motor specification fields | Hard-coded to Proto 1 hardware; generality deferred |
| Shared assets/i18n.js file | Offline path fragility; inline is project convention |
| RTL language support | No RTL languages planned |
| External CDN dependencies (no local fallback) | Offline constraint is hard |
| Build tools, npm, frameworks | Static site constraint is hard |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| MOTOR-01 | Phase 1 | Complete |
| MOTOR-02 | Phase 1 | Complete |
| MOTOR-03 | Phase 1 | Complete |
| MOTOR-04 | Phase 1 | Complete |
| LANG-01 | Shipped | ✅ Complete |
| LANG-02 | Shipped | ✅ Complete |
| LANG-03 | Shipped | ✅ Complete |
| LANG-04 | Shipped | ✅ Complete |
| LANG-05 | Shipped | ✅ Complete |
| GSD-01 | Phase 2 | Planning |
| GSD-02 | Phase 2 | Planning |
| GSD-03 | Phase 2 | Planning |
| GSD-04 | Phase 2 | Planning |

**Coverage:**

- v1 requirements: 13 total
- Shipped: 5 (LANG-01–05)
- Complete: 4 (MOTOR-01–04, Phase 1)
- Active: 4 (GSD-01–04, Phase 2)
- Unmapped: 0

---
*Requirements defined: 2026-05-29*
*Last updated: 2026-05-30 after Phase 2 planning*
