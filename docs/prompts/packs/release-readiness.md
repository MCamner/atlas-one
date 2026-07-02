# Release Readiness Prompt Pack

Version: 0.6.0
Tags: pack, release, readiness, review, mq-ecosystem

Use this pack to structure a release review for any mq repo. Wraps repo-signal
output and scripts/release-check.sh results in Atlas One Review mode for a
structured go / no-go assessment.

## Recommended Modes

* Review
* Decide
* Plan

## When to Use

* After running `scripts/release-check.sh` and reading the output
* After running `repo-signal` on a repo and reading its JSON contract
* Before tagging a release
* When deciding whether uncommitted changes, warnings or failures block a release

## Starter Prompt

```text
Use Atlas One Review Mode.

I am preparing to release version [version] of [repo].

Here is the release-check output:
[paste scripts/release-check.sh output or repo-signal report]

Assess release readiness:
- What passes?
- What warns?
- What fails?
- What is the severity of each issue?
- Which issues block the release and which do not?

Return:
- Findings table (issue / severity / blocking?)
- Go / no-go recommendation with conditions
```

## Follow-up: Fix Plan

```text
Use Atlas One Plan Mode.

Based on the release review findings, create a sequenced fix plan.

Include only the blocking issues. For each:
- What needs to change
- Where (file, script, doc)
- How to verify the fix
- Estimated effort (minutes / hours)

End with: the minimum change set needed to unblock the release.
```

## Follow-up: Release Decision

```text
Use Atlas One Decide Mode.

Given the review findings and fix plan, decide:

Option A: Release now with known issues documented
Option B: Fix blocking issues first, then release
Option C: Delay release pending further investigation

For each option:
- What gets shipped
- What risk is accepted
- Who needs to know

Recommend one path with a clear condition for when to change it.
```

## Quick commands

```bash
scripts/release-check.sh              # run automated checks
repo-signal . --format json           # get machine-readable readiness report
mqlaunch review                       # copy Atlas One review prompt
mqlaunch ask "release vX.Y.Z ready?"  # ask mqlaunch for assessment
```

## Expected Output

* A findings table: issue / severity / blocking?
* A clear go / no-go recommendation with conditions
* When fixing: a sequenced plan covering only the blocking issues

## Constraints

* Base the assessment on real check output (`release-check.sh` / repo-signal)
* Recommend a decision; the human tags the release
* Do not mark failures as non-blocking without stated justification

## Example Usage

```text
Goal:
Decide whether repo X is ready to tag v1.2.0 given release-check warnings.

Mode:
Review

Output:
A findings table with severity and blocking status, then a go / no-go
recommendation with conditions.
```
