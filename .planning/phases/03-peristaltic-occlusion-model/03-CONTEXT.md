---
phase: 3
name: Peristaltic Roller Occlusion & Displaced-Volume Model
status: ready-to-execute
created: 2026-05-31
---

# Phase 3 Context — Peristaltic Roller Occlusion & Displaced-Volume Model

## Goal

Build a single self-contained tool page that documents and models the tube-deformation geometry for a peristaltic pump roller. The page is structured as a two-part academic reference tool: Part 1 covers the tube cross-section stadium model; Part 2 covers the axial contact length and displaced-volume model. Each part has a theory/documentation block followed by an interactive calculator.

The page must be professional enough to serve as a citable, readable reference for thesis examiners.

## Tool Folder

`tools/peristaltic-roller-displaced-volume-model/` — already exists.

## Output Files

- `tools/peristaltic-roller-displaced-volume-model/index.html` — the single combined tool page (CREATE)
- `tools/peristaltic-roller-displaced-volume-model/SPEC.md` — permanent spec (CREATE)
- `tools/peristaltic-roller-displaced-volume-model/katex/katex.min.css` — local KaTeX copy (CREATE)
- `tools/peristaltic-roller-displaced-volume-model/katex/katex.min.js` — local KaTeX copy (CREATE)
- `tools/peristaltic-roller-displaced-volume-model/katex/auto-render.min.js` — local KaTeX auto-render (CREATE)
- `index.html` — add new tool card (UPDATE)
- `README.md` — add shipped row (UPDATE)
- `CLAUDE.md` — update folder structure (UPDATE)
- `.planning/ROADMAP.md` — add Phase 3 (UPDATE)
- `.planning/REQUIREMENTS.md` — add OCCL-01–OCCL-04 requirements (UPDATE)
- `.planning/STATE.md` — update (UPDATE)

## Source Files (port logic from these, do not use them as the final output)

- `tools/peristaltic-roller-displaced-volume-model/stadium_cross_section.html` — SVG logic + geometry functions
- `tools/peristaltic-roller-displaced-volume-model/peristaltic_occlusion_model.html` — calculator logic
- `tools/peristaltic-roller-displaced-volume-model/stadium_model_documentation.md` — full cross-section theory
- `tools/peristaltic-roller-displaced-volume-model/Peristaltic roller occlusion & displaced-volume model - Description.md` — full occlusion theory

---

## Page Structure

```
TOOL NAV BAR  ← All tools  |  tool name
TOOL HEADER   h1 + subtitle

PART 1: Tube Cross-Section — The Stadium Model
  § 1.1 theory card
       purpose & motivation
       symbol table
       perimeter conservation assumption
       geometry derivation (KaTeX formulas)
       gap equation (KaTeX)
       assumptions
       parameters & sources
  § 1.2 interactive figure card
       3 state buttons (No contact / Walls kiss / Compression fit)
       3 sliders (wall, ID d, interference δ)
       SVG (left: undeformed circle | right: deformed stadium)
       output readouts

PART 2: Displaced Volume & Contact Length Model
  § 2.1 theory card
       purpose
       contact length L_c (KaTeX)
       displaced volume V_roller (KaTeX)
       extra arc ΔArc (KaTeX)
       calibration hooks
       key assumptions (numbered)
       parameters & sources
  § 2.2 interactive calculator card
       inputs: bearing OD selector, tube ID selector, wall slider,
               δ slider, N_contact slider, k slider
       outputs: G, L_c, V_roller, V_total, ΔArc, A_lumen
       warning strip (δ vs wall checks)

FOOTER
```

---

## Key Implementation Decisions

### LaTeX Rendering
- **Library:** KaTeX (lightweight, fast, no server required)
- **Primary:** CDN `https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/`
- **Local fallback:** `katex/katex.min.css`, `katex/katex.min.js`, `katex/auto-render.min.js`
- **Fallback loading:** JS checks if CDN load fails and re-inserts `<link>`/`<script>` from local path
- **Fonts:** CDN only (the ~100 woff2 font files are not locally bundled). Offline use renders with browser's fallback math fonts — legible but not KaTeX-quality typography.
- **Auto-render:** use `renderMathInElement` with delimiters `$$...$$` (display) and `$...$` (inline)
- **Color fix:** KaTeX `--katex-color` and `.katex` inherit page text color via CSS

### No EN/IT Translation
No `data-i18n` attributes, no `lang` switcher, no localStorage language key. English only.

### SVG Cross-Section Figure
Ported directly from `stadium_cross_section.html`. SVG colours updated to match dark glassmorphic theme:
- Lumen fill: `rgba(255, 107, 43, 0.18)` (accent)
- Lumen stroke: `var(--accent)` (#ff6b2b)
- Wall fill: `rgba(255,255,255,0.06)`
- Wall stroke: `rgba(255,255,255,0.25)`
- Roller: `rgba(255,255,255,0.10)` fill, `rgba(255,255,255,0.30)` stroke
- Backing wall: `var(--text-muted)` (#7a7068)
- Labels: `var(--text-muted)` (#7a7068)
- Dimension markers: `var(--accent)`

### Tool Inputs — Interaction Design
Both calculators use the established rotor-solver pattern:
- Range sliders with live `<output>` display
- Accent-coloured value readouts
- `recompute()` / `draw()` called on every `oninput` event
- Orange `.warn` strip for engineering limits (δ vs wall)

### CSS Architecture
- `assets/style.css` imported (design tokens + blobs + nav pattern)
- Inline `<style>` block for page-specific styles only
- No changes to `assets/style.css`
- Theory cards get a subtle `border-left: 3px solid rgba(255,107,43,0.35)` accent for academic look
- Formula display blocks: `text-align: center; margin: 1.4em 0; overflow-x: auto`

### Formula Notation (KaTeX source strings)
Key formulas to typeset:

Cross-section (Part 1):
- `P = \pi d` (conserved perimeter)
- `P = 2L_w + \pi h`  →  `L_w = \dfrac{\pi(d - h)}{2}`
- `A(h) = L_w \cdot h + \pi\!\left(\dfrac{h}{2}\right)^{\!2}`
- Simplified: `A(h) = \dfrac{\pi}{2}\,d\,h - \dfrac{\pi}{4}\,h^2`
- Limits: `A(d) = A_0 = \dfrac{\pi d^2}{4}`,  `A(0) = 0`
- Gap states: `G_{\text{no contact}} = d + 2w`,  `G_{\text{kiss}} = 2w`,  `G_{\text{fit}} = 2w - \delta`

Occlusion model (Part 2):
- `L_c \approx k \cdot 2\sqrt{2\,R_r\,\delta}`
- `V_{\text{roller}} = \dfrac{\pi d^2}{4} \cdot L_c`
- `\Delta\text{Arc} = L_c` (per engaged roller)
- `\Delta\text{Arc}_{\text{total}} = N_c \cdot L_c`
- Recommended: `\delta = (0.10 \text{–} 0.20)\times 2w`

---

## Requirements Captured

| ID | Requirement |
|----|-------------|
| OCCL-01 | Tool page exists at `tools/peristaltic-roller-displaced-volume-model/index.html`; linked from landing page |
| OCCL-02 | Page has two clearly separated sections: (1) stadium cross-section model with theory + interactive SVG figure; (2) displaced-volume model with theory + interactive calculator |
| OCCL-03 | All formulas are rendered in LaTeX via KaTeX; CDN primary, local katex/ folder as offline fallback |
| OCCL-04 | No EN/IT language toggle; English only; all logic and styles inline; no changes to `assets/style.css` |

---

## Notes for Implementation

- The SVG figure state is controlled by `let state = 2` and three buttons. Preserve this exactly.
- The `draw()` function must be called after page load and after each input event.
- The `recompute()` for Part 2 must call `draw()` in Part 1 if both share the same sliders — but they don't; Part 1 and Part 2 have independent input sets. Use distinct element IDs (prefix `s1-` and `s2-` if needed).
- KaTeX `renderMathInElement` must be called AFTER the KaTeX JS loads. Use `defer` + a `DOMContentLoaded` listener or inline at end of body.
- Offline fallback script pattern: attach `onerror` to the CDN `<script>` tag; on error, create a new `<script>` pointing to the local path.
