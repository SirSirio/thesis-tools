# Synthesis Summary

Entry point for gsd-roadmapper. All intel files are in this directory.

---

## Document counts by type

Total documents ingested: 8

- ADR: 1 (openspec/changes/language-switcher-eng-it/design.md)
- SPEC: 1 (openspec/changes/language-switcher-eng-it/specs/language-switcher/spec.md)
- PRD: 2 (openspec/changes/language-switcher-eng-it/proposal.md, openspec/changes/motor-microstepping-panel/proposal.md)
- DOC: 4 (CLAUDE.md, README.md, ROADMAP.md, openspec/changes/language-switcher-eng-it/tasks.md)

---

## Decisions locked

Locked decisions: 0

No ADR in the ingest set carries an explicit "Accepted" status. All decisions are recorded as proposed. See decisions.md for 8 decision entries (ADR-001 through ADR-008).

Decision source paths:
- openspec/changes/language-switcher-eng-it/design.md (ADR-001 through ADR-005)
- openspec/changes/motor-microstepping-panel/proposal.md (ADR-006, ADR-007)
- CLAUDE.md (ADR-008)

---

## Requirements extracted

Total requirements: 9

IDs: REQ-lang-toggle-present, REQ-lang-switch-translates-ui, REQ-lang-persistence, REQ-lang-localstorage-fallback, REQ-no-horizontal-scroll, REQ-motor-panel-inputs, REQ-motor-panel-outputs, REQ-motor-panel-hardcoded-params, REQ-motor-panel-containment

Feature groups:
- Language Switcher (ENG/IT): 5 requirements
- Motor & Microstepping Panel: 4 requirements

See requirements.md for full descriptions and acceptance criteria.

---

## Constraints

Total constraints: 12

Type breakdown:
- nfr (non-functional requirement): 4 (CONSTRAINT-001, -002, -003, -006)
- api-contract: 3 (CONSTRAINT-004, -005, -010)
- schema: 5 (CONSTRAINT-007, -008, -009, -011, -012)

See constraints.md for full descriptions.

---

## Context topics

Total topics: 8

- Project identity and scope
- Folder structure
- Design system
- Development workflow (OpenSpec)
- Shipped tools
- Planned / Backlog tools
- In-progress features (active OpenSpec changes)
- VS Code pitfalls
- Language switcher risks and trade-offs
- Language switcher migration plan and rollback

See context.md for full notes.

---

## Conflicts summary

1 blocker, 0 competing variants, 3 auto-resolved / info

Full report: .planning/INGEST-CONFLICTS.md

STATUS: BLOCKED — 1 blocker (cross-reference cycle between README.md and CLAUDE.md) must be reviewed before routing. Note: the cycle is between two DOC-type files with no locked decisions; no synthesis correctness is harmed. All 8 documents were synthesized. The blocker is surfaced per protocol and can be dismissed after review.

---

## Intel files

- .planning/intel/decisions.md — 8 decision entries from ADR/design sources
- .planning/intel/requirements.md — 9 requirement entries from PRD/SPEC sources
- .planning/intel/constraints.md — 12 constraint entries from SPEC/ADR/DOC sources
- .planning/intel/context.md — 10 context topics from DOC sources
- .planning/INGEST-CONFLICTS.md — conflict report (1 blocker, 0 warnings, 3 info)
