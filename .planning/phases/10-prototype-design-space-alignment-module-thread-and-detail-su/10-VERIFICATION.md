# Phase 10 — Verification

**Date:** 2026-07-31
**Method:** pages served over `http://localhost:7331` and driven in a real browser.
Structural claims were measured in the DOM, not inferred from source.

---

## Success criteria

| Criterion | Result |
|---|---|
| Two visually distinct threads; alignment violet, pump unchanged orange, neither leaking | ✅ Measured. Pump path stroke `rgba(255,107,43,0.25)`, alignment `rgba(155,127,224,0.28)`. Grep for orange inside the `.thread--align` slice: 0 hits |
| Both threads animate **independently** | ✅ Both report `pathVisible: true` with `stroke-dasharray: 1px, 0px` (fully drawn) from their **own** observer. 5 of 5 and 4 of 4 nodes revealed per thread |
| Nodes sit on their own curve at every width | ✅ `alignNodesToPath()` returns per-thread lefts — pump `57.1 / 43.8 / 44.4 / 57.1 / 39.6 %`, alignment `60.6 / 39.7 / 60.5 / 41.0 %`. Each path sampled against only its own nodes |
| No horizontal scroll at 320 / 375 / 640 / 1024px | ✅ All four pages, all four widths, after two fixes (below) |
| Three subpages render standalone with working back-links | ✅ |
| proto-01 / proto-02 content materially unchanged | ✅ proto-01 tag-stripped text **byte-identical** (12 029 chars both sides), 11/11 blocks. proto-02: 18/18 blocks, 4/4 version panels, 21 tables, 4 inline SVGs, 19 TOC links, zero words dropped |
| proto-02 math still renders offline | ✅ `renderMathInElement` config byte-identical to the original; local fallback `../../katex/` with `fonts/` present. Note the original uses `\[ \]` / `\( \)`, not `$$` |
| Alignment page documents V2 + V2.1 with no invented numbers | ✅ 14 numeric claims traced to specific lines in `PROTOTYPE.md` |
| Alignment page surfaces the gaps | ✅ All five present: stroke shortfall, axis 2 never wired, travel-budget control never run, rail voltage + coil resistance never measured, switch release distance unmeasured |
| `prototypes/index.html` contains no `.detail-section` | ✅ `grep -c` = 0. Also 0 for `katex`, `lightbox`, `showDetail`, `data-proto` |
| Registry rows reflect reality | ✅ Both files corrected |
| `CLAUDE.md` / `README.md` updated | ✅ All 23 tree paths confirmed on disk |

**Link check:** every internal `href`/`src` across all four pages resolves. Three
apparent misses were a false positive from percent-decoding in the checking script; all
three return HTTP 200.

---

## Defects found by rendering, and fixed

1. **Alignment hero photo stretched ~3× vertically.** Rendered `836 × 1441` instead of
   `836 × 471`. `.detail-figure img` / `.fig-side img` set `width:100%` with no
   `height:auto`, so the `height="1441"` attribute was honoured as CSS. `.figure-grid img`
   already had the guard — the other two did not. Fixed in the shared stylesheet.
2. **Four wide tables pushed the document sideways at 320px** (proto-01 `sec-results`;
   alignment `sec-mechanism`, `sec-homing`, `sec-motion`). Fixed centrally rather than
   per-table: below 700px a `.param-table` not already inside `.table-scroll` becomes its
   own scroll container, so a table nobody hand-wrapped still cannot overflow the page.

## Pre-existing defects found and fixed in passing

3. **The journey page was blank with JavaScript disabled.** Node opacity was `0` and only
   JS ever added `.is-visible`. Now gated behind a `.js` class set inline in `<head>`.
4. **proto-02's masthead read "In design 2026"** while the page's own headline state is
   "v2.3 tested". Invisible inside the single-page app; a contradiction once the page
   stands alone.
5. **A dead TOC entry** — "Changes for 2.2" pointed at `#sec-v21`, the same target as the
   entry above it. The heading it meant to reach had no `id`.
6. **"lives in Proto 01"** was bold text, not a link. Now cross-links to the proto-01
   subpage.
7. **Standing todo cleared:** tool links from prototype pages now open in a new tab.

---

## Known-remaining, deliberately not done

- **`assets/style.css` ships `.animate-in { opacity: 0 }` with no `prefers-reduced-motion`
  guard.** Each new subpage carries a local guard; the shared stylesheet still does not, so
  every *other* page on the site is unguarded. Note this does **not** leave content
  invisible — browsers do not suppress CSS animations on their own — so the gap is that the
  site does not honour the preference, not that anything is broken. Site-wide fix deferred:
  it touches every page and belongs in its own change.
- **`Alignment_Module_V2.mp4` (~36 MB) is not linked from any page.** Re-encoding it the way
  `pump-head-web.mp4` was (~1.7 MB) is deferred.
- **The background blobs stay orange on the alignment thread.** They are page-level ambience
  outside any thread, so the violet thread sits on a faintly warm field. Left as-is —
  changing them would mean per-thread backgrounds, which is a larger design decision.
- **Root `ROADMAP.md` has no Prototype Design Space row** and never did. Out of phase scope.
- **proto-01/proto-02 heading levels are verbatim**, so those pages go `h1` → `h3`, skipping
  `h2`. Changing them risked breaking `.next-brief h4` styling during a move that was
  supposed to change nothing.
