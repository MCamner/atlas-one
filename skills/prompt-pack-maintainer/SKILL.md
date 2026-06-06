---
name: prompt-pack-maintainer
description: Use when adding, editing, validating, or exporting Atlas One prompt modes, prompt packs, reasoning templates, mq ecosystem boundary prompts, prompt metadata, or prompt library docs.
---

# Prompt Pack Maintainer

Use this skill when Atlas One's prompt library or reasoning modes change.

## When to use

- Adding, editing, or exporting prompt modes, prompt packs, or reasoning templates
- Updating mq ecosystem boundary prompts or prompt metadata
- Keeping `docs/PROMPT_LIBRARY.md`, `MODES.md`, or `ROUTING.md` consistent with prompts

## When not to use

- Runtime reasoning or review logic — those belong in mq-mcp
- Repo indexing, orchestration, or workflow execution — those belong in mq-agent and repo-signal
- Visual perception prompts — those belong in mq-image-analyze

## Boundary

Atlas One owns prompts, reasoning templates, personas, interaction styles, prompt packs and command abstractions.

It must not own runtime reasoning, review pipelines, architecture analysis, indexing, or workflow execution. Those belong to mq-mcp, repo-signal, mq-agent and neighboring tools.

## Files To Inspect

- `prompts/atlas-one.md`
- `prompts/modes/`
- `prompts/packs/`
- `docs/PROMPT_LIBRARY.md`
- `docs/MODES.md`
- `docs/ROUTING.md`
- `docs/EXAMPLES.md`
- `docs/prompts.json`
- `web/prompts.json`
- `ROADMAP.md`

## Prompt Rules

- Each prompt should have a clear purpose, use case, constraints and output shape.
- Keep prompts safe to paste; never instruct models to ignore higher-priority instructions or reveal hidden chain-of-thought.
- Keep mq ecosystem boundary prompts explicit about repo ownership:
  mq-mcp cognition, mq-agent orchestration, repo-signal preprocessing, macos-scripts UX, mq-image-analyze visual observation, mq-hal observability.
- Prefer reusable prompt packs over one-off prompt fragments.

## Verification

```bash
find prompts docs -name '*.md' -print
```

If validation scripts exist, run the prompt/docs check and update generated indexes or JSON manifests after prompt changes.
