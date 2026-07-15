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

### HTML Presentation Decks

- [x] **SC-1**: A shared deck runtime (`deck.css`, `deck.js`) exists and provides scale-to-fit letterbox staging, fragment stepping, hash routing, and reduced-motion guards.
- [x] **SC-2**: A Presentations Index page exists at `decks/index.html` with a card-deck deal-out animation.
- [x] **SC-3**: The seed lab-meeting deck is fully implemented at `decks/lab-meeting-2026-06/index.html` and embeds live tool iframes.

### System Architecture Explorer (Phase 6)

*Registered 2026-07-15 from the Phase 6 ROADMAP success criteria + CONTEXT.md decisions D-01…D-12. Traces to plans 06-01…06-07.*

- [ ] **ARCH-01**: Tool lives at `tools/system-architecture-explorer/index.html` with a co-located `SPEC.md`, adopts `assets/style.css` design tokens (no private `:root` block), and has the standard `← All tools` nav bar. *(Plan 06-01; D-04, D-08)*
- [ ] **ARCH-02**: Tool is reachable from the landing-page card and listed in `README.md` tool table and repo-root `ROADMAP.md`. *(Plan 06-04)*
- [ ] **ARCH-03**: Tool retains all current behaviour (editable BOM prices, DKK↔EUR converter, 17-variant sortable/filterable matrix, expandable per-variant BOM, shared-block toggle) AND gains the live variant-driven SVG system diagram with row-click selection. *(Plans 06-01, 06-06; D-01, D-02, D-03)*
- [ ] **ARCH-04**: `prototypes/System-Architecture/` retains the three decision records, cross-linked both ways to the tool; no orphaned `index.html`. *(Plan 06-03; D-05, D-08)*
- [ ] **ARCH-05**: `SPEC.md` documents the component price table, variant BOMs, three comms layers, pin-budget model, power/PSU model, and cost-model assumptions with confidence tags. *(Plan 06-07)*
- [ ] **ARCH-06**: `CLAUDE.md` folder structure updated; all logic/styles remain inline; no new shared files. *(Plan 06-04)*
- [ ] **ARCH-07**: Data model computes pins-used/available/free per variant across Layer A (screen, fixed, SPI/parallel scenarios) + Layer B (bus) + Layer C (driver links); overruns flagged with confidence markers. *(Plans 06-02, 06-05; D-09, D-11)*
- [ ] **ARCH-08**: ESP32-integrated-screen board(s) added as candidate variant(s); brain candidates record RAM/PSRAM/usable-GPIO with a UI-fluidity note; per-component source field + confidence tag. *(Plan 06-05; D-07, D-10, D-11, D-12)*

### Backlog Tools (no spec yet)

- **BACKLOG-01**: Flow sensor calibration curve viewer
- **BACKLOG-02**: Dispense protocol calculator (multi-step sequences)
- **BACKLOG-03**: Tube occlusion efficiency estimator from gravimetric data
- **BACKLOG-04**: Bill of materials / component selector *(partially retired by the Phase 6 System Architecture Explorer — a BOM-driven control-electronics selector)*

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
| URL-hash shareable price state (Phase 6) | Deferred in favour of localStorage (D-06); revisit only if a priced scenario must be cited by link |
| Follow-cheapest-row diagram mode (Phase 6) | Rejected for explicit row-click selection (D-02) |
| Landing-page redesign for many tools | Out of scope; Phase 6 adds one card to the existing grid |
| Sourcing all ~20 component prices (Phase 6) | D-07 adds the source field; populating beyond the ILI9341 is ongoing BOM work |

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
| SC-1 | Phase 5 | Complete |
| SC-2 | Phase 5 | Complete |
| SC-3 | Phase 5 | Complete |
| ARCH-01 | Phase 6 | Planned |
| ARCH-02 | Phase 6 | Planned |
| ARCH-03 | Phase 6 | Planned |
| ARCH-04 | Phase 6 | Planned |
| ARCH-05 | Phase 6 | Planned |
| ARCH-06 | Phase 6 | Planned |
| ARCH-07 | Phase 6 | Planned |
| ARCH-08 | Phase 6 | Planned |

**Coverage:**

- v1 requirements: 16 total
- Shipped: 5 (LANG-01–05)
- Complete: 7 (MOTOR-01–04, SC-1–3)
- Active: 4 (GSD-01–04, Phase 2)
- Planned: 8 (ARCH-01–08, Phase 6)
- Unmapped: 0

---
*Requirements defined: 2026-05-29*
*Last updated: 2026-07-15 after Phase 6 planning (ARCH-01–08 registered)*
