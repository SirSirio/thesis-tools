---
created: 2026-06-24T22:53:50+02:00
title: Clarify .agent vs .agents folder difference
area: general
files:
  - 
---

## Problem

The user is confused about the difference between the `.agent` and `.agents` folders and why they were both present. They want to understand the architecture and why deleting one broke the other.

## Solution

Explain that `.agents` is the canonical/official path where the AI looks for workspace customizations (skills, workflows, subagents). In this project, `.agents` was set up as a symlink pointing to the physical folder `.agent`. Because of this link, deleting `.agent` also broke the `.agents` path.
