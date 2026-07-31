# Phase 10 — Context

**Phase:** Prototype Design Space — Alignment Module Thread and Detail Subpage Split
**Date:** 2026-07-31
**Mode:** YOLO — decisions taken by the assistant on the user's explicit authorisation, not gathered by questioning.

---

## 1. Why this phase exists

`prototypes/index.html` was built in Phase 4 for **one module** (the pump). It is now a
2210-line single-page app: a journey view with one hard-coded S-curve and five nodes,
plus two enormous inline detail views (proto-01 ≈ 270 lines, proto-02 ≈ 1070 lines)
toggled by `hidden`.

Two things broke that shape:

1. **A second module now has real, documented, bench-validated content.** The Alignment
   Module reached V2.1 on 2026-07-31 — a homing microswitch, three-pass homing, a
   measured repeatable zero of ≤ 0.03 mm, and a 5× speed-up. It deserves its own thread,
   not a footnote in the pump one.
2. **The single-file pattern has hit its ceiling.** Adding a second module's detail views
   inline would push the file past 3000 lines. The user's instruction: *"I would like for
   that page to have proper subpages from now on, so I think you should split them a bit."*

---

## 2. Decisions taken

### D-10-1 — Two threads, not one merged timeline
The journey view becomes **two independent, stacked threads**, each with its own heading,
its own S-curve path, and its own node set. The pump thread keeps its five nodes; the
alignment thread gets four. They are not interleaved chronologically — a reader following
the pump story should not have alignment nodes cutting across it.

### D-10-2 — Per-thread accent colour via CSS custom properties
The pump thread keeps orange/red. The alignment thread gets a **violet → indigo-blue**
family.

| Token | Pump thread | Alignment thread |
|-------|-------------|------------------|
| `--t-accent` | `#ff6b2b` | `#9b7fe0` |
| `--t-accent-2` | `#e83535` | `#5a8fd8` |
| `--t-accent-soft` | `#ffb08a` | `#c3aef5` |
| `--t-glow` | `rgba(255,107,43,0.25)` | `rgba(155,127,224,0.28)` |
| `--t-border` | `rgba(255,107,43,0.18)` | `rgba(155,127,224,0.22)` |
| `--t-path` | `rgba(255,107,43,0.25)` | `rgba(155,127,224,0.28)` |

**Why violet:** it already ships on this site — `tools/pump-testing/` Layer 2 uses
`#9b7fe0` / `#c3aef5` on the same dark glass background and is visually validated. Picking
a colour that already works beats inventing one. Violet→blue mirrors the pump's
orange→red (two neighbouring hues at similar luminance), so the two threads read as
siblings in one system rather than two unrelated designs.

**Implementation rule:** the thread accent must be applied through `--t-*` variables set on
the thread wrapper, *not* by overriding the global `--accent`. The global tokens stay
orange because the nav, the background blobs and every other page depend on them.
Critically, the existing SVG path stroke is a **hard-coded literal attribute** in the HTML
(`stroke="rgba(255,107,43,0.25)"`) — it must move into CSS or the second thread's curve
will be orange.

### D-10-3 — Detail views become co-located subpages
Each prototype's detail view moves out of `prototypes/index.html` into its **own
`index.html`, in the folder that already holds that prototype's `PROTOTYPE.md` and media**:

| Prototype | Subpage |
|-----------|---------|
| proto-01 | `prototypes/Prototype-1-Pump-Module/proto-01-5ul-4roller/index.html` |
| proto-02 | `prototypes/Prototype-1-Pump-Module/proto-02-5ul-4roller-v2/index.html` |
| align-01 | `prototypes/Prototype-2-Alignment-Module/index.html` |

**Why co-located rather than a flat `prototypes/proto-02/`:** it matches the convention the
whole repo already uses — the page sits next to its own spec and its own assets. Media
references collapse to bare filenames (`pump-head-web.mp4`,
`AlignmentModuelHomingV2.1.png`) instead of reaching across folders, and one folder stays
one prototype. The URLs are longer; that is the accepted cost.

### D-10-4 — A shared `assets/prototype-page.css`
Three subpages sharing one visual system justifies a shared stylesheet, on exactly the
precedent already sanctioned for `assets/deck.css` (shared runtime across one-shot decks).
The detail-view CSS currently inline in `prototypes/index.html` is extracted to
`assets/prototype-page.css` and consumed by all three subpages. Genuinely page-specific
rules stay in a small inline `<style>` on each subpage, per the standing rule.

This is a **new sanctioned shared asset** and must be recorded in `CLAUDE.md` alongside
`deck.css` / `deck.js` / `assets/fonts/` / `assets/gsap/`.

### D-10-5 — The journey page keeps no detail views at all
After the split, `prototypes/index.html` contains only the two-thread journey. The
`showDetail()` / `hidden`-toggle SPA machinery, the KaTeX script tags, the TOC builder and
the lightbox are removed from it — they move to the subpages that actually need them.
Cards become `<a href>` links, not `<button data-proto>`.

### D-10-6 — Alignment thread node set
Four nodes, derived from `PROTOTYPE.md` §11 version log and §10 next steps:

| Node | Card | State |
|------|------|-------|
| 1 | **V2 · Rack indexing stage** | Built ✅ — links to the align-01 subpage |
| 2 | **V2.1 · Homing** | Built + bench-validated ✅ — links to the subpage's homing section |
| 3 | **V3 · Long-stroke redesign + axis 2** | Ghost, not started |
| 4 | **V4 · Rack queueing** | Ghost, not started |

The alignment stage is shorter than the pump's, so its `min-height` must be its own value —
the current `2500px` is hard-coded for exactly five nodes and would stretch a four-node
curve over dead space.

### D-10-7 — The 36 MB video stays out
`Alignment_Module_V2.mp4` is ~36 MB. It is **not** linked from any page in this phase.
Re-encoding it the way `pump-head-web.mp4` was (~1.7 MB) is deferred. The 3 MB
`AlignmentModuelHomingV2.1.png` is used, as the hero image of the alignment subpage.

### D-10-8 — Content source of truth
The alignment subpage is written **from `prototypes/Prototype-2-Alignment-Module/PROTOTYPE.md`**,
which was rewritten earlier today from the firmware repository's `hardware.md`, `bench_align.cpp`
and `project-log.md`. No number may be invented. Values the source marks as *not measured*
(rail voltage under load, coil resistances, axis 2, the travel-budget negative control) must
be shown as gaps, not quietly omitted — the honesty of the record is part of its value.

Per project convention, **no internal shorthand codes in reader-facing prose.** Spell out
concepts. Requirement identifiers from the firmware repository do not belong on the page.

---

## 3. Constraints carried in

- Static HTML/CSS/JS only. No build step, no npm, no framework.
- Must work offline from a USB drive *and* on GitHub Pages → every path relative, no
  CDN-only dependency. proto-02's subpage needs the existing `prototypes/katex/` local
  fallback (confirmed present: `katex.min.css`, `katex.min.js`, `auto-render.min.js`, `fonts/`).
- No horizontal scroll on any page, at any width.
- Motion stays inside `@media (prefers-reduced-motion: no-preference)`; the page must render
  complete and readable with JS disabled and with motion suppressed.
- Do **not** open these files with VS Code Live Preview — it rewrites relative paths and
  strips inline `<script>` blocks.

---

## 4. Known hazards for the executor

1. **`alignNodesToPath()` is singular in three places** — `querySelector('.stage-inner')`,
   the observer callback that adds `.is-visible` to *all* `.proto-node`s globally, and the
   single `journeyPath` lookup. All three must become per-thread or thread B will animate
   when thread A scrolls into view.
2. **Node vertical position is keyed by element ID** (`#node-proto-01 { top: 1% }` …). That
   does not scale; move to a per-node custom property or `nth-child`.
3. **`--glass-border` is itself orange-tinted.** A thread that only overrides `--accent`
   still reads orange at its card borders.
4. **The proto-02 detail view contains inline SVG schematics, `<details>` version panels, a
   generated TOC and KaTeX math.** Extraction must carry all four, and the TOC script's
   selectors must still match after the move.
5. **Existing pending todo, folded into this phase:** prototype detail-view links to tools
   should open in a new tab (`target="_blank" rel="noopener"`).

---

## 5. Success criteria

- [ ] `prototypes/index.html` shows two visually distinct threads; the alignment thread is
      violet, the pump thread unchanged orange, and neither leaks into the other.
- [ ] Both threads animate independently on scroll; nodes sit on their own curve at every
      viewport width; no horizontal scroll at 320px, 640px, 1024px, 1440px.
- [ ] Three subpages exist and render standalone, each reachable from its journey card and
      each with a working back-link.
- [ ] proto-01 and proto-02 subpage content is **materially unchanged** from what the detail
      views showed — this is a move, not a rewrite. proto-02's math still renders offline.
- [ ] The alignment subpage documents V2 and V2.1 including the measured results and the
      explicit gaps, with no invented numbers.
- [ ] `prototypes/index.html` no longer contains any `.detail-section`.
- [ ] Registry rows in `prototypes/SPEC.md` and `prototypes/PROTOTYPES.md` reflect reality
      (both currently say the alignment module has no prototypes; both are wrong).
- [ ] `CLAUDE.md` folder structure and shared-asset list updated; `README.md` tool table row
      updated.
