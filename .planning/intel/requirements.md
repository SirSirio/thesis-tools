# Requirements

Extracted from PRD-classified documents. Requirements preserve all acceptance criteria variants; no merging across sources.

---

## REQ-lang-toggle-present

source: openspec/changes/language-switcher-eng-it/specs/language-switcher/spec.md
source-prd: openspec/changes/language-switcher-eng-it/proposal.md
scope: language-switcher, index.html, tools/rotor-solver/index.html, nav bar

Description: Every page SHALL display a language toggle button in the nav bar area. The button SHALL show the label of the *other* available language — "IT" when English is active, "ENG" when Italian is active.

Acceptance criteria:
- WHEN user opens index.html THEN a language toggle button is visible in the page header
- WHEN user opens any tool page (e.g., tools/rotor-solver/index.html) THEN a language toggle button is visible in the nav bar

---

## REQ-lang-switch-translates-ui

source: openspec/changes/language-switcher-eng-it/specs/language-switcher/spec.md
source-prd: openspec/changes/language-switcher-eng-it/proposal.md
scope: language-switcher, data-i18n, index.html, tools/rotor-solver/index.html

Description: When the user activates the toggle, the page SHALL immediately re-render all elements marked with `data-i18n` attributes using the translation dictionary for the selected language. No page reload SHALL be required.

Acceptance criteria:
- WHEN user clicks the toggle while English is active THEN all data-i18n elements update to Italian text and the toggle label changes to "ENG"
- WHEN user clicks the toggle while Italian is active THEN all data-i18n elements update to English text and the toggle label changes to "IT"

Note (from proposal.md): dynamically computed values, units, numbers, and formulas are NOT translated.

---

## REQ-lang-persistence

source: openspec/changes/language-switcher-eng-it/specs/language-switcher/spec.md
source-prd: openspec/changes/language-switcher-eng-it/proposal.md
scope: language-switcher, localStorage, i18n

Description: The selected language SHALL be saved to localStorage under the key `lang`. On every page load, the saved language SHALL be applied before first paint (no flash of wrong language).

Acceptance criteria:
- WHEN user selects Italian and reloads the page THEN the page loads in Italian without requiring the user to toggle again
- WHEN user selects Italian on the landing page and navigates to a tool page THEN the tool page loads in Italian
- WHEN localStorage has no `lang` entry (first visit or cleared storage) THEN page loads in English

---

## REQ-lang-localstorage-fallback

source: openspec/changes/language-switcher-eng-it/specs/language-switcher/spec.md
scope: language-switcher, localStorage, error handling

Description: The language switcher SHALL wrap all localStorage access in a try/catch. If access fails, the page SHALL default to English and the toggle SHALL still function for the current session (without persistence).

Acceptance criteria:
- WHEN localStorage is unavailable (e.g., private browsing restriction) THEN the page loads in English and the toggle still switches language for the current session without throwing an error

---

## REQ-no-horizontal-scroll

source: openspec/changes/language-switcher-eng-it/tasks.md (Smoke test 4.4)
source-doc: CLAUDE.md (Key constraints)
scope: language-switcher, layout, index.html, tools/rotor-solver/index.html

Description: No horizontal scroll SHALL be introduced on any page. Table columns must wrap headers before adding scroll.

Acceptance criteria:
- WHEN viewing any page at 1280px viewport width THEN no horizontal scroll bar appears
- WHEN viewing any page at 375px viewport width THEN no horizontal scroll bar appears

---

## REQ-motor-panel-inputs

source: openspec/changes/motor-microstepping-panel/proposal.md
scope: motor-microstepping-panel, rotor-solver, tools/rotor-solver/index.html

Description: The rotor solver SHALL gain a Motor & Microstepping panel below the existing results table. The panel SHALL include a Voltage selector (12 V / 24 V), a Microstepping mode dropdown (full / 1/2 / 1/4 / 1/8 / 1/16 / 1/32), and a user-supplied step rate input field.

Acceptance criteria:
- WHEN user opens the rotor solver THEN a Motor & Microstepping panel is visible below the geometry results table
- WHEN user selects a voltage and microstepping mode THEN derived motor outputs update accordingly

---

## REQ-motor-panel-outputs

source: openspec/changes/motor-microstepping-panel/proposal.md
scope: motor-microstepping-panel, rotor-solver, tools/rotor-solver/index.html

Description: The Motor & Microstepping panel SHALL compute and display the following derived outputs, all wired to the existing rotor geometry results:

- Steps per stroke at selected microstepping mode
- Volume per step (µL)
- Available torque at rotor rim (g-force equivalent)
- Estimated cumulative compression load range (g, based on simultaneous rollers in contact)
- Torque margin indicator (OK / marginal / insufficient)
- Approximate reliable max step rate (steps/s) given voltage and motor inductance
- RPM at user-supplied step rate

Acceptance criteria:
- WHEN rotor geometry is solved and motor inputs are set THEN all seven derived outputs are displayed
- WHEN motor inputs change THEN outputs update without a page reload

---

## REQ-motor-panel-hardcoded-params

source: openspec/changes/motor-microstepping-panel/proposal.md
scope: motor-microstepping-panel, Wantai 42BYGHW811, DRV8825

Description: All motor parameters SHALL be hard-coded for the Wantai 42BYGHW811 / DRV8825 combination. No editable motor spec fields SHALL be exposed in this version.

Acceptance criteria:
- WHEN user opens the motor panel THEN no free-form motor specification inputs are present; the panel uses the fixed Wantai 42BYGHW811 / DRV8825 constants

---

## REQ-motor-panel-containment

source: openspec/changes/motor-microstepping-panel/proposal.md
scope: motor-microstepping-panel, tools/rotor-solver/index.html

Description: All motor panel logic SHALL live in the existing inline `<script>` block of `tools/rotor-solver/index.html`. New styles SHALL go in the existing `<style>` block. No new files, no shared stylesheet changes, no CDN dependencies SHALL be introduced.

Acceptance criteria:
- WHEN the feature is merged THEN no new source files exist and no changes appear in assets/style.css
