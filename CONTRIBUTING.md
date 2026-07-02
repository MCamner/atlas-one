# Contributing to Atlas One

Thanks for your interest. Atlas One is a small, focused project — contributions
that keep it sharp are welcome.

## What Atlas One owns

Atlas One is the **prompt, mode-routing and handoff** layer of the local MQ
ecosystem. Keep changes inside that boundary:

* **Atlas One** — prompts, reasoning modes, interaction patterns, handoff text
* **mq-agent** — orchestration and command execution
* **mq-mcp** — review, risk, validation, safety classes, memory contracts
* **mqobsidian** — durable memory (persist / source of truth)
* **Ollama** — optional local model provider, never a decision authority

Changes that add execution, review/risk logic, or direct model calls belong in
those repos, not here.

## Development

The static UI needs no build — open `index.html` or use the live demo. For the
full server:

```bash
./build_and_run.sh   # Java 17+, serves http://127.0.0.1:8766
```

## Before opening a PR

* Run the checks:

  ```bash
  scripts/check-prompts.sh
  scripts/check-docs.sh
  ```

* If you touched prompts, regenerate the index with
  `scripts/generate-prompt-index.sh`.
* Keep `README`, `ROADMAP`, `VERSION` and `CHANGELOG` consistent for any
  version-relevant change; `scripts/release-check.sh` verifies release state.
* Markdown follows `.markdownlint.json` (dash lists are `*`, per MD004).
* Do not commit secrets, tokens or machine-specific private paths.

## Prompt packs

New or updated packs should follow the canonical template at
[`docs/prompts/PACK_TEMPLATE.md`](docs/prompts/PACK_TEMPLATE.md): purpose,
when to use, recommended modes, starter prompt, expected output, constraints
and an example. `check-prompts.sh` enforces the minimum (`Version:`, `Tags:`,
a heading, a `Starter Prompt`); the rest of the template is the maturity bar.

## Prompt safety

Every public prompt should state its purpose, when to use it, expected output
and constraints. Prompts must not ask models to ignore system instructions,
hide tool execution, bypass approval gates, or request secrets.

## Filing issues

Use the bug report or feature request templates. Search existing issues first
to avoid duplicates.
