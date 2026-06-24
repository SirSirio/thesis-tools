# Phase 5: HTML Presentation Decks - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-24
**Phase:** 05-html-presentation-decks
**Areas discussed:** Deck architecture, Embedding live tools, Navigation & deep-linking

> Note: this discussion spanned two sessions (the first was interrupted by an API error mid-flow). Deck architecture was completed in session 1; Embedding live tools and Navigation in session 2. The full set of decisions is consolidated here.

---

## Deck architecture

### Runtime packaging
| Option | Description | Selected |
|--------|-------------|----------|
| Shared runtime (deck.css + deck.js) | Reused by every deck; decks are thin HTML | ✓ |
| Inline per deck | Each deck self-contained, no shared files | |
| Copy-paste template | Duplicate boilerplate per deck | |

**User's choice:** Shared runtime.
**Notes:** Acknowledged as a deliberate, justified break from the inline-only norm.

### Deck location & slide markup
| Option | Description | Selected |
|--------|-------------|----------|
| decks/<slug>/index.html, flat <section> slides | Mirrors tools/ and prototypes/ | ✓ |
| Single file, nested structure | | |
| tools/<slug> co-location | | |

**User's choice:** decks/<slug>/index.html with flat `<section class="slide">`.

### Slide sizing
| Option | Description | Selected |
|--------|-------------|----------|
| PowerPoint 16:9 fixed canvas, scale-to-fit | 1280×720, letterboxed | ✓ |
| Fluid/responsive | | |
| Fullscreen reflow | | |

**User's choice:** "The size should be the size of a powerpoint presentation, the standard one." → 16:9 1280×720, scale-to-fit + letterbox.

### Index list/metadata source
| Option | Description | Selected |
|--------|-------------|----------|
| Hand-authored cards, real page nav | One card per deck, full page load to deck | ✓ |
| JSON manifest | | |
| In-page swap (Phase 4 style) | | |

**User's choice:** Each presentation is its own HTML page (real page load). Explicitly disliked the Phase-4 in-page swap. Decks are one-shot / rarely edited → hand-authored cards. Requested "some magic" on the index.

### Index "magic"
| Option | Description | Selected |
|--------|-------------|----------|
| Card-deck fan / deal-out | Decks fan out / deal like a deck of cards | ✓ |
| (alt metaphor B) | | |
| (alt metaphor C) | | |

**User's choice:** Card-deck fan / deal-out.

---

## Embedding live tools

### Embed mode
| Option | Description | Selected |
|--------|-------------|----------|
| Live iframe of the real tool | Interactive, always in sync | ✓ |
| Screenshot / static image | Light, but stale & non-interactive | |
| Hybrid: image default, click to go live | | |

**User's choice:** Live iframe of the real tool.

### Iframe framing
| Option | Description | Selected |
|--------|-------------|----------|
| Full-bleed, tool as-is | | |
| Framed panel + slide title/caption | ~70% panel, reads as a slide | ✓ |
| Full-bleed + deep-link to anchor | | |

**User's choice:** Framed panel + slide title.
**Notes:** "Embed the other page in the slide, so if the tool gets updated, then I simply would have it there" — confirms live embed with a slide title retained.

### Test-campaign app (external)
| Option | Description | Selected |
|--------|-------------|----------|
| Screenshots / short screen-recording | Checked into deck folder; offline-safe | ✓ |
| Live iframe to localhost | Broken unless app running / on Pages | |
| Copy a built snapshot into the deck | | |

**User's choice:** Screenshots / short screen-recording (app is external to this site). Slide keeps a title.

### Focus / keyboard handling
| Option | Description | Selected |
|--------|-------------|----------|
| Click-to-activate the iframe | Inert until clicked; Esc/click-out returns keys | ✓ |
| Always live, deck keys still win | | |
| Always live, full control to tool | | |

**User's choice:** Click-to-activate the iframe.

---

## Navigation & deep-linking

### Deep-linking
| Option | Description | Selected |
|--------|-------------|----------|
| Hash per slide (#/7 or #slide-7) | Slide-citable, refresh-safe, back/forward | ✓ |
| Hash per slide + per fragment | | |
| No deep-linking | | |

**User's choice:** Hash per slide.

### On-screen nav aids (multi-select)
| Option | Description | Selected |
|--------|-------------|----------|
| Thin progress bar | Accent-gradient edge bar | ✓ |
| Slide counter (7 / 24) | | ✓ |
| Prev/next arrow buttons | | ✓ |
| Nothing — clean slides | | |

**User's choice:** Progress bar + counter + arrows.

### Fragment stepping
| Option | Description | Selected |
|--------|-------------|----------|
| Reveal-style: step then advance | One key builds slide, then advances | ✓ |
| Separate keys | | |
| No fragment stepping | | |

**User's choice:** Reveal-style.

### Jump affordances (multi-select)
| Option | Description | Selected |
|--------|-------------|----------|
| Overview grid (press O / Esc) | Thumbnail grid, click to jump | ✓ |
| "← Presentations" link back to index | Mirrors "← All tools" pattern | ✓ |
| Home/End to first/last slide | | |
| Keep it linear only | | |

**User's choice:** Overview grid + back-to-index link.

---

## Claude's Discretion

- Slide-transition style and fragment animation curves (within bespoke, reduced-motion-guarded constraint).
- Exact hash format, overview-grid layout, idle-fade timing.
- iframe scaling / lazy-loading mechanics inside the framed panel.
- Whether decks honor the site ENG/IT switch or are single-language (decide at planning).

## Deferred Ideas

- Fragment-level deep linking (`#/7/2`) — deferred in favor of slide-granular URLs.
- Home/End jump keys — offered, not selected.
- Additional decks beyond the first lab-meeting deck — runtime supports them; out of scope now.
- Live-iframe embed of a static export of the test-campaign app — deferred; screenshots for now.
