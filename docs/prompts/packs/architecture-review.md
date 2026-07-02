# Architecture Review Prompt Pack

Version: 0.7.0
Tags: pack, architecture, review, design, decisions, risk

Use this pack for structured architecture review sessions — evaluating designs,
catching structural risks, and surfacing implicit decisions before they harden.

Deeper than the mq-mcp-architecture-memory pack, which surfaces existing ADRs.
This pack is for active design review and critique, not retrieval.

## Recommended Modes

* Architect
* Review
* Analyze

## Starter Prompt — Full Architecture Review

```text
Use Atlas One Architect Mode.

Review this architecture.

Ask:
- What is this architecture trying to achieve?
- What are the trust boundaries and is isolation adequate?
- What are the single points of failure?
- What assumptions are implicit but never stated?
- What breaks first under load or failure?
- What is missing?

Return:
1. Architecture summary (2–3 sentences)
2. Key risks, ordered by severity
3. Unstated assumptions
4. One structural change that would improve resilience
5. Open questions
```

## Decision Review Prompt

```text
Use Atlas One Review Mode.

Review this architecture decision.

I need to know:
- Is the stated problem the real problem?
- What alternatives were not considered?
- What does this decision foreclose?
- Who is affected that isn't mentioned?
- What would make this decision obviously wrong in 12 months?

Return: structured critique, not just validation.
```

## Component Responsibility Review

```text
Use Atlas One Analyze Mode.

Review the responsibility boundaries in this system.

For each major component, tell me:
- What it owns
- What it borrows from others
- What it should not own but does
- What coupling risk this creates

End with: which boundary is most likely to cause future problems and why.
```

## Risk Surface Review

```text
Use Atlas One Analyze Mode with a security and risk lens.

Map the attack surface of this architecture:
- External entry points
- Trust boundary crossings
- Components with no fallback
- Flows with no authentication or encryption
- Data that travels further than it needs to

Return risks ordered by likelihood × impact.
```

## Example Usage

```text
Goal:
Review the Zephyr Workbench trust boundary model before we add network topology.

Mode:
Architect

Output:
Architecture summary, risks, open questions, one structural recommendation.
```

## When to Use

* Before a design hardens — when you can still change structure cheaply
* When reviewing someone else's architecture, or your own with fresh eyes
* When a decision feels risky but the risk is not yet named

## Expected Output

* A 2–3 sentence architecture summary
* Risks ordered by severity, with the reasoning behind each
* Unstated assumptions made explicit
* One structural change that improves resilience, plus open questions

## Constraints

* Critique, do not just validate — surface what is missing or wrong
* Ground findings in the design provided; mark inferences as inferences
* Review only — implementation and risk gating belong to mq-agent / mq-mcp
