# [A] Atlas Studio

**Adaptive prompt system for structured thinking and decision-making.**

Status: `v1.4.0 — Save to brain and portable MQ runtime`

👉 **Live demo:** <https://mcamner.github.io/atlas-one/>

---

Atlas Studio is a **local-first adaptive prompt system** that turns raw intent into structured thinking workflows.

Instead of writing prompts ad-hoc, you:

* define intent
* select a reasoning mode
* generate a structured prompt
* copy or hand off cleanly to ChatGPT

---

One input → adaptive prompt type → structured workflow → clean execution

---

## Visual flow

```text
Input
  ↓
Route selection (auto-classify mode)
  ↓
Workflow (analysis / architecture / strategy)
  ↓
Structured prompt pipeline
  ↓
ChatGPT execution   OR   mq-agent execution (plan / review / audit / signal)
```

---

## UI overview

The interface runs entirely in the browser — no install required.

```text
┌─────────────────────────────────────────────────────────┐
│ [A] Atlas Studio                              v1.4.0    │
│ ─────────────────────────────────────────────────────── │
│  SIDEBAR              │  MAIN PANEL                     │
│  ─────────────────    │  ─────────────────────────────  │
│  Type: Architecture   │  Goal input                     │
│  Search modes…        │  > Design a secure remote       │
│                       │    access architecture          │
│  Library              │                                 │
│  > Atlas One Core     │  Prompt type + reasoning route  │
│                       │  Requirements → Options → Rec.  │
│  Modes (13)           │                                 │
│  > Analyze            │  Final prompt output            │
│  > Architect          │  ChatGPT-ready structured text  │
│  > Debug              │                                 │
│  > …                  │  [ Generate ] [ Copy ] [ → ]    │
│                       │                                 │
│  Packs                │                                 │
│  > mq-mcp Safety      │                                 │
│  > Release Readiness  │                                 │
│  > Systems Thinking   │                                 │
│  > …                  │                                 │
└─────────────────────────────────────────────────────────┘
```

Keyboard shortcuts: `Ctrl+Enter` generate · `/` focus command · `s` focus search · `Esc` clear

---

## Screenshot

Interface preview from the GitHub Pages build:

![Atlas Studio UI](docs/screenshot.png)

## Try it

👉 <https://mcamner.github.io/atlas-one/>

No install. Runs in your browser — no Java required.

---

### Why it matters

Most AI usage today is:

* unstructured
* inconsistent
* hard to repeat

Atlas Studio introduces:

* **structure** to thinking
* **consistency** to execution
* **repeatability** to workflows

---

### What you get

* **Adaptive prompt modes** — switch between analysis, architecture, research, strategy, decision, problem solving, execution, and writing
* **Quick actions** — choose `/atlas`, `/research`, `/write`, `/strategy`, and other modes from the interface
* **System reasoning preview** — see the selected problem type, route, pipeline, and rationale
* **Structured prompt library** — reusable prompt patterns for repeatable work
* **ChatGPT-ready handoff** — copy the final prompt and open ChatGPT in one action

---

This is not another prompt tool.
It's a **system for thinking and execution.**

---

## What it does

Atlas Studio turns intent into structured AI workflows:

* **Adaptive prompt modes**
  Maps the task to a useful reasoning style

* **Quick action controls**
  Let you switch modes without rewriting the prompt manually

* **System reasoning preview**
  Shows how a request flows through reasoning steps

* **Prompt library system**
  Loads reusable prompts from `web/prompts.json` and keeps source prompts in
  `docs/prompts/`

* **Local-first execution**
  Runs entirely on `127.0.0.1` — no external dependencies

* **ChatGPT handoff**
  Copies the final prompt and opens ChatGPT for execution

* **mq-agent execution**
  Runs the routed goal directly via mq-agent (`plan`, `review`, `audit`, `signal`)
  when the Java backend is running — result appears inline in the UI. The
  execution panel includes a repo path input, and unmapped modes are shown as
  `mode → plan (fallback)` before they are sent to mq-agent.

---

## Example flow

```text
User input:
"Design a secure remote access architecture"

↓

Prompt type selected:
Architecture

Route:
Requirements and Constraints → Design Options → Review and Recommendation

↓

Generated output:
ChatGPT-ready structured prompt
```

---

## Architecture

Atlas One is the prompt and interaction layer in the local mq ecosystem. It
packages reasoning modes, prompt packs and handoff patterns. It does not own
runtime validation or review decisions.

Current role split:

```text
Atlas One   — prompts, mode routing, interaction patterns and handoff text
mq-agent    — orchestration and command execution flow
mq-mcp      — review, risk, validation, safety classes and memory contracts
Ollama      — optional local model provider, never a decision authority
```

```text
atlas-one/
├── docs/prompts/     # Core prompt, modes, and seed prompt packs
├── docs/             # GitHub Pages and prompt library docs
├── src/              # Java server (API + static hosting)
├── web/              # UI (routing, prompts, visualization)
├── dist/             # Compiled artifacts
├── build_and_run.sh  # Local dev runner
├── package_mac_app.sh
└── run_mac.command
```

### Backend

* Java HTTP server on `127.0.0.1:8766`
* Serves UI + API endpoints:
  * `/api/prompts`
  * `/api/health`
  * `/api/execute` — routes goal → mq-agent CLI command

### Frontend

* Vanilla JS application
* Handles:
  * routing logic
  * prompt generation
  * UI state
  * local storage

---

## Prompt library

Atlas One v0.2.0 adds a file-based prompt library:

```text
docs/prompts/
├── atlas-one.md
├── modes/
└── packs/
```

Core docs:

* [Prompt Library](docs/PROMPT_LIBRARY.md)
* [Modes](docs/MODES.md)
* [Routing](docs/ROUTING.md)
* [Examples](docs/EXAMPLES.md)

Canonical modes:

```text
Analyze
Decide
Architect
Research
Explain
Teach
Edit
Coach
Plan
Debug
Review
Summarize
Create
```

---

## How it works

1. User enters intent
2. System auto-routes to a reasoning mode (architect, debug, review, plan…)
3. Reasoning, route, and workflow structure are generated
4. Final prompt is produced
5. Output can be:
   * copied and opened in ChatGPT
   * executed directly via `▶ Run via mq-agent` (requires Java backend + mq-agent)
     with an optional repo path for review, audit and signal workflows

---

## Prompt system

Prompts are defined in:

```text
web/prompts.json
```

This allows:

* versioned prompt strategies
* reusable workflows
* structured execution patterns

---

## Run locally (Java backend)

Requires Java 17+. Runs the full server version at `http://127.0.0.1:8766`.

```bash
./build_and_run.sh
```

Or as a macOS app bundle:

```bash
./package_mac_app.sh
```

---

## Design principles

* **Local-first** — no cloud dependency
* **Structured thinking over raw prompting**
* **Repeatability over improvisation**
* **Separation of intent and execution**
* **Composable workflows**

---

## Roadmap

* Modular routing engine
* Advanced workflow editor
* Plugin system for prompt packs
* mq-mcp review, risk and architecture prompt packs
* Ollama runtime policy prompt pack for mq-mcp provider work
* Multi-model support
* CLI integration
* Export/import of workflows
* Integration with external tools

---

## Use cases

* Architecture design
* Technical decision-making
* Problem analysis
* Structured research
* Workflow standardization
* Prompt engineering at scale

---

## Status

Stable prompt operating system with mq ecosystem prompt packs and a documented
execution boundary. Current public alignment target: `v1.3.0`.

---

## Security

Atlas Studio runs locally. No data is sent anywhere unless you configure an external AI provider.

Do not commit API keys or credentials. Use environment variables or ignored local files for sensitive values.

---

## License

MIT

---

## Author

Mattias Camner
IT Architect — building practical systems where infrastructure, automation, and usability work together

---

## Final note

Atlas Studio is not another prompt tool.

It's an attempt to bring **structure, repeatability, and system thinking** into how we use AI.

## macOS helper scripts

The repository supports helper scripts for macOS packaging and running. To keep these portable:

* Prefer setting `MQ_ROOT` environment variable to your repo root:

  ```bash
  export MQ_ROOT="$(pwd)"
  ```

  Or rely on the scripts' autoprobe (they try `MQ_ROOT`, `git rev-parse`, then a script-relative fallback).

* Create Claude local settings from the example:

  ```bash
  cp .claude/settings.local.example.json .claude/settings.local.json
  # Edit .claude/settings.local.json and replace <MQ_ROOT> with your path (or set MQ_ROOT env var)
  ```

* Packaging requires `jpackage` (JDK 16+ or a JDK distribution with jpackage). If `jpackage` is missing, `package_mac_app.sh` will fail with a clear message.
