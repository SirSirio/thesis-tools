# Phase 2: GSD Workflow Guide - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-30
**Phase:** 02-gsd-workflow-guide
**Areas discussed:** Diagram rendering, Interactivity level

---

## Area Selection

| Area | Selected for Discussion |
|------|------------------------|
| Diagram rendering | ✓ |
| Interactivity level | ✓ |
| Content scope | answered inline |
| Language switching | decided before formal discussion |

**Language switching:** User clarified: do NOT add EN/IT toggle to new tools/pages. Existing pages keep their toggles unchanged. This closes the question for all future tool phases.

---

## Diagram Rendering

### Connecting arrows

| Option | Description | Selected |
|--------|-------------|----------|
| CSS-only arrows | Nodes as HTML divs, arrows as CSS pseudo-elements/clip-path. Fully inline, no calculation needed. | ✓ |
| Inline SVG for arrows | SVG layer behind HTML nodes, allows curved paths and branching. More precise, more complex. | |
| You decide | Pick whichever keeps code simplest. | |

**User's choice:** CSS-only arrows (recommended option)
**Notes:** "It should be somewhat good looking though, and respect the styling that have been decided." — polish and design system fidelity explicitly required.

---

## Interactivity Level

### Expand content

| Option | Description | Selected |
|--------|-------------|----------|
| Description + example prompt | Shows 2-3 sentence description + exact slash command to type | ✓ |
| Description only | Just what the command does and when to use it | |
| You decide | Pick what makes it most useful as a reference | |

**User's choice:** Description + example prompt

### Expand behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Expand in-place below node | Node grows downward, other nodes stay | ✓ |
| Slide-in side panel | Right-side panel opens, diagram intact | |
| Tooltip / popover | Floating card near clicked node | |

**User's choice:** Expand in-place below the node

### Content scope

| Option | Description | Selected |
|--------|-------------|----------|
| Full picture | Core loop + optional steps + utility sidebar | ✓ |
| Core loop only | Just discuss → plan → execute | |
| Core loop + optional steps | No utility sidebar | |

**User's choice:** Full picture

### Diagram layout direction

| Option | Description | Selected |
|--------|-------------|----------|
| Top-to-bottom | Phases flow downward, branches hang off sides | |
| Left-to-right | Horizontal timeline/swimlane | |
| You decide | Pick for readability | ✓ |

**User's choice:** You decide (Claude's discretion)

### Page header

| Option | Description | Selected |
|--------|-------------|----------|
| Brief intro (1-2 sentences) | What GSD is + that it's used for this thesis | |
| No header | Diagram only | |
| Full explanation | Paragraph on spec-driven development + thesis context | ✓ |

**User's choice:** Full explanation — paragraph-length intro to spec-driven development and how this workflow was used throughout the thesis project.

### Tool folder name

**User's choice (free text):** "The name should be something like gsd-workflow-guide"
**Resolved to:** `tools/gsd-workflow-guide/`

---

## Claude's Discretion

- **Diagram layout direction:** top-to-bottom vs left-to-right — pick for readability of full content (core loop + optional branches + utility sidebar)
- **Single vs multiple nodes expanded simultaneously:** pick whichever feels most natural for a reference diagram
- **Visual treatment of optional vs mandatory steps:** dashed border, muted color, "optional" label — follow glassmorphic design language

---

## Deferred Ideas

- **Remove EN/IT toggle from existing pages** — user clarified they only meant "don't add it to new tools." No change to existing pages.
- **Project lifecycle overview** (new-project → roadmap → repeating phase loop) — mentioned in the pre-discussion conversation; excluded from this phase's scope.
