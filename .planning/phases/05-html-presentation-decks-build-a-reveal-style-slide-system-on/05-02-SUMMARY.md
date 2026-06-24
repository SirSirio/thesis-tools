# 05-02: Presentations Index Page

## Overview
Built the `decks/index.html` page to serve as the directory for all HTML presentation decks. The page is integrated into the site's design system using existing glassmorphic and blob chrome patterns, and is linked directly from a new section on the main landing page.

## Changes Made
1. **Presentations Index (`decks/index.html`)**:
   - Created a standalone static HTML page using only the shared `assets/style.css` (no external CDNs or heavy scripts).
   - Implemented the blob chrome background and sticky glassmorphic navigation bar linking back to `../index.html`.
   - Built a hand-authored deck card (`.deck-card`) for the upcoming "Lab Meeting — June 2026" deck.
   - Designed a signature "deal-out" interaction where the cards animate from a fanned/stacked angle into their grid layout on page load.
   - Wrapped the deal-out motion in a `prefers-reduced-motion` inversion guard, ensuring that the initial DOM state is fully visible and static for users preferring reduced motion.

2. **Landing Page Integration (`index.html`)**:
   - Appended a new "Presentations" `<section>` under the `.resources-sections` wrapper.
   - Staggered the `animate-in` `--delay` properties to gracefully cascade after the Prototypes section.
   - Ensured single-language simplicity by omitting `data-i18n` tags.

## Acceptance Criteria Verified
- `decks/index.html` relies exclusively on `../assets/style.css`.
- The seed `.deck-card` links to `lab-meeting-2026-06/index.html`.
- Fanned animations are protected within an `@media (prefers-reduced-motion: no-preference)` block and fired inline.
- The root `index.html` incorporates the new Presentations section correctly.
