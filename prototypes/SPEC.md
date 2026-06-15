# SPEC: Prototype Design Space

## Purpose

A visual, animated prototype-journey page tracking each hardware prototype from design
parameters to measured results. Each prototype is a summary card on a winding SVG path
that expands into a full detail view (Purpose, Parameters, Results, Design reasoning).
HTML is the content source of truth — hand-authored and maintained via chat.

Primary purpose: a space to design new prototypes with AI assistance and to review past
ones to improve the process. Documentation is a byproduct of that loop.

## Inputs

None — static content only. All content authored directly into the HTML file.

## Content Structure

### Journey View (default)

- Winding SVG path animates on scroll-into-view (draws itself, then prototype nodes pop in sequentially)
- Each prototype: summary card with tag, title, one-line purpose, KPI pills, "Explore →" CTA
- Clicking a card swaps to the detail view (no page reload; `hidden` attribute toggling)

### Detail View

Per-prototype sections in order:
1. **Purpose** — why built and what it tests
2. **Parameters** — dimensions/materials table with links out to the design-tool pages
3. **Results** — hero stat-cards (1–3 headline metrics) + CSS bar chart + method-comparison table
4. **Design reasoning** — what the data revealed and what drives the next prototype

← Back to journey control returns to the path view.

## Animation Technique

- SVG `<path pathLength="1">` with `stroke-dasharray` CSS transition (NOT `stroke-dashoffset` — reversed in some browsers)
- `IntersectionObserver` adds `.is-visible` class when `.stage-inner` scrolls into view (off-main-thread, fires once)
- Node pop-in via staggered `transition-delay` sequenced after path draw
- All motion inside `@media (prefers-reduced-motion: no-preference)` only — default CSS renders everything visible; JS guard handles the reduced-motion state at runtime

## Mobile Behaviour (≤ 640px)

- SVG path hidden (`display: none`)
- `.proto-node` reverts to `position: static`, full-width vertical stack
- No horizontal scroll guaranteed at 375px viewport

## Prototype Registry (initial)

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| proto-01 | 5 µL 4-roller peristaltic | Built — redesign pending | −32.2 % under-dispense; ≈3.39 µL/stroke (grav) |

## Constraints

- Static site only — no build tools, no npm, no frameworks; must work offline via serve.bat and on GitHub Pages
- HTML is the content source of truth — no JSON/markdown fetch, no generator
- No CDN-only dependencies — all resources inline or local
- No horizontal scroll at 1280px and 375px viewports (project hard rule)
- Tool-specific styles inline in `<style>`; additive-only use of `../assets/style.css` tokens
- No cross-repo runtime links — proto-01 figures are transcribed directly into the HTML (published-site rule)
