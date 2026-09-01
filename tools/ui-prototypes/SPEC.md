# Operator Interface Prototypes — Tool Spec

**Purpose:** publish the operator-interface design record — five self-contained HTML pages on which
the interface of the dispensing instrument was actually designed — under one explanatory index page,
at a stable address the thesis prints. Chapter 9 of the thesis (User Interface Module) argues that
the interface was designed as *self-auditing web pages at the panel's real size* rather than as
static pictures; this page lets the reader open those pages and use them.

**This is a document/artifact page, not a calculator** (same D-01 no-calculator exception as
`tools/pump-testing/`). All interactivity lives inside the five archived artifacts themselves, plus
a small thumbnail-scaling script on the index.

---

## The address contract (load-bearing)

```
https://sirsirio.github.io/thesis-tools/tools/ui-prototypes/
```

The thesis carries a `\livetool` panel with this address and a QR code
(`latex/Chapters/09_User-Interface-Module.tex`, key `tool:ui-prototypes`). Once the thesis is handed
in, a printed copy cannot follow a moved link. **The path `tools/ui-prototypes/` is frozen.** If the
page must ever move, leave a redirect at this path.

---

## Files

```
tools/ui-prototypes/
├── index.html    Index page — explains the record, links and live-previews the five rounds
├── SPEC.md       This file
└── rounds/       The five artifacts, copied verbatim from the design record
    ├── round-1-five-candidates.html
    ├── round-2-three-candidates.html
    ├── round-3-chosen.html
    ├── home-colour-options.html
    └── home-round2-three-tiles.html
```

Source of the copies (not part of this repo):
`D:\Il mio Drive\...\3. Arduino Coding\Documentation\ui-design\` — whose `README.md` (rounds 1–3)
and `UI-EVOLUTION.md` (rounds 4–5, version history) are the authoritative narrative sources the
index page's copy was written from.

## The five artifacts

| File | Round | Frozen | What it decided |
|---|---|---|---|
| `round-1-five-candidates.html` | 1 | 2026-07-31 | Style and structure. Five candidates (A–E), static screens. Shortlisted Instrument, Guided run, Machine state; established the panel is not sunlight-readable, fixing dark-on-light polarity |
| `round-2-three-candidates.html` | 2 | 2026-08-09 | Information architecture. Three candidates (F–H), fully navigable 20-screen graph. G (Guided) chosen — its home layout, without the wizard |
| `round-3-chosen.html` | 3 | 2026-08-09 | **The chosen design**, light + dark, navigable. The pixel contract the LVGL firmware transcribes. 84 screen states audited, worst text contrast 7.4:1 after RGB565, two recorded target-size exceptions |
| `home-colour-options.html` | 4 | 2026-08-11 | Home-screen colour study: shipped screen recreated as fidelity benchmark + three treatments from the ColorBrewer Dark2 palette. Colour rails chosen |
| `home-round2-three-tiles.html` | 5 | 2026-08-11 | Home-screen structural study: three layouts, state switches for colour/liquids/position. Option D (two actions + liquid band) chosen and flashed same day |

**Rounds 1–3 designed the interface that was built; rounds 4–5 redesigned only the home screen,
after the interface had been used** (V2.2 in `UI-EVOLUTION.md`). The index page presents them as two
unequal arcs for this reason.

**Instrumentation differs by generation.** Rounds 1–3 carry the self-audit: view probes
(touch targets, RGB565 quantisation, sunlight glare; round 3 adds the device-dark runtime theme) and
an audit panel recomputed on every render (element count, smallest target, count under 44 px,
recorded exceptions, worst text contrast after quantisation). Rounds 4–5 are comparison boards: no
audit panel, machine-state switches instead (position unknown, liquid-level severity, colour
treatment). Rounds 1–3 render the panel at 1:1 (with zoom controls in rounds 1–2); rounds 4–5 are
hard-locked at 2× zoom.

---

## Verbatim rule

The five files are a **dated design record and thesis evidence**. They must not be edited — not even
typos: fixing anything inside a candidate changes the artifact the thesis cites. Exactly **two
mechanical changes** were made at publication (2026-09-01), each marked in-file with an HTML comment
pointing here:

1. **Fonts vendored (offline requirement).** Only the two `home-*.html` files referenced the
   network: three Google Fonts `<link>` tags each (Montserrat; weights 400;500;600;700 requested by
   `home-colour-options.html`, 400;500;600 by `home-round2-three-tiles.html`). Those three tags were
   replaced by one link to `../../../assets/fonts/montserrat/montserrat.css`. Rounds 1–3 make zero
   network requests and were not touched for fonts — their chrome is system-font by design.
2. **Back-link added.** Each file received one `<nav>` element at the top of `<body>` (for rounds
   1–3, which are head-less HTML fragments: directly after `</style>`) linking `../index.html` as
   "← All rounds", styled inline in the artifact's own muted mono so it does not alter the record's
   appearance. No existing markup was modified; the element was only inserted.

Everything else — every measured value, every recorded exception, every candidate — is byte-identical
to the design record.

## Vendored Montserrat (`assets/fonts/montserrat/`)

Per the `assets/fonts/geist/` precedent (D-20): font files + `LICENSE.txt` (SIL OFL 1.1, from the
upstream Montserrat repository) live under `assets/fonts/`, the sanctioned shared-asset location.

- Google Fonts v31 serves Montserrat as **variable-font woff2 files** (one file per script subset
  covers the whole weight axis), so two files replace all requested weights:
  `Montserrat-VF-latin.woff2` and `Montserrat-VF-latin-ext.woff2`, declared in `montserrat.css` as
  `font-weight: 400 700` with the original `unicode-range` values preserved.
- Only the latin and latin-ext subsets are vendored (the pages are English-only). Cyrillic,
  Vietnamese and other subsets that Google would serve on demand are not included; characters
  outside latin/latin-ext fall back to the system stack, exactly as they already do for glyphs
  Montserrat lacks.
- Montserrat is used **only inside the 320 × 240 mockup stages** of the two home studies (it stands
  in for the device font). Page chrome on all five artifacts is system-font.

## Index page (`index.html`)

- Site pattern: `assets/style.css` + local `<style>`, bg-blobs, `tool-nav` breadcrumb
  ("← All tools"), `animate-in` staggers, glass panels. English-only (document-first precedent,
  like `tools/pump-testing/`).
- Sections: (01) the self-audit instrument explained — four probe tiles + audit description and the
  rounds-4–5 scope note; (02) rounds 1–3 as cards; (03) rounds 4–5 as cards with the "not equal
  steps" framing; (04) provenance — verbatim rule, mechanical edits, frozen address.
- **Live previews:** each card's visual is the artifact itself in a scaled-down, inert `<iframe>`
  (`loading="lazy"`, `pointer-events: none`, `tabindex="-1"`, `aria-hidden` container). A small
  inline script sets `transform: scale()` from each thumb's `data-w` (virtual render width) and
  `data-y` (top crop in unscaled px). No screenshots are fabricated or maintained; the previews can
  never drift from the artifacts. Without JS the iframes fall back to a fixed `scale(0.25)`.
- Round 3's recorded audit figures (84 states, 7.4:1, 2 exceptions) are quoted as static stats on
  its card; the live values remain computable in the artifact itself.

## Assumptions and notes

- The artifacts are light-themed pages inside a dark site. Deliberate, and stated on the index page:
  they open "as they were drawn". Rounds 1–3 additionally honour `prefers-color-scheme: dark` on
  their own.
- Rounds 1–3 are HTML fragments (no doctype/html/head/body — artifact exports). Browsers render
  them fine; keep that in mind if they are ever post-processed.
- Offline verified 2026-09-01: with all five artifacts loaded through the index, the site makes
  zero non-local network requests; `document.fonts.check()` confirms Montserrat 400–700 resolves
  from the vendored files.
- If further rounds are ever frozen in the design record, copy them into `rounds/` under the same
  verbatim rule and add a card — do not restructure the existing five.
