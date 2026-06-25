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

Per-prototype sections in order (proto-01 as the reference layout):
1. **Hero figure** — CAD render pair (closed / open)
2. **Purpose** — why built and what it tests
3. **Parameters (as built)** — dimensions/materials table (errors flagged ⚠) + tool screenshots
4. **The design calculation, worked** — `.calc-block` monospace formula chain + insight callout
5. **What actually happened** — gap/occlusion failure, paper-shim quantification, model-validation callout, error-budget table
6. **Results** — hero stat-cards + CSS bar chart + method-comparison table
7. **Wall thickness** — measurement-limitation note
8. **Noise & vibration test** — firmware stat-cards + chosen operating point + circuit photo
9. **Issues observed** — bullet list + real-build photo
10. **→ Inputs for Proto-02** — `.next-brief` design-brief block (the forward pointer that seeds the next prototype page)
11. **Why 4 rollers** — design rationale + honest-caveat callout

← Back to journey control returns to the path view.

**Reusable components added in this build:** `.proto-card-thumb` (circular real-photo node on the journey card), `.detail-figure` / `.figure-grid` (single + 2-up images), `.calc-block` (worked formulas), `.callout` (good/warn/note), `.next-brief` (forward design brief). Images live in each prototype folder as `PrototypeN_*.{png,jpg}` and are referenced by relative path from `prototypes/` (e.g. `Prototype-1-Pump-Module/proto-01-5ul-4roller/Prototype1_Real_Closed.jpg`).

## Animation Technique

- SVG `<path pathLength="1">` with `stroke-dasharray` CSS transition (NOT `stroke-dashoffset` — reversed in some browsers)
- `IntersectionObserver` adds `.is-visible` class when `.stage-inner` scrolls into view (off-main-thread, fires once)
- Node pop-in via staggered `transition-delay` sequenced after path draw
- All motion inside `@media (prefers-reduced-motion: no-preference)` only — default CSS renders everything visible; JS guard handles the reduced-motion state at runtime

## Mobile Behaviour (≤ 640px)

- SVG path hidden (`display: none`)
- `.proto-node` reverts to `position: static`, full-width vertical stack
- No horizontal scroll guaranteed at 375px viewport

## Prototype Registry

### Prototype-1-Pump-Module

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| proto-01 | 5 µL 4-roller peristaltic | Built — redesign pending | −32.2 % under-dispense; ≈3.39 µL/stroke (grav); model validated to ~11 %; 3 design errors found (N_c, gap, head lock) |
| proto-02 | 5 µL 4-roller — corrected geometry | In design | N_c=2 (R≈19.7 mm), 4-head gap sweep (1.25/1.45/1.65/1.85 mm) with caliper slots, screw-clamp lock, 0.10 mm fit; targets mean ~5 µL known + CV ≤ 5 % |

### Prototype-2-Alignment-Module

| ID | Title | Status | Key result |
|----|-------|--------|------------|
| — | (none yet) | Not yet designed | Module created; design work to begin |

## Constraints

- Static site only — no build tools, no npm, no frameworks; must work offline via serve.bat and on GitHub Pages
- HTML is the content source of truth — no JSON/markdown fetch, no generator
- No CDN-only dependencies — all resources inline or local
- No horizontal scroll at 1280px and 375px viewports (project hard rule)
- Tool-specific styles inline in `<style>`; additive-only use of `../assets/style.css` tokens
- No cross-repo runtime links — proto-01 figures are transcribed directly into the HTML (published-site rule)
