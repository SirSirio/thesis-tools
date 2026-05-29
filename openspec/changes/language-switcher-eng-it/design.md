## Context

The site is pure static HTML/CSS/JS — no build tools, no npm, must work offline from USB. Each page is self-contained. There are currently two pages that need translation: the landing page (`index.html`) and the rotor solver tool (`tools/rotor-solver/index.html`). The shared stylesheet (`assets/style.css`) is already imported by both.

## Goals / Non-Goals

**Goals:**
- Language toggle (ENG ↔ IT) visible in the nav bar on every page
- All user-facing text translateable via a single inline JS translation dictionary
- Selected language persists across pages via `localStorage`
- Works fully offline, no CDN, no external i18n library

**Non-Goals:**
- RTL language support
- More than two languages
- Automatic browser-language detection (user must choose explicitly)
- Translating dynamically computed values (units, numbers, formulas)

## Decisions

### D1: `data-i18n` attribute pattern over DOM-replacement

Tag every translatable element with `data-i18n="key"`. A small `applyLang(lang)` function walks `querySelectorAll('[data-i18n]')` and sets `textContent` from a dictionary object. This keeps translation logic trivially simple and avoids rebuilding the DOM.

**Alternative considered:** template literals that re-render the whole page. Rejected — too invasive, breaks event listeners on tool pages.

### D2: Inline `<script>` per page, shared structure

Each page owns its own translation dictionary and `applyLang` function in an inline `<script>` tag (consistent with the project's existing pattern). The dictionary shape is identical across pages so the pattern is copy-paste-and-fill.

**Alternative considered:** a shared `assets/i18n.js` file loaded via `<script src>`. Rejected — USB/offline path handling is fragile; inline is simpler and already the project norm.

### D3: `localStorage` key `lang`, defaulting to `"en"`

On page load: read `localStorage.getItem('lang') ?? 'en'`, apply immediately, set toggle button label. On toggle click: flip, save, apply.

### D4: Toggle button in the existing nav bar

A small `<button id="lang-toggle">` sits at the right end of the existing `← All tools` nav bar (or, on the landing page, in the top-right corner of the header). Styled with the existing glass/border tokens — no new CSS variables needed. Label shows the *other* language (`IT` when English is active, `ENG` when Italian is active).

## Risks / Trade-offs

- **Translation coverage drift** — if new text is added to a page without a corresponding `data-i18n` key, it silently stays in English. Mitigation: tasks include a checklist step to audit all visible text before marking done.
- **Per-page dictionaries** — Italian strings must be maintained in each page separately. Acceptable given the small page count; revisit if pages grow beyond ~5.
- **`localStorage` unavailable** (private browsing, USB kiosk) — `applyLang` will default to English silently. Mitigation: wrap in `try/catch`, fall back to `'en'`.

## Migration Plan

1. Add toggle button + inline JS to `index.html`
2. Add toggle button + inline JS to `tools/rotor-solver/index.html`
3. Add toggle button style to `assets/style.css`
4. Manual smoke-test both pages: switch → reload → confirm persistence
5. Commit and push; GitHub Pages auto-deploys

Rollback: revert commit — no data migration needed.
