# Prompt Library

Atlas One v0.2.0 introduces a file-based prompt library.

The goal is to make prompts easy to inspect, version, copy and reuse without
burying the system in JavaScript or HTML.

## Structure

```text
docs/prompts/
├── atlas-one.md
├── modes/
└── packs/
```

## Core Prompt

The core prompt lives at:

```text
docs/prompts/atlas-one.md
```

It defines the Atlas One routing behavior:

```text
user goal → reasoning mode → output shape → final answer
```

## Modes

Modes live in:

```text
docs/prompts/modes/
```

Each mode file includes:

* when to use it
* what it is best for
* recommended output shape

## Packs

Prompt packs live in:

```text
docs/prompts/packs/
```

Packs combine modes into reusable workflows for recurring tasks.

Current pack families:

* repo review and release readiness
* systems thinking and product strategy
* learning coach and personal workflow packs
* mq ecosystem boundary, safety and architecture packs
* Ollama runtime policy for mq-mcp provider work

## GitHub Pages

The Pages UI still loads its prompt library from:

```text
docs/prompts.json
```

The local app loads from:

```text
web/prompts.json
```

Those JSON files are the browser-facing manifest. The markdown files are the
human-readable source library.

## Current Rule

If a prompt is public, it should have a readable markdown source file.
