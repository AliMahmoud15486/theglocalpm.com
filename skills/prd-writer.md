---
name: prd-writer
description: Write or review a PRD, spec, one-pager, or feature brief. Use when the user asks to "spec this out", "write a PRD", "write it up for eng", or hands over a feature idea to be documented. Also use to review an existing PRD before it goes to stakeholders.
---

# PRD writer

A PRD is a **decision document**, not a description of a feature. If a reader
can't tell what was decided, what was deliberately not built, and how we'll know
if it worked, it isn't done.

## Rules (non-negotiable)

1. **Problem before solution.** The first section is the problem and its
   evidence. If the requester opens with a solution, work backwards to the
   problem and write that first. If no problem can be articulated, say so and
   stop — that's the finding.
2. **Name the riskiest assumption explicitly.** Every PRD has one thing that,
   if false, makes the whole thing worthless. Put it in its own section with a
   plan to test it cheaply *before* the full build.
3. **Non-goals are mandatory.** Scope is defined by what you refuse. A PRD
   without non-goals will grow 40% in review.
4. **Confidence-flag every number.** 🟢 validated / observable · 🟡 industry
   benchmark or analogue · 🔴 educated guess. Never present a 🔴 as a fact and
   never sandbag a 🟢. Collect the 🔴s into a "measure first" list at the end.
5. **Slice vertically.** Break work into thin end-to-end slices that each
   deliver user-visible value, not horizontal layers ("build the API", "build
   the UI"). Sequence easiest → hardest so the team banks a working thing early.
6. **No estimates in the PRD.** Effort is engineering's call. Give sequence and
   priority, not story points or dates.
7. **Success metrics must be falsifiable.** "Improve engagement" is not a
   metric. Name the metric, the current baseline, the target, and the window.
   If there's no baseline, the first slice is instrumentation.
8. **Write for the skimmer.** Someone should get the whole story from the
   headings and the first line of each section.

## Structure

```markdown
# <Feature> — PRD
**Status:** Draft | In review | Approved   **Owner:** …   **Last updated:** …

## 1. Problem
What's broken, for whom, and how we know. Evidence with sources — support
volume, funnel data, interview quotes. If the evidence is thin, say so here.

## 2. Why now
What changed that makes this the right thing this quarter. Absence of a good
answer is itself a signal.

## 3. Riskiest assumption
The one belief that, if wrong, kills this. How we'd test it cheaply first.

## 4. Goals / Non-goals
Goals: outcomes, not features.
Non-goals: what we are explicitly not doing, and why.

## 5. Proposed solution
The shape of it. Diagrams / flows over prose. Include the alternatives
considered and why they lost — one line each.

## 6. Slices
| # | Slice | User-visible value | Depends on |
Thin, vertical, sequenced easiest → hardest.

## 7. Success metrics
| Metric | Baseline | Target | Window | Confidence |

## 8. Open questions
Unresolved items with an owner and a date. Not a graveyard.

## 9. Measure first (🔴 list)
Every low-confidence number above, restated as something to instrument on day 1.
```

For a **one-pager** (exec / investor / stakeholder), keep sections 1, 2, 3, 5,
7 only, hard-capped at one page, and end with the decision being asked for.

## AI features get an extra section

If the feature involves an LLM, add **"Build path"** and present both:

- **Path B — foundation model + prompting** (default; assume this)
- **Path A — custom/fine-tuned model** (contingency)

State the honest cost ratio. Path A is only justified when a named trigger
fires: accuracy plateaus after prompt engineering is exhausted, API cost exceeds
on-prem TCO at scale, latency demands on-device inference, or data can't leave
the building. Frame the upgrade as a contingency with criteria, never a
pre-commitment.

And if the AI touches a human decision (grading, pricing, moderation, routing,
approvals), apply the co-pilot rule: **the AI runs after the human commits, not
before.** Pre-decision AI anchors the human and erodes their judgment silently.
Default the "keep my decision" action; make "accept the suggestion" secondary;
stay silent when the AI agrees and only surface on disagreement.

## Reviewing an existing PRD

Read it as a skeptical senior peer, not a proofreader. Report, in order:
missing non-goals · unstated riskiest assumption · unfalsifiable metrics ·
horizontal slicing · numbers presented with false confidence · solution that
outran its evidence. Push back with reasoning. Concede immediately when the
author's counter is right.
