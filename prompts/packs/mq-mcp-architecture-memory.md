# mq-mcp Architecture Memory Prompt Pack

Version: 0.6.0
Tags: pack, mq-mcp, architecture, ADR, memory, boundaries

Use this pack to reason about ADRs, system boundaries, and philosophy entries
surfaced from mq-mcp's architecture_memory/ directory. It helps translate
structured memory records into actionable architectural insight.

## Recommended Modes

- Architect
- Analyze
- Decide

## When to Use

- When reading ADRs from mq-mcp architecture_memory/
- When a new change may conflict with an existing architecture decision
- When designing a new component and needing to check established boundaries
- When onboarding to the mq ecosystem and needing to understand system philosophy

## Starter Prompt

```text
Use Atlas One Architect Mode.

I have retrieved the following from mq-mcp architecture_memory/:

[paste ADR or philosophy entry here]

Analyze this architecture decision:
- What constraint or principle does it establish?
- What boundary does it define?
- What is the reasoning behind it?
- What would break if this decision were ignored?

Then assess: does my current change respect this decision?
Return: compatible / conflicts / needs clarification.
```

## Follow-up: Boundary Check

```text
Use Atlas One Analyze Mode.

Map the relevant system boundaries based on these architecture entries:

[paste relevant ADRs or boundary definitions]

Identify:
- Which components own which responsibilities
- Where the handoff points are
- What must not cross which boundary
- What is undefined or ambiguous

End with: the one boundary that matters most for my current change.
```

## Follow-up: New ADR Draft

```text
Use Atlas One Create Mode.

I need to document a new architecture decision for mq-mcp architecture_memory/.

Context: [describe the decision]

Draft an ADR that includes:
- Title
- Status (proposed / accepted / superseded)
- Context and problem statement
- Decision
- Consequences
- Constraints this creates for future work
```
