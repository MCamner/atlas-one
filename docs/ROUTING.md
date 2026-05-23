# Routing

Atlas One routing chooses a thinking mode before generating the final prompt.

## Routing Flow

```text
user goal
  ↓
classify intent
  ↓
select primary mode
  ↓
choose output shape
  ↓
generate final prompt
```

## Current Routing Rules

The v0.2.0 foundation uses simple keyword and intent matching.

| Signals | Mode |
| ------- | ---- |
| architecture, design, system, integration, platform | Architect |
| compare, choose, trade-off, option, recommend | Decide |
| research, market, source, evidence, investigate | Research |
| bug, failure, broken, error, issue | Debug |
| review, audit, critique, readiness | Review |
| teach, learn, practice, lesson | Teach |
| explain, what is, why does | Explain |
| plan, roadmap, steps, sequence | Plan |
| summarize, brief, digest | Summarize |
| draft, create, write, generate | Create |
| improve, rewrite, edit | Edit |
| coach, habit, reflect | Coach |
| default | Analyze |

## Route Preview

A route should explain:

- selected mode
- reason for selection
- recommended output shape
- suggested next action

## Non-goals

- No hidden execution
- No model-only authority
- No automatic tool use
- No unsafe prompt-injection patterns
