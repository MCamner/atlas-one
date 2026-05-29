# Atlas One — mq Ecosystem Integration

Version: 0.6.0

This document describes how Atlas One fits the wider mq ecosystem as a
reasoning and prompt layer.

---

## What Atlas One does in the ecosystem

Atlas One provides structured reasoning prompts. It does not execute code,
run tools, or duplicate the logic of other mq tools. It structures *thinking*
before and after tool execution.

```text
user goal
  ↓
Atlas One prompt pack       ← reasoning structure
  ↓
mq-agent / mq-mcp           ← execution and tool layer
  ↓
repo-signal / mq-hal        ← signal and observability layer
  ↓
structured output
```

---

## Ecosystem map

| Tool | Role | Atlas One touchpoint |
|------|------|----------------------|
| **mqlaunch** | Terminal workflow hub and command surface | Entry point — `mqlaunch atlas-one` or copy-paste prompt |
| **mq-agent** | AI agent orchestrator — Planner, Executor, Verifier, Memory, Safety | Atlas One Architect / Plan prompts frame agent task design |
| **mq-hal** | Reasoning and observability layer for mq-agent | Atlas One Analyze prompts help interpret hal reasoning output |
| **repo-signal** | Repo readiness signals and machine-readable JSON contracts | Atlas One Review prompts wrap repo-signal output in structured review |
| **mq-mcp** | Local MCP server — review, risk, architecture, security contracts | Atlas One packs prepare review inputs; do not duplicate mq-mcp logic |
| **macos-scripts** | Terminal UX, workflows, and automation | Atlas One Plan / Debug prompts support terminal workflow design |

---

## Prompt packs for mq ecosystem work

| Pack | When to use |
|------|-------------|
| [mq-mcp-safety-review](../prompts/packs/mq-mcp-safety-review.md) | Before invoking mq-mcp security or risk review — structure what to check |
| [mq-mcp-architecture-memory](../prompts/packs/mq-mcp-architecture-memory.md) | Reason about ADRs, boundaries, and philosophy entries in architecture_memory/ |
| [mq-ecosystem-boundaries](../prompts/packs/mq-ecosystem-boundaries.md) | Map responsibilities across mq tools before designing a cross-tool workflow |
| [release-readiness](../prompts/packs/release-readiness.md) | Structure release review for any mq repo using Atlas One Review mode |
| [macos-scripts-terminal](../prompts/packs/macos-scripts-terminal.md) | Design or debug terminal workflows in macos-scripts |

---

## Example flows

### mq-mcp safety review

```text
Atlas One — mq-mcp-safety-review pack
  ↓
Structured review brief (what to check, what to flag)
  ↓
mq-mcp security / risk review contract
  ↓
Findings with severity and evidence
```

### Repo release readiness

```text
repo-signal output (publish-readiness JSON)
  ↓
Atlas One — release-readiness pack (Review mode)
  ↓
Structured go/no-go assessment
  ↓
scripts/release-check.sh
```

### mq-agent task design

```text
Atlas One — Architect mode
  ↓
Task boundary definition (what mq-agent does vs what the user does)
  ↓
mq-agent Planner / Executor
  ↓
Atlas One — Review mode (verify output)
```

---

## mqlaunch command surface

Use these commands to access Atlas One prompts from the terminal:

```bash
mqlaunch review                         # copy Atlas One review prompt
mqlaunch ask "use atlas-one plan mode"  # AI session with Atlas One framing
mqlaunch atlas                          # interactive AI session
```

For clipboard-ready export files:

```bash
cat exports/atlas-one-chatgpt-instructions.txt | pbcopy
cat exports/prompt-packs/mq-mcp-safety-review.txt | pbcopy
cat exports/prompt-packs/release-readiness.txt | pbcopy
```

---

## Design constraints

* Atlas One packs are **export-oriented** — plain text, clipboard-ready, model-agnostic.
* Atlas One does **not** duplicate mq-mcp review logic.
* Atlas One does **not** execute commands — it structures the thinking that precedes execution.
* Prompts must comply with Atlas One safety principles: no hidden chain-of-thought,
  no tool execution bypass, no approval gate circumvention.
