# Phase 4: Prototype Design Space - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-15
**Phase:** 4-prototype-design-space
**Areas discussed:** Journey visual & unravel, Results layout. (Design-capture mechanism + Reasoning-skills wiring deferred to a future phase.)

---

## Gray-area selection

| Option | Description | Selected |
|--------|-------------|----------|
| Journey visual & unravel | Path metaphor + how a prototype expands | ✓ |
| Results layout (per-prototype KPIs) | How Results are structured when each prototype defines its own KPIs | ✓ |
| Design-capture mechanism | /gsd:thread vs DESIGN-LOG.md | deferred |
| Reasoning-skills wiring | Skill storage/invokability + page transcription | deferred |

**User's choice:** Discuss the first two; defer the latter two — "more natural when I will be actually doing the process to answer and discuss/decide on them."

---

## Journey visual & unravel

### Path form
| Option | Description | Selected |
|--------|-------------|----------|
| Vertical timeline + glowing connector | Stacked, numbered nodes on a glowing line | |
| Winding SVG path | Curved S-path with cards docked along bends | ✓ |
| Plain staggered cards | Existing .tool-card stagger, no path | |

### Unravel interaction
| Option | Description | Selected |
|--------|-------------|----------|
| Inline accordion (in place) | Reuse GSD-guide .open pattern | |
| Swap to full detail view | Replace journey with focused single-prototype view + back | ✓ |
| Modal overlay | Glass modal over dimmed path | |

### Focus when one is open
| Option | Description | Selected |
|--------|-------------|----------|
| Single-open (auto-collapse others) | One focus at a time | ✓ |
| Multi-open (independent) | Several open at once | |

### Magic entrance
| Option | Description | Selected |
|--------|-------------|----------|
| Path draws + nodes pop in | Animated SVG line reveal, then sequential nodes | ✓ |
| Subtle fade-up only | Reuse existing fade-up | |
| You decide | Tasteful default | |

### Mobile behavior (375px)
| Option | Description | Selected |
|--------|-------------|----------|
| Straighten to vertical line | Winding path collapses to vertical timeline | ✓ |
| Keep winding, scaled | Preserve curves shrunk | |
| You decide | Most robust responsive approach | |

**Notes:** User explicitly rejected recycling the existing accordion/.tool-card patterns: "I do not want to recycle something, it should be fancier and more magic for this page... you can surprise me." Requested research for an animation that "just works the first time." A web-search research pass produced the locked technique (pathLength="1" + stroke-dasharray + IntersectionObserver + prefers-reduced-motion guard, no libraries) — see CONTEXT D-07..D-11.

---

## Results layout (per-prototype KPIs)

### Presentation
| Option | Description | Selected |
|--------|-------------|----------|
| Hero stat-cards + detail table | Headline metrics, then full table | ✓ (hero + then mostly free-form) |
| Detail table only | Numbers only | |
| Fully free-form per prototype | Bespoke each time | partial |

### Consistency
| Option | Description | Selected |
|--------|-------------|----------|
| Light shared skeleton you fill | Metric/Measured/Target/Verdict, rows flexible | ✓ |
| Bespoke each time | From scratch per prototype | |

### Charts
| Option | Description | Selected |
|--------|-------------|----------|
| One pure-CSS/SVG mini chart | Dependency-free visual (measured-vs-target) | ✓ (Claude's discretion on specifics) |
| Numbers & tables only (v1) | Defer charts | |
| You decide | Add only when it clarifies | ✓ |

**User's choice / Notes:** "Hero stat-card and then some sort of static design, but mostly free-form per prototype. Let's build something for this prototype, then I can retake the design and edit for other prototypes." On charts: "I want to have a visual with the key things, and then a bit more detailed data. You can decide." → proto-01 authored as the reusable reference layout (CONTEXT D-12..D-16).

---

## Claude's Discretion

- Exact page path (chose `prototypes/index.html`).
- Headline-visual specifics and where charts genuinely help.
- Winding-path curve geometry and node styling within the design system.

## Deferred Ideas

- Reasoning-skills showcase (SPEC #5) → future phase.
- Design-capture convention (SPEC #6) → future phase.
- Suggested "Phase 5: Prototype design-capture & reasoning-skills" to hold both.
- Advisor mode: run `/gsd:profile-user` after Phase 4 to enable it for future discussions.
