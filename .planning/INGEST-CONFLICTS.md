## Conflict Detection Report

### BLOCKERS (1)

[BLOCKER] Cross-reference cycle between DOC documents
  Found: README.md (DOC) lists CLAUDE.md in cross_refs; CLAUDE.md (DOC) lists README.md in cross_refs — these two nodes form a directed reference cycle.
  Expected: No cycles in the cross-reference graph (DFS cycle detection, per synthesis rules).
  → This is a mutual documentation reference (each file points to the other for orientation). Because both are DOC-type with no locked decisions, no synthesis correctness is harmed. To formally resolve: remove the back-reference from one file (e.g., remove README.md from CLAUDE.md's cross_refs, since CLAUDE.md is the canonical project orientation and README.md is the public-facing summary), OR annotate both in the manifest with cycle-exempt: true if the ingest toolchain supports it. All other docs outside this cycle have been synthesized normally.

### WARNINGS (0)

(none)

### INFO (3)

[INFO] ADR documents have no explicit "Accepted" status
  Note: All four ADR decisions in openspec/changes/language-switcher-eng-it/design.md (D1–D4) and the two motor panel decisions from openspec/changes/motor-microstepping-panel/proposal.md are classified as proposed, not locked, because no explicit "Status: Accepted" frontmatter is present in their source files. They are recorded in decisions.md without locked=true and will not block downstream synthesis. If these decisions are finalised, add a "Status: Accepted" line to the source ADR and re-run ingest.
  source: openspec/changes/language-switcher-eng-it/design.md, openspec/changes/motor-microstepping-panel/proposal.md

[INFO] PRD confidence is medium for language-switcher proposal
  Note: language-switcher-proposal.json has confidence: medium because proposal.md has no explicit user-story or acceptance-criteria sections. The doc was classified as PRD based on its "Why / What Changes / Capabilities / Impact" structure. All requirements have been extracted from the higher-confidence SPEC (spec-language-switcher-a3f7c2b1.json, confidence: high) which covers the same scope with full acceptance scenarios. The medium-confidence PRD requirements are a subset; no information was lost.
  source: openspec/changes/language-switcher-eng-it/proposal.md

[INFO] ROADMAP.md Planned section is empty
  Note: ROADMAP.md has a Planned table with a placeholder row and no real entries. The two active in-progress features (language-switcher, motor-microstepping-panel) are not listed in ROADMAP.md Planned. This is a documentation staleness issue, not a synthesis conflict. Downstream roadmapper should update ROADMAP.md to add both features.
  source: ROADMAP.md, openspec/changes/language-switcher-eng-it/proposal.md, openspec/changes/motor-microstepping-panel/proposal.md
