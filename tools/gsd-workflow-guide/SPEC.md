# SPEC: GSD Workflow Guide

## Purpose

Interactive reference page displaying the GSD (Get Shit Done) spec-driven development
workflow as a visual diagram. Demonstrates the discuss → plan → execute loop used to build
this thesis tools site. Serves as a personal methodology reference and thesis showcase artifact.

## Inputs

None — static content only, no user-configurable inputs.

## Outputs / Content Areas

### Core Loop (top-to-bottom flow with CSS arrows)

Seven command nodes rendered in order:

| Order | Command | Type | Slash |
|-------|---------|------|-------|
| 1 | spec-phase | optional | `/gsd:spec-phase N` |
| 2 | discuss-phase | core | `/gsd:discuss-phase N` |
| 3 | plan-phase | core | `/gsd:plan-phase N` |
| 4 | execute-phase | core | `/gsd:execute-phase N` |
| 5 | verify-work | optional | `/gsd:verify-work N` |
| 6 | code-review | optional | `/gsd:code-review N` |
| 7 | ship | optional | `/gsd:ship N` |

### Utility Commands Sidebar

Six utility command nodes in a sticky sidebar column:

| Command | Slash |
|---------|-------|
| progress | `/gsd:progress` |
| quick | `/gsd:quick [task]` |
| fast | `/gsd:fast` |
| debug | `/gsd:debug [description]` |
| explore | `/gsd:explore [idea]` |
| capture | `/gsd:capture [topic]` |

## Interaction Model

- Each node displays command name (monospace, accent color) + one-line brief description (always visible)
- Clicking a node toggles it open/closed (CSS `max-height` + `opacity` transition)
- Open state: full description paragraph + exact slash command are revealed
- Multiple nodes can be open simultaneously
- Visual distinction: optional nodes use `border-style: dashed`; core nodes use solid border

## Layout

- Two-column grid: flow column (left, flexible) + sidebar (right, 280px fixed)
- Breakpoint: single-column below 720px viewport width
- Arrows: CSS pseudo-elements, no SVG

## Assumptions

- Content is static; no dynamic calculation
- GSD command names and descriptions sourced from the open-gsd/get-shit-done-redux repository (2026-05-30)
- Commands may be updated in future GSD versions; this spec reflects the version used during thesis development

## Constants / Hardcoded Values

- Sidebar width: 280px
- Mobile breakpoint: 720px
- Node expand transition: max-height 0.3s ease, opacity 0.25s ease
- Flow arrow height: 28px
- Optional badge: "optional" label, uppercase, `var(--text-muted)` color, dashed border
