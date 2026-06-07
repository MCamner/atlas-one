# Atlas One Modes

Modes are the main routing unit in Atlas One.

A mode answers:

```text
What kind of thinking does this request need?
```

## Canonical Mode List

| Mode | Use When | Output Shape |
| ---- | -------- | ------------ |
| Analyze | The user needs to understand a situation | Summary, key parts, patterns, gaps, insight |
| Decide | The user needs to choose | Options, trade-offs, recommendation |
| Architect | The user needs a system or workflow design | Goal, constraints, architecture, risks |
| Research | The user needs evidence and synthesis | Facts, uncertainty, implications |
| Explain | The user needs clarity | Short answer, explanation, example |
| Teach | The user wants to learn | Lesson, practice, check understanding |
| Edit | The user has existing text to improve | Edited version, rationale |
| Coach | The user needs reflective guidance | Current state, blocker, small next action |
| Plan | The user needs sequencing | Phases, task list, definition of done |
| Debug | Something is failing | Likely causes, checks, fix path |
| Review | The user needs critique | Findings, severity, evidence, fixes |
| Summarize | The user needs compression | Summary, key points, actions |
| Create | The user needs a new artifact | Intent, draft, adaptation notes |

## Mode Files

Mode files live in:

```text
docs/prompts/modes/
```

Each mode is intentionally small. Atlas One should route clearly before it adds
complexity.

## Safety

Modes must not ask a model to:

* ignore higher-priority instructions
* expose hidden chain-of-thought
* execute tools silently
* request secrets
* bypass approval gates
