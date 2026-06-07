# Ollama Provider Plan for mq-mcp

Version: 1.2.0

This document captures the Atlas One side of the v1.2.0 Ollama plan. It is not
runtime code. It defines the recommended first mq-mcp provider scaffold and the
validation fixtures that should guide implementation.

---

## Boundary

```text
Atlas One      — policy prompt pack and implementation brief
mq-agent       — user-facing orchestration
mq-mcp         — Ollama provider, schemas, validation, contracts, storage gates
Ollama         — local model runtime
MCamner/ollama — clean upstream fork
```

Do not add MQ-specific policy, schemas, examples, or tests to the Ollama fork.
Keep those artifacts in mq-mcp.

---

## First mq-mcp Scaffold

```text
mq-mcp/providers/ollama_provider.py
schemas/learn_extraction.schema.json
schemas/review_summary.schema.json
docs/OLLAMA_PROVIDER.md
examples/ollama_learn_extract.json
tests/test_ollama_provider.py
```

Provider functions:

- `health()` — confirm the local Ollama API responds
- `list_models()` — list locally installed models
- `chat_json()` — send prompt plus JSON schema and return parsed JSON
- `extract_learn_items()` — extract validated learn candidates
- `review_summary()` — produce bounded review summaries

---

## Learn Extraction Schema Shape

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["source", "learn_items"],
  "properties": {
    "source": {
      "type": "string",
      "enum": ["diff", "review", "docs", "manual"]
    },
    "learn_items": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["title", "category", "confidence", "evidence", "reuse_hint", "should_store"],
        "properties": {
          "title": { "type": "string" },
          "category": {
            "type": "string",
            "enum": ["architecture", "safety", "docs", "release", "testing", "integration", "unknown"]
          },
          "confidence": {
            "type": "number",
            "minimum": 0,
            "maximum": 1
          },
          "evidence": {
            "type": "array",
            "items": { "type": "string" },
            "minItems": 1
          },
          "reuse_hint": { "type": "string" },
          "should_store": { "type": "boolean" }
        }
      }
    }
  }
}
```

The schema is a generation contract. mq-mcp must still validate parsed output
before any result can be stored or promoted.

---

## Example Fixtures

### Fixture 1: Valid Learn Extraction

```json
{
  "source": "diff",
  "learn_items": [
    {
      "title": "Provider output needs schema validation",
      "category": "safety",
      "confidence": 0.86,
      "evidence": ["The provider returns generated JSON from a local model."],
      "reuse_hint": "Use when adding local model providers that feed memory or review workflows.",
      "should_store": false
    }
  ]
}
```

### Fixture 2: Reject Missing Evidence

```json
{
  "source": "review",
  "learn_items": [
    {
      "title": "Review summary can be stored",
      "category": "docs",
      "confidence": 0.72,
      "evidence": [],
      "reuse_hint": "Use for summary storage.",
      "should_store": true
    }
  ]
}
```

Expected: invalid because evidence is empty and storage must require explicit
mq-mcp validation plus approval.

### Fixture 3: Reject Release Decision

```json
{
  "source": "manual",
  "learn_items": [
    {
      "title": "Release is approved",
      "category": "release",
      "confidence": 0.91,
      "evidence": ["The local model said the release looks fine."],
      "reuse_hint": "Use this as a release go decision.",
      "should_store": true
    }
  ]
}
```

Expected: invalid for policy. Local models can summarize release evidence, but
must not approve releases or replace release gates.

---

## Evaluation Checklist

- Output is valid JSON
- Output conforms to schema
- Evidence exists for every learn item
- Confidence is bounded between 0 and 1
- Storage defaults to false unless mq-mcp approval exists
- No release, security, destructive-action, or secret-handling decision is made
- Fallback behavior is explicit when Ollama is unavailable

---

## First mq-mcp Command Target

```text
mq-mcp learn extract --provider ollama --model <local-model>
```

Output must remain validated JSON. Free text from the local model should never
be treated as trusted memory or release evidence.
