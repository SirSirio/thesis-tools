## 1. Shared CSS — toggle button style

- [x] 1.1 Add `.lang-toggle` button style to `assets/style.css` using existing glass/border tokens (no new CSS variables)

## 2. Landing page (`index.html`)

- [x] 2.1 Add `<button id="lang-toggle" class="lang-toggle">IT</button>` to the header/nav area
- [x] 2.2 Add `data-i18n` attributes to all visible text elements on the page
- [x] 2.3 Write inline `<script>` with English + Italian translation dictionary covering all `data-i18n` keys
- [x] 2.4 Implement `applyLang(lang)` function that walks `[data-i18n]` elements and sets `textContent`
- [x] 2.5 Implement `localStorage` read on page load (with `try/catch` fallback to `'en'`) and apply language before first paint
- [x] 2.6 Wire toggle button click: flip language, save to `localStorage`, call `applyLang`
- [x] 2.7 Audit: confirm every visible text string on the page has a `data-i18n` key and an Italian translation

## 3. Rotor solver tool (`tools/rotor-solver/index.html`)

- [x] 3.1 Add `<button id="lang-toggle" class="lang-toggle">IT</button>` to the `← All tools` nav bar
- [x] 3.2 Add `data-i18n` attributes to all visible UI labels, headings, and static text on the page
- [x] 3.3 Write inline `<script>` with English + Italian dictionary for all `data-i18n` keys on this page
- [x] 3.4 Copy the same `applyLang` + `localStorage` load + toggle-click pattern from the landing page
- [x] 3.5 Audit: confirm every visible label and static text string has a key and an Italian translation (do not translate computed values or units)

## 4. Smoke test

- [x] 4.1 Open `index.html` locally — switch to IT, verify all text changes, reload, confirm IT persists
- [x] 4.2 Navigate from landing page (IT) to rotor solver — confirm tool loads in IT
- [x] 4.3 Switch back to ENG on tool page — reload landing page — confirm ENG persists
- [x] 4.4 Confirm no horizontal scroll introduced on either page at 1280px and 375px viewport widths
