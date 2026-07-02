# Repo Review Prompt Pack

Version: 0.3.0
Tags: pack, repo, review, release, documentation

Use this pack for repository review, release readiness and documentation polish.

## When to Use

* Before a release, to check the repo reads as a product
* When onboarding to an unfamiliar repo and assessing its state
* When README, docs and command surface may have drifted from the code

## Recommended Modes

* Review
* Analyze
* Plan

## Starter Prompt

```text
Use Atlas One Review Mode.

Review this repository as a product and engineering artifact.

Focus on:
- README clarity
- release readiness
- docs consistency
- command surface truth
- source readability
- obvious missing checks

Return findings first, ordered by severity, then a short improvement plan.
```

## Expected Output

* Findings first, ordered by severity
* Each finding tied to a concrete file, doc or command
* A short, sequenced improvement plan after the findings

## Constraints

* Verify claims against the actual repo; do not assume from names
* Review and recommend only — no edits, commits or releases from this pack
* Defer execution to mq-agent and risk/security judgment to mq-mcp

## Example Usage

```text
Goal:
Review atlas-one before a hygiene release — README, ROADMAP and root layout.

Mode:
Review

Output:
Severity-ordered findings tied to files, then a short improvement plan.
```
