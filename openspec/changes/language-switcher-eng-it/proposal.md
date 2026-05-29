## Why

The thesis tools site is authored by an Italian student at DTU and may be shared with Italian-speaking collaborators, supervisors, or family. Adding a language toggle lets the same static site serve both English (primary academic language) and Italian audiences without maintaining separate pages.

## What Changes

- A language toggle button (ENG / IT) appears in the nav bar on every page
- All visible UI text on the landing page (`index.html`) and tool pages (`tools/rotor-solver/index.html`) is translated to Italian when IT is selected
- The selected language is persisted in `localStorage` so it survives page navigation and reloads
- No server-side logic, no external i18n library — pure vanilla JS inline in each page, consistent with the project's no-CDN, offline-first constraint

## Capabilities

### New Capabilities

- `language-switcher`: Toggle UI component that switches the page language between English and Italian, persists the choice, and applies it on load across all pages

### Modified Capabilities

- (none — this is additive only)

## Impact

- `index.html`: nav bar gains toggle; all text strings get `data-i18n` keys
- `tools/rotor-solver/index.html`: same nav bar treatment; all UI labels/text get `data-i18n` keys
- `assets/style.css`: minor additions for toggle button styling (shared token, no breaking changes)
- No dependencies added; works fully offline
