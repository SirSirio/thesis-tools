# Requirements: Thesis Tools — Modular Automated Liquid Dispensing for Point-of-Care Use

**Defined:** 2026-05-29
**Core Value:** Each tool is built on demand when a thesis design decision needs computational support — independent, self-contained, same visual style, always offline-capable

## v1 Requirements

### Motor & Microstepping Panel

- [x] **MOTOR-01**: Rotor solver displays a Motor & Microstepping panel below the geometry results table, with a voltage selector (12 V / 24 V), a microstepping mode dropdown (full / 1/2 / 1/4 / 1/8 / 1/16 / 1/32), and a step rate input field
- [x] **MOTOR-02**: Panel computes and displays seven derived outputs wired to rotor geometry results: steps per stroke, volume per step (µL), available torque at rotor rim, estimated cumulative compression load range, torque margin indicator, approximate reliable max step rate, and RPM at user-supplied step rate
- [ ] **MOTOR-03**: All motor parameters are hard-coded for the Wantai 42BYGHW811 / DRV8825 combination; no editable motor spec fields are exposed
- [ ] **MOTOR-04**: All motor panel logic lives in the existing inline script block of tools/rotor-solver/index.html; no new files, no assets/style.css changes, no CDN dependencies

### Language Switcher (ENG/IT) — ✅ Shipped

- [x] **LANG-01**: Every page displays a language toggle button in the nav bar area; button label shows the other available language ("IT" when English is active, "ENG" when Italian is active)
- [x] **LANG-02**: Clicking the toggle immediately re-renders all data-i18n-tagged elements in the selected language without a page reload; dynamically computed values, units, and numbers are not translated
- [x] **LANG-03**: Selected language is saved to localStorage under the key "lang" and applied on every page load before first paint; first visit defaults to English
- [x] **LANG-04**: All localStorage access is wrapped in try/catch; if unavailable, page loads in English and toggle still functions for the current session without throwing an error
- [x] **LANG-05**: No horizontal scroll is introduced on any page at 1280px or 375px viewport width

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
| MOTOR-03 | Phase 1 | Pending |
| MOTOR-04 | Phase 1 | Pending |
| LANG-01 | Shipped | ✅ Complete |
| LANG-02 | Shipped | ✅ Complete |
| LANG-03 | Shipped | ✅ Complete |
| LANG-04 | Shipped | ✅ Complete |
| LANG-05 | Shipped | ✅ Complete |

**Coverage:**
- v1 requirements: 9 total
- Shipped: 5 (LANG-01–05)
- Active: 4 (MOTOR-01–04, Phase 1)
- Unmapped: 0

---
*Requirements defined: 2026-05-29*
*Last updated: 2026-05-29 after initial .planning/ setup*
