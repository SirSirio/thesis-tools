# Phase 2 Research: GSD Workflow Guide

**Source:** https://github.com/open-gsd/get-shit-done-redux and USER-GUIDE.md
**Researched:** 2026-05-30

---

## GSD Core Concept

GSD (Get Shit Done) is a spec-driven development workflow for Claude Code that manages AI context and maintains code quality through a fixed command sequence. Each command spawns dedicated sub-agents in isolated contexts, keeping the main conversation lean.

**Core principle:** Decide → Plan → Execute — in that order, with verification after execution.

---

## Command Reference for Diagram

### Core Loop (left-to-right or top-to-bottom flow)

| Command | Slash | One-line description | Full description |
|---------|-------|---------------------|------------------|
| Discuss Phase | `/gsd:discuss-phase N` | Lock in implementation decisions before planning | Asks open-ended questions about how to build the phase. Surfaces design details — layouts, API structures, error handling — to eliminate ambiguity before planning begins. Produces `CONTEXT.md`. |
| Plan Phase | `/gsd:plan-phase N` | Research ecosystem, generate atomic task plans, verify | Spawns research agents, generates small task plans each executable in a fresh context, and verifies each plan achieves the phase goal. Produces `PLAN.md` files. |
| Execute Phase | `/gsd:execute-phase N` | Run plans in parallel waves with atomic commits | Runs task plans in dependency-ordered waves, each in a 200k-token context. Commits atomically per task. Keeps the main context at 30–40% capacity. |

### Optional Steps (branches off core loop)

| Command | Slash | Position in flow | One-line description | Full description |
|---------|-------|-----------------|---------------------|------------------|
| Spec Phase | `/gsd:spec-phase N` | Before discuss | Clarify WHAT the phase delivers before HOW | Scores ambiguity, forces scope decisions, produces `SPEC.md` before discussion begins. Use when requirements are unclear. |
| Verify Work | `/gsd:verify-work N` | After execute | Walk through testable deliverables, diagnose failures | Manual acceptance testing of completed work. Failures trigger diagnostic fix planning rather than manual debugging. |
| Code Review | `/gsd:code-review N` | After verify | Structured review of phase-changed files | Flags critical/warning/info findings scoped to the phase diff. `--fix` auto-applies fixes. |
| Ship | `/gsd:ship N` | After all phases | Create PR with auto-generated body | Converts verified phase work into a pull request with summary, changes, requirements addressed, and verification status. |

### Utility Commands (sidebar)

| Command | Slash | One-line description | Full description |
|---------|-------|---------------------|------------------|
| Progress | `/gsd:progress` | See current status and what step comes next | Auto-detects the next recommended command. Use `--next` to run it immediately. Central hub for situational awareness. |
| Quick | `/gsd:quick [task]` | Execute a focused task without full phase ceremony | For small, well-scoped changes that don't warrant a full discuss→plan→execute cycle. |
| Fast | `/gsd:fast` | Inline trivial task — no subagents, no overhead | Fastest path for truly trivial, one-step changes. No planning or subagent cost. |
| Debug | `/gsd:debug [description]` | Diagnose and fix a specific problem | Runs multi-cycle debugging with persistent state across context resets. `--diagnose` for analysis only. |
| Capture | `/gsd:capture [topic]` | Capture ideas into notes, todos, seeds, or new phases | Routes ideas to the right destination without interrupting current work. `--backlog` to park outside active sequence. |

---

## Recommended Full Workflow Sequence

```
[spec-phase]          ← optional: clarify scope first
    ↓
discuss-phase         ← lock implementation decisions
    ↓
[ui-phase]            ← optional: design contract for frontend
    ↓
plan-phase            ← research + atomic plans + verify
    ↓
execute-phase         ← parallel waves, atomic commits
    ↓
[code-review --fix]   ← optional: auto-fix code issues
    ↓
verify-work           ← acceptance testing
    ↓
ship                  ← PR creation
```

---

## Diagram Design Decisions (from CONTEXT.md)

- **Layout direction:** Claude's discretion → choose top-to-bottom for the core loop, utility sidebar on the right
- **Node rendering:** HTML `<div>` glassmorphic cards (no SVG, no canvas, no library)
- **Arrows:** CSS-only (pseudo-elements, border tricks, or clip-path)
- **Interaction:** Click node → expand in-place (CSS height/opacity transition, class toggle) → multiple nodes can stay open simultaneously (reference diagram use case)
- **Optional steps:** Visually distinct from core loop — use dashed orange border + "optional" label badge
- **Header:** Paragraph explaining spec-driven development and that this workflow was used for the thesis tools site

---

## Implementation Notes

- The `gsd:` prefix is the current command style (not `gsd-`). Diagram should show `/gsd:discuss-phase N` format.
- "spec-phase" sits before discuss in the optional branch — it's rarely needed for well-understood work
- "ui-phase" is frontend-specific; exclude from diagram per D-09 scope (keep tight to discuss→plan→execute loop)
- Utility commands sidebar is separate from the main flow — present as a compact reference card, not part of the flow diagram
