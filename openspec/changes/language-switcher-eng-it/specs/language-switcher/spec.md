## ADDED Requirements

### Requirement: Language toggle button present on every page
Every page SHALL display a language toggle button in the nav bar area. The button SHALL show the label of the *other* available language (i.e., shows "IT" when English is active, shows "ENG" when Italian is active).

#### Scenario: Toggle visible on landing page
- **WHEN** user opens `index.html`
- **THEN** a language toggle button is visible in the page header

#### Scenario: Toggle visible on tool page
- **WHEN** user opens any tool page (e.g., `tools/rotor-solver/index.html`)
- **THEN** a language toggle button is visible in the nav bar

### Requirement: Switching language translates all visible UI text
When the user activates the toggle, the page SHALL immediately re-render all elements marked with `data-i18n` attributes using the translation dictionary for the selected language. No page reload SHALL be required.

#### Scenario: Switch to Italian
- **WHEN** user clicks the toggle while English is active
- **THEN** all `data-i18n` elements update to Italian text and the toggle label changes to "ENG"

#### Scenario: Switch to English
- **WHEN** user clicks the toggle while Italian is active
- **THEN** all `data-i18n` elements update to English text and the toggle label changes to "IT"

### Requirement: Language selection persists across pages and reloads
The selected language SHALL be saved to `localStorage` under the key `lang`. On every page load, the saved language SHALL be applied before first paint (no flash of wrong language).

#### Scenario: Persist on reload
- **WHEN** user selects Italian and reloads the page
- **THEN** page loads in Italian without requiring the user to toggle again

#### Scenario: Persist across navigation
- **WHEN** user selects Italian on the landing page and navigates to a tool page
- **THEN** the tool page loads in Italian

#### Scenario: Default to English when no preference stored
- **WHEN** `localStorage` has no `lang` entry (first visit or cleared storage)
- **THEN** page loads in English

### Requirement: Graceful fallback when localStorage is unavailable
The language switcher SHALL wrap all `localStorage` access in a `try/catch`. If access fails, the page SHALL default to English and the toggle SHALL still function for the current session (without persistence).

#### Scenario: localStorage blocked
- **WHEN** `localStorage` is unavailable (e.g., private browsing restriction)
- **THEN** page loads in English and the toggle still switches language for the current session without throwing an error
