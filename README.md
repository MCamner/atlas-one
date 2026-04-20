# Atlas Studio

**Local prompt routing studio for structured AI workflows**

Atlas Studio is a local-first tool for designing, testing, and executing structured prompt workflows.  
Instead of writing prompts ad-hoc, you define intent → route → workflow → execution.

---

## Why this exists

Most AI usage today is:

- unstructured
- inconsistent
- hard to repeat
- dependent on memory and improvisation

Atlas Studio introduces a different model:

> **One input → structured routing → repeatable workflow → controlled execution**

---

## What it does

Atlas Studio runs locally and provides:

- **Prompt routing engine**  
  Automatically selects the best prompt strategy based on intent

- **Workflow detection**  
  Maps inputs to structured patterns (analysis, architecture, decision-making, etc.)

- **Pipeline visualization**  
  Shows how a request flows through reasoning steps

- **Prompt library system**  
  Loads reusable prompts from `web/prompts.json`

- **Local-first execution**  
  Runs entirely on `127.0.0.1` — no external dependencies

- **ChatGPT handoff**  
  Sends structured prompts into ChatGPT for execution

---

## Example flow

```
User input:
"Design a secure remote access architecture"

↓

Route selected:
Architecture → Requirements → HLD → Review

↓

Generated output:
Structured prompt pipeline ready for execution
```

---

## Architecture

```
atlas-one/
├── src/              # Java server (API + static hosting)
├── web/              # UI (routing, prompts, visualization)
├── dist/             # Compiled artifacts
├── build_and_run.sh  # Local dev runner
├── package_mac_app.sh
└── run_mac.command
```

### Backend

- Java HTTP server
- Serves UI + API endpoints:
  - `/api/prompts`
  - `/api/health`

### Frontend

- Vanilla JS application
- Handles:
  - routing logic
  - prompt generation
  - UI state
  - local storage

---

## Getting started

### Requirements

- Java 17+

### Run locally

```bash
./build_and_run.sh
```

or:

```bash
./run_mac.command
```

Open:

```
http://127.0.0.1:8765
```

---

## Packaging (macOS)

```bash
./package_mac_app.sh
```

Creates a local macOS app bundle.

---

## How it works

1. User enters intent
2. System applies routing heuristics
3. Matching workflow is selected
4. Prompt pipeline is generated
5. Output can be:
   - reviewed locally
   - sent to ChatGPT

---

## Prompt system

Prompts are defined in:

```
web/prompts.json
```

This allows:

- versioned prompt strategies
- reusable workflows
- structured execution patterns

---

## Design principles

- **Local-first** — no cloud dependency
- **Structured thinking over raw prompting**
- **Repeatability over improvisation**
- **Separation of intent and execution**
- **Composable workflows**

---

## Roadmap

- Modular routing engine
- Advanced workflow editor
- Plugin system for prompt packs
- Multi-model support
- CLI integration
- Export/import of workflows
- Integration with external tools

---

## Use cases

- Architecture design
- Technical decision-making
- Problem analysis
- Structured research
- Workflow standardization
- Prompt engineering at scale

---

## Status

Early-stage, actively evolving.

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

It’s an attempt to bring **structure, repeatability, and system thinking** into how we use AI.
