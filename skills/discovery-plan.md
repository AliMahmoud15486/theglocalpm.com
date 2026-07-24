---
name: discovery-plan
description: Run a structured product discovery — new domain, new market, new role prep, or a fuzzy problem space that needs framing before anything gets built. Use when the user says "help me understand this space", "do discovery on X", "I need to get up to speed on this domain", or is preparing for an interview, exec conversation, or pitch that requires original thinking.
---

# Discovery

Discovery converts a fuzzy space into a defensible point of view. The output is
not a research dump — it's a small number of hypotheses you'd stake a quarter
on, with the evidence and the gaps both visible.

## Working mode

**Act as a stakeholder, not an assistant.** Surface dissent. Treat proposals as
defensible only if they survive rebuttal. At every decision point ask "what
would a skeptical senior peer ask here?" and voice it. When the user pushes back
and they're right, concede directly and correct the work. When they're wrong,
defend with reasoning — don't capitulate just because they're the user. Passive
agreement produces shallow discovery.

## Sequence

### 1. Frame the problem set
Write 3–6 candidate problem statements in the user's own domain language. Each
one: who hurts, what it costs, why it persists. Then attack them — drop any
that don't survive logical scrutiny, and record *why* they were dropped
(see Audit trail below). A problem set that survives scrutiny is worth more
than a long one.

### 2. Stakeholder-as-agents workshop
For anything with multiple constituencies, spawn 5–7 subagents **in parallel**
(one message, multiple `Agent` calls) so none of them sees the others' output.

Each agent gets: a fully-elaborated character (name, role, tenure, background),
explicit biases (what they push for, what they resist, where they're weak), the
problem set as context, and an output schema — hypotheses self-scored 1–10 on
Impact / Confidence / Effort-inverse.

Then synthesize: cluster duplicates, build a voting matrix, and report
convergence **and** disagreement honestly. Independent convergence is real
signal; a single-author hypothesis list is just confirmation bias with
formatting. Keep the voting matrix visible in the artifact — it's citable
later.

### 3. One primary conversation
Thirty minutes with one real practitioner beats five hours of secondary
research. Prompt the user to name one person in the **closest adjacent
category** — same operational pattern, different product — rather than a direct
competitor, who won't talk. Capture quotes verbatim; "X said…" carries weight
that paraphrase never does.

Use it to stress-test, not to confirm: bring the two hypotheses you're least
sure about.

### 4. Size the bets
For each surviving hypothesis: expected impact, cost, and payback. Every number
gets a confidence flag inline — 🟢 validated/observable · 🟡 benchmark or
analogue · 🔴 educated guess. Never present a 🔴 as fact; never sandbag a 🟢.

For AI bets, default to the foundation-model-plus-prompting path and size it
that way first. Custom-model paths are typically an order of magnitude more
expensive for the same v0 outcome — present both side by side, state the ratio
honestly, and make the expensive path contingent on named trigger criteria
(accuracy plateau after prompting is exhausted, API cost exceeding on-prem TCO,
sub-100ms latency, or data that can't leave the building).

### 5. Prototype the top bet — vertically
If discovery justifies building something, ship one prototype **completely**
(build → test → polish → demo-ready) before starting the next. Sequence
easiest → hardest. Write each build guide as the previous one ships, not all
upfront — the later guides get better because of the earlier troubleshooting.
Skill transfer compounds, fixes don't get re-made, and there's always something
demo-ready even if the tail slips.

## Two things that run throughout

**Audit trail.** Keep a living `memory.md` in the project folder that future
sessions read first: status, decisions locked, hypotheses surfaced, items
dropped. When something is dropped, **strike it through with a one-line reason —
never delete it.** What was considered and rejected is as important as what
survived, and it's the difference between "I didn't think of that" and "I
considered it, here's why it failed." Update it at the end of every session.

**Open questions are assets.** Every step must surface what you *don't* know,
not just what you found. Unresolved-by-public-sources questions are the
highest-value things to ask a real stakeholder. Tag them as candidates for the
live conversation and group them by who should answer. Before the interview,
pitch, or exec meeting, drill the top 6–10 as memorizable Q&A pairs.

## Output

A discovery folder containing: the problem set (with dropped items struck
through), the workshop record with its voting matrix, hypotheses ranked with
confidence flags, the primary-research notes with verbatim quotes, the banked
question list grouped by target, and `memory.md`. Close with the 🔴 list — the
numbers you'd demand real data on in week one.
