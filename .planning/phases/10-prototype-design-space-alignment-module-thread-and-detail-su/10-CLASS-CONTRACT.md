# Phase 10 — Subpage class contract

Output of plan 10-01. **The authoritative class list is `assets/prototype-page.css` itself
(917 lines) — read it.** This file carries the parts you cannot infer from the stylesheet:
the skeleton, the accent contract, the path-depth rules, and the traps.

---

## Accent contract

Eight variables. **The one class that switches a page to violet is `.proto-page--align`,
placed on the same `<main>` as `.proto-page`.**

| Variable | Pump (default) | Alignment |
|---|---|---|
| `--p-accent` | `#ff6b2b` | `#9b7fe0` |
| `--p-accent-2` | `#e83535` | `#5a8fd8` |
| `--p-accent-soft` | `#ffb08a` | `#c3aef5` |
| `--p-glow` | `rgba(255,107,43,.25)` | `rgba(155,127,224,.28)` |
| `--p-border` | `rgba(255,107,43,.18)` | `rgba(155,127,224,.22)` |
| `--p-tint` | `rgba(255,107,43,.10)` | `rgba(155,127,224,.12)` |
| `--p-fill` | `rgba(255,107,43,.38)` | `rgba(155,127,224,.40)` |
| `--p-edge` | `rgba(255,107,43,.55)` | `rgba(155,127,224,.55)` |

**Never** use `--accent`, `--accent-2` or `--glass-border` for anything that should follow
the page — all three are globally orange.

Colours that deliberately do **not** follow the accent: green `#5fd08a` (good), red
`#e83535` (warn/fail — note that on the violet page `--p-accent-2` is *blue*, and a blue
warning reads as information), blue `#8fc0f0` (internal/CAD chips), and the numeric version
aliases `.ver-21/22/23`, `.toc-g21/22/23`.

New pages should use the **semantic** chip names (`.ver-fail` / `.ver-mid` / `.ver-pass`,
`.toc-group--accent/--fail/--mid/--pass`), not the pump-specific numeric ones.

---

## Path depth — get this wrong and the page is unstyled

| Page | `assets/` prefix | `prototypes/katex/` prefix | back-link to journey |
|---|---|---|---|
| `prototypes/Prototype-1-Pump-Module/proto-0N-*/index.html` | `../../../assets/` | `../../katex/` | `../../index.html` |
| `prototypes/Prototype-2-Alignment-Module/index.html` | `../../assets/` | `../katex/` | `../index.html` |

Link `assets/style.css` **first**, then `assets/prototype-page.css`.

---

## Skeleton

Depth shown is for a `proto-0N-*` page (three levels down). Adjust every `../` for the
alignment page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{PAGE_TITLE}} — Thesis Tools</title>
  <link rel="stylesheet" href="../../../assets/style.css" />
  <link rel="stylesheet" href="../../../assets/prototype-page.css" />
  <!-- only if the page has math -->
  <link rel="stylesheet" href="../../katex/katex.min.css" />
  <style>/* genuinely page-specific rules only */</style>
</head>
<body>

<div class="bg-blobs" aria-hidden="true">
  <div class="blob blob-1"></div><div class="blob blob-2"></div><div class="blob blob-3"></div>
</div>

<nav class="tool-nav">
  <a class="nav-back" href="../../index.html">&larr; Prototype journey</a>
  <span class="nav-title">{{SHORT_LABEL}}</span>
</nav>

<!-- add proto-page--align on the alignment page ONLY -->
<main class="proto-page">
  <a class="proto-back" href="../../index.html">&larr; Back to journey</a>

  <header class="proto-page-header animate-in" style="--delay:0s">
    <div class="proto-page-eyebrow">{{EYEBROW}}</div>
    <h1 class="proto-page-title">{{TITLE}}</h1>
    <div class="proto-status">
      <span class="status-chip status-chip--tested">{{CHIP}}</span>
      <span class="status-chip status-chip--warn">{{CHIP}}</span>
      <span class="status-chip status-chip--planned">{{CHIP}}</span>
    </div>
    <p class="proto-page-summary">{{ONE_LINE_SUMMARY}}</p>
    <p class="proto-page-meta">{{DATE_AND_SOURCE}}</p>
  </header>

  <div class="proto-page-body">
    <nav class="proto-toc" aria-label="Page contents">
      <div class="toc-title">Contents — click to jump</div>
      <div class="toc-grid">
        <div class="toc-group toc-group--accent">
          <div class="toc-group-label">{{GROUP}}</div>
          <a class="toc-link" href="#sec-purpose">{{LINK}}</a>
        </div>
      </div>
    </nav>

    <section class="detail-block" id="sec-purpose">
      <h2 class="block-heading">{{HEADING}}</h2>
      <p class="block-note">{{INTRO}}</p>
      <div class="callout callout-good">
        <span class="callout-label">{{LABEL}}</span> {{TEXT}}
      </div>
    </section>

    <section class="detail-block" id="sec-parameters">
      <h2 class="block-heading">{{HEADING}}</h2>
      <table class="param-table">
        <thead><tr><th>{{COL}}</th><th>{{COL}}</th></tr></thead>
        <tbody><tr><td>{{CELL}}</td><td class="num">{{VALUE}}</td></tr></tbody>
      </table>
      <!-- only if it genuinely cannot wrap:
      <div class="table-scroll"><table class="param-table">…</table></div> -->
    </section>

    <section class="detail-block" id="sec-results">
      <div class="stats-row">
        <div class="stat-card"><div class="stat-value">{{V}}</div><div class="stat-label">{{L}}</div></div>
        <div class="stat-card stat-warn"><div class="stat-value">{{V}}</div><div class="stat-label">{{L}}</div></div>
      </div>
      <figure class="detail-figure figure-compact">
        <img src="{{IMAGE}}" alt="{{ALT}}" />
        <figcaption>{{CAPTION}}</figcaption>
      </figure>
      <div class="detail-media">
        <video class="media-video" src="{{VIDEO}}" poster="{{POSTER}}"
               muted loop playsinline controls preload="metadata" aria-label="{{ALT}}"></video>
        <p class="media-caption">{{CAPTION}}</p>
      </div>
    </section>

    <section class="detail-block" id="sec-versions">
      <details class="ver-panel ver-pass" open>
        <summary>
          <span class="ver-chip">{{VERSION}}</span>
          <span class="ver-sum-note">{{ONE_LINE}}</span>
        </summary>
        <div class="ver-body"><section class="detail-block"><p>{{CONTENT}}</p></section></div>
      </details>
    </section>
  </div>
</main>

<div class="lightbox" id="lightbox" hidden>
  <button class="lightbox-close" id="lightbox-close" aria-label="Close">&times;</button>
  <img id="lightbox-img" src="" alt="" />
</div>

<script src="../../katex/katex.min.js" defer></script>
<script src="../../katex/auto-render.min.js" defer></script>
<script>
  window.addEventListener('load', () => {
    if (window.renderMathInElement) {
      renderMathInElement(document.body, {
        delimiters: [{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false}],
        throwOnError: false
      });
    }
  });
  // TOC: open any collapsed <details> ancestor before jumping.
  document.querySelectorAll('.toc-link').forEach(a => {
    a.addEventListener('click', () => {
      const t = document.querySelector(a.getAttribute('href'));
      let p = t && t.parentElement;
      while (p) { if (p.tagName === 'DETAILS') p.open = true; p = p.parentElement; }
    });
  });
  // Lightbox.
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeLightbox = () => { lightbox.hidden = true; lightboxImg.src = ''; };
  document.querySelectorAll('.detail-figure img, .figure-grid img, .fig-side img, .zoomable')
    .forEach(img => img.addEventListener('click', () => {
      lightboxImg.src = img.src; lightboxImg.alt = img.alt || ''; lightbox.hidden = false;
    }));
  lightbox.addEventListener('click', closeLightbox);
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });
</script>
</body>
</html>
```

---

## Traps

1. **`.proto-page` goes on `<main>`, not on an inner `<div>`.** `assets/style.css` styles
   bare `main` with its own max-width and padding; the stylesheet emits both `main.proto-page`
   and `.proto-page` so it wins. Put it on a `<div>` inside `<main>` and the padding doubles.
2. **`.tool-nav` / `.nav-back` / `.nav-title` are now owned by `prototype-page.css`.** They
   are *not* in `assets/style.css` — every other tool page redefines them inline. Do not
   redefine them; do not assume `style.css` provides them.
3. **`.detail-block[id]` uses `scroll-margin-top:88px`** to clear the sticky nav. Anchors need
   `id`s on `.detail-block` elements, not on the headings inside them.
4. **`.media-video` is height-constrained (`max-height:70vh; width:auto`), not
   aspect-ratio-constrained** — correct for the portrait pump-head clip. Landscape video takes
   `.media-video--wide`.
5. Legacy aliases exist so proto-01/proto-02 markup can move verbatim: `.detail-title`,
   `.detail-tag`, `.detail-header`, `.detail-section` (now a plain block), `.toc`,
   `.back-btn`, `.ver-21/22/23`, `.toc-g21/22/23`. **Use them only for the verbatim moves.**
6. The nav and lightbox sit outside `<main>`, so their violet variant relies on
   `body:has(.proto-page--align)`. If `:has()` is unsupported the nav stays orange and nothing
   else breaks.
7. **Do not link `prototype-page.css` from the journey page.** The journey page uses a
   different variable prefix (`--t-*`) at a different scope and still owns all its own
   `.journey-*` / `.proto-card*` / `.proto-node` / `.kpi-pill` CSS.
