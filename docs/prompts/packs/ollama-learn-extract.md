# Ollama Learn Extract Prompt Pattern

Version: 1.2.0
Tags: pack, ollama, learn, extraction, schema, mq-mcp

Use this pack when asking an Ollama model to extract structured engineering
lessons from review findings, diffs, or code analysis output.

The model's job is to propose candidates. mq-mcp validates and stores them.
The model is never a decision authority.

## Recommended Modes

- Analyze
- Review

## When to Use

- After running mq-mcp review_file or review_repo — extract lessons from findings
- After a diff review — identify patterns worth remembering
- When distilling a long review session into reusable engineering lessons
- Before calling `ollama_learn_extract` or `learn_extract_from_last_review`

## Input Contract

Pass the Ollama model exactly one of:

- Raw review findings text (severity lines from mq-mcp review output)
- A git diff with context
- A structured JSON blob from `review_file` or `repo_signal_report`

Do not pass secrets, API keys, or file contents from outside the repo.

## Output Contract

The model must return a JSON array conforming to `learn_extraction.schema.json`:

```json
[
  {
    "pattern_name": "short-kebab-case-slug",
    "pattern_type": "architecture | docs | integration | release | safety | testing | unknown",
    "summary": "one sentence: what was learned",
    "evidence": ["specific line or finding that supports this lesson"],
    "recommended_action": "what to do next time",
    "confidence": "high | medium | low",
    "should_store": true
  }
]
```

Required fields: `pattern_name`, `pattern_type`, `summary`, `evidence`,
`recommended_action`, `confidence`, `should_store`.

If `confidence` is `low`, set `should_store` to `false`.

## Starter Prompt

```text
Use Atlas One Analyze Mode.

Extract engineering lessons from these review findings.

Input:
[paste mq-mcp review output or diff here]

Rules:
- Output a JSON array only — no prose, no markdown
- Each item must match the learn_extraction schema exactly
- evidence must contain at least one specific quote or finding
- If you are not confident in a lesson, set confidence=low and should_store=false
- Do not invent commands, file paths, or decisions not supported by the evidence
- Do not include release go/no-go decisions or security approvals

Schema fields required: pattern_name, pattern_type, summary, evidence,
recommended_action, confidence, should_store
```

## Validation Checklist

Before passing Ollama output to `record_learning`:

- [ ] Output is valid JSON array
- [ ] Every item has all required schema fields
- [ ] `evidence` is non-empty and quotes real findings
- [ ] `confidence` is one of: high, medium, low
- [ ] `should_store=false` for all low-confidence items
- [ ] No invented commands or paths
- [ ] No release or security decisions in `recommended_action`

## What mq-mcp Does Next

After validation, pass accepted items to `record_learning` one by one.
mq-mcp writes to `learn_engine/memory/lessons.jsonl` only —
no git commits, no config changes, no approval gates skipped.

Low-confidence items and items with `should_store=false` are discarded.
The user reviews stored lessons with `learn_status` before acting on them.
