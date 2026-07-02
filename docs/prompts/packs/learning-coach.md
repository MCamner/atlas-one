# Learning Coach Prompt Pack

Version: 0.3.0
Tags: pack, learning, coaching, teaching, practice

Use this pack to learn a subject through structured explanation and practice.

## When to Use

* When picking up a new subject and you want a practical learning sequence
* When you understand a topic loosely but can't yet explain or apply it
* When you want practice tasks and a way to check your own understanding

## Recommended Modes

* Teach
* Explain
* Coach

## Starter Prompt

```text
Use Atlas One Teach Mode.

Teach me this topic in a practical sequence.

Include:
- what I need to understand first
- a simple explanation
- one concrete example
- one practice task
- how I can tell if I understood it
```

## Expected Output

* A short prerequisite ("understand first") step
* A plain-language explanation, not jargon
* One concrete, worked example
* One practice task the learner can actually do
* A self-check to confirm understanding

## Constraints

* Explanations stay at the learner's stated level — no unexplained jargon
* Do not fabricate facts; flag uncertainty instead of guessing
* Coaching only — no execution, no external accounts or tools required

## Example Usage

```text
Goal:
Learn how TLS certificate chains work well enough to debug a broken one.

Mode:
Teach

Output:
What to understand first, a plain explanation, a worked example, a practice
task, and a self-check.
```
