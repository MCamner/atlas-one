# <Pack Name> Prompt Pack

Version: 0.3.0
Tags: pack, <domain>, <task>

<!--
Canonical template for a mature Atlas One prompt pack. Copy this into
docs/prompts/packs/<name>.md and fill every section. A pack is "mature" when
it carries all of the elements below — the same standard the ROADMAP safety
principles require of every public prompt (purpose, when to use, expected
output, constraints, example, version).

check-prompts.sh enforces the minimum (Version:, Tags:, a ## section, a
Starter Prompt); the remaining sections are the maturity bar.
-->

One-line statement of what this pack is for and the outcome it produces.

## When to Use

* the situation or trigger that makes this pack the right choice
* what problem it solves better than a raw prompt

## Recommended Modes

* <Mode>
* <Mode>

## Starter Prompt

```text
Use Atlas One <Mode> Mode.

<the actual reusable prompt body>

Return <what the model should produce>.
```

## Expected Output

What a good response looks like — shape, sections, ordering. Keep it concrete
so results are repeatable.

## Constraints

* what the prompt must not do (no unsafe automation, no approval bypass, no
  secrets, no hidden tool execution)
* scope boundaries — what belongs to mq-agent / mq-mcp instead

## Example Usage

A short, concrete input → output example so a new user can see the pack work.
