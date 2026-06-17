---
created: 2026-06-17T00:00:00Z
title: Open tool links in new tab from prototype detail view
area: ui
files:
  - prototypes/index.html
---

## Problem

In the Prototype Design Space detail view, links in the Parameters table (and any other in-page links to tools) navigate away from the prototype page. Since the detail view is a JS-driven swap (no page reload), navigating away loses the user's place entirely.

## Solution

Add `target="_blank" rel="noopener"` to all tool links in `prototypes/index.html` — specifically the Parameters table links (Rotor Solver, Peristaltic Roller Model) and any future per-prototype tool references.
