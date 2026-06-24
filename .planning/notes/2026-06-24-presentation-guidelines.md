# Presentation Authoring Guidelines

This document captures the recurring stylistic, structural, and technical guidelines for creating HTML presentation decks in this project, established during the creation of the June 2026 Lab Meeting deck (Phase 05).

## 1. Content & Copywriting
- **Message-Driven Titles:** Slide titles must be informative and state the conclusion or core message directly. 
  - *Bad:* "Proto 1 Validation"
  - *Good:* "Proto 1 proved the concept but underdelivered"
- **Conciseness:** Use bullet points and extremely short sentences.
- **Typography:** Use massive, readable text sizes. Eliminate walls of text.

## 2. Technical Storytelling
- **Visual Evidence over Raw Math:** Use direct visual representations of engineering concepts whenever possible. For example, embedding the raw SVG "hump curve" for gap sweeps makes leak-limited systems visually obvious without requiring the audience to parse raw equations.
- **Data Presentation:** When showing bar charts or quantitative data, always include the CV (Coefficient of Variation) alongside the bars (excluding nominal/theoretical targets which inherently have no CV).

## 3. UI & Aesthetics
- **Glassmorphic Design:** The presentation must adhere to the project's premium dark glassmorphic design language. Cards, thumbnails, and backgrounds should utilize `backdrop-filter: blur()`, glowing borders on hover, and semi-transparent backgrounds.
- **Backgrounds:** Slides should sit over the global site background (e.g., animated blobs). Do not use opaque solid backgrounds that break the site's immersion.
- **Animations:** Tools and iframes should utilize auto-fade animations (e.g., `auto-fade-iframe`, `auto-fade-text`) so they appear smoothly without requiring manual clicks.

## 4. Overview Mode (Thumbnails)
- **Visual Fidelity:** The slide thumbnails in Overview Mode (`Esc` or `O`) must not be dull boxes. They must be styled as premium glass cards with hover lift effects (`transform: translateY(-8px) scale(1.02)`) and accent glows.
- **Scaling Mechanic:** Slide thumbnails must use a robust `ResizeObserver` approach in JavaScript to calculate scaling. Because slides are fixed at 1280x720, the observer calculates the actual container width and sets a `--thumb-scale` CSS variable (e.g., `width / 1280`). This ensures perfect scaling across all browsers without relying on fragile CSS container queries for absolutely positioned clones.
- **Layering:** The "Back to Index" link must maintain a high `z-index` (e.g., 300) so it remains accessible and visible on top of the overview grid.
