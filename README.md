# [A] Atlas Studio

**Adaptive prompt system for structured thinking and decision-making.**

Status: `v0.7.0 — personal workflow packs`

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
Route selection
  ↓
Workflow (analysis / architecture / strategy)
  ↓
Structured prompt pipeline
  ↓
ChatGPT execution
```

---

## UI overview

The interface runs entirely in the browser — no install required.

```text
┌─────────────────────────────────────────────────────────┐
│ [A] Atlas Studio                              v0.7.0    │
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
│  Packs (9)            │                                 │
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
  `prompts/`

* **Local-first execution**
  Runs entirely on `127.0.0.1` — no external dependencies

* **ChatGPT handoff**
  Copies the final prompt and opens ChatGPT for execution

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

```text
atlas-one/
├── prompts/          # Core prompt, modes, and seed prompt packs
├── docs/             # GitHub Pages and prompt library docs
├── src/              # Java server (API + static hosting)
├── web/              # UI (routing, prompts, visualization)
├── dist/             # Compiled artifacts
├── build_and_run.sh  # Local dev runner
├── package_mac_app.sh
└── run_mac.command
```

### Backend

* Java HTTP server
* Serves UI + API endpoints:
  * `/api/prompts`
  * `/api/health`

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
prompts/
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
2. User selects or confirms the prompt type
3. System updates reasoning, route, and workflow structure
4. Final prompt is generated
5. Output can be:
   * reviewed locally
   * copied and opened in ChatGPT

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

Requires Java 17+. Runs the full server version at `http://127.0.0.1:8765`.

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

Early-stage, actively evolving.

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
