# Atlas One Roadmap

Atlas One is a prompt operating system for structured reasoning.

It is designed to help a user move from a rough request to a clear mode of
thinking, a useful output format and a better final answer.

The goal is not to collect random prompts.

The goal is to create a practical reasoning surface that can:

* classify the user's real goal
* choose the right thinking mode
* structure the output
* keep prompts reusable
* make expert-style reasoning easier to access
* work well as a GitHub Pages prompt library
* later connect to local mq ecosystem tools

---

## Core idea

```text
user goal
  ↓
Atlas One router
  ↓
reasoning mode
  ↓
prompt template
  ↓
structured output
  ↓
copy / export / reuse
```

Atlas One should feel like a clean command surface for thinking.

It should help users decide:

```text
What kind of problem is this?
What mode of thinking fits best?
What output structure should be used?
What should I do next?
```

---

## Current status

Current project phase:

```text
v1.0.0 — stable prompt operating system (done)
v1.1.0 — mq-agent execution bridge polish (done)
v1.2.0 — Ollama runtime policy for MQ (done)
v1.3.0 — public status and release clarity (done)
v1.4.0 — Save to brain, portable MQ_ROOT, prompt reorg (done)
v1.5.0 — public repo hygiene and workflow maturity (next)
v2.0.0 — Atlas as a full local prompt/workflow studio (later)
```

Completed foundation:

* GitHub Pages prompt interface
* Base Atlas One prompt
* Prompt library and mode routing
* Quick-action style prompt UX
* Release and security structure
* Structured reasoning modes

Future mq ecosystem work should build on this foundation with reusable prompt
packs and clear runtime boundaries. Atlas One should package prompts and
interaction patterns; mq-mcp remains the review/risk/architecture runtime.

---

## Release map

| Version | Theme                                      | Status        |
| ------- | ------------------------------------------ | ------------- |
| v0.1.0  | Public prompt foundation                   | Done / verify |
| v0.1.1  | GitHub Pages and README polish             | Done          |
| v0.2.0  | Prompt library and mode routing foundation | Done          |
| v0.3.0  | Export formats and reusable prompt packs   | Done          |
| v0.4.0  | Interactive web interface polish           | Done          |
| v0.5.0  | Prompt quality checks and examples         | Done          |
| v0.6.0  | mq ecosystem integration                   | Done          |
| v0.7.0  | Personal workflow packs                    | Done          |
| v1.0.0  | Stable prompt operating system             | Done          |
| v1.1.0  | mq-agent execution bridge                  | Done          |
| v1.2.0  | Ollama runtime policy for MQ               | Done          |
| v1.3.0  | Public status and release clarity          | Done          |
| v1.4.0  | Save to brain, portable MQ_ROOT, prompt reorg | Done       |
| v1.5.0  | Public repo hygiene and workflow maturity  | Next          |
| v2.0.0  | Atlas as a full local prompt/workflow studio | Later       |

---

## Completed foundation

### v0.1.0 — Public prompt foundation

Goal:

Create the first public Atlas One prompt system.

* [x] Add Atlas One base prompt
* [x] Define core operating principle
* [x] Define command interface
* [x] Add reasoning-mode concept
* [x] Add structured output rules
* [x] Add prompt reuse concept
* [x] Add README
* [x] Add ROADMAP
* [x] Add security note
* [x] Add release structure

---

### v0.1.1 — GitHub Pages and product polish

Goal:

Make Atlas One usable and understandable from the GitHub front page and Pages
site.

* [x] Add GitHub Pages front door
* [x] Add prompt UI concept
* [x] Add quick-action buttons
* [x] Add cache-busting for prompt library assets
* [x] Add basic project positioning
* [x] Add security/release notes
* [x] Add first public documentation structure

---

## Completed: v0.2.0 — Prompt library and mode routing foundation

Goal:

Turn Atlas One from a single strong prompt into a small, organized prompt
operating system.

This release should make the repo easier to extend without turning it into a
messy prompt dump.

### Scope

* [x] Create `prompts/` directory
* [x] Create `prompts/atlas-one.md`
* [x] Create `prompts/modes/`
* [x] Add prompt modes as separate markdown files
* [x] Add `docs/PROMPT_LIBRARY.md`
* [x] Add `docs/MODES.md`
* [x] Add `docs/ROUTING.md`
* [x] Add `docs/EXAMPLES.md`
* [x] Add canonical mode list
* [x] Add mode descriptions
* [x] Add recommended output format per mode
* [x] Add examples for each mode
* [x] Add GitHub Pages prompt library section
* [x] Add README links to prompt library
* [x] Add version badge or status line
* [x] Add changelog entry

### Proposed mode categories

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

### Proposed prompt files

```text
prompts/
├── atlas-one.md
├── modes/
│   ├── analyze.md
│   ├── decide.md
│   ├── architect.md
│   ├── research.md
│   ├── explain.md
│   ├── teach.md
│   ├── edit.md
│   ├── coach.md
│   ├── plan.md
│   ├── debug.md
│   ├── review.md
│   ├── summarize.md
│   └── create.md
└── packs/
    ├── repo-review.md
    ├── systems-thinking.md
    ├── product-strategy.md
    └── learning-coach.md
```

### v0.2.0 definition of done

* [x] Atlas One base prompt is stored as a standalone file
* [x] Modes are documented
* [x] Each mode has a clear use case
* [x] Each mode has a recommended output shape
* [x] README links to prompt library
* [x] GitHub Pages shows prompt library
* [x] CHANGELOG includes v0.2.0
* [x] GitHub release `v0.2.0` exists

---

## v0.3.0 — Export formats and reusable prompt packs

Goal:

Make Atlas One prompts easier to copy, save, reuse and adapt.

### v0.3.0 planned scope

* [x] Add copy-friendly prompt blocks
* [x] Add raw markdown links
* [x] Add JSON prompt manifest
* [x] Add plain-text export format
* [x] Add ChatGPT custom-instructions format
* [x] Add Claude project-instructions format
* [x] Add local markdown pack format
* [x] Add prompt pack index
* [x] Add prompt metadata
* [x] Add prompt version field
* [x] Add prompt tags
* [x] Add prompt use-case examples

### Proposed manifest

```json
{
  "name": "atlas-one",
  "version": "0.3.0",
  "prompts": [
    {
      "id": "atlas-one-core",
      "title": "Atlas One Core",
      "path": "prompts/atlas-one.md",
      "tags": ["reasoning", "router", "prompt-os"]
    }
  ]
}
```

### Possible exports

```text
exports/
├── atlas-one-core.txt
├── atlas-one-core.md
├── atlas-one-manifest.json
└── prompt-packs/
```

---

## v0.4.0 — Interactive web interface polish

Goal:

Make the GitHub Pages interface feel like a small usable product, not just a
static docs page.

### v0.4.0 planned scope

* [x] Improve landing page hierarchy
* [x] Add prompt search
* [x] Add mode filter
* [x] Add copy buttons
* [x] Add prompt preview panel
* [x] Add examples panel
* [x] Add version/status panel
* [x] Add keyboard-friendly navigation
* [x] Add mobile-friendly layout
* [x] Add dark terminal-inspired theme
* [x] Add quick-start section
* [x] Add links to raw prompt files
* [x] Add no-build static JS architecture

### UI sections

```text
Home
Core prompt
Modes
Prompt packs
Examples
Exports
Roadmap
Changelog
```

### v0.4.0 definition of done

* [x] Pages site clearly explains Atlas One
* [x] User can copy the core prompt quickly
* [x] User can browse modes
* [x] User can view examples
* [x] User can find export formats
* [x] Site works without a backend
* [x] Site works on mobile

---

## v0.5.0 — Prompt quality checks and examples

Goal:

Make the prompt library easier to maintain as it grows.

### v0.5.0 planned scope

* [x] Add prompt linting script
* [x] Add markdown link check
* [x] Add prompt metadata check
* [x] Add mode coverage check
* [x] Add examples coverage check
* [x] Add duplicate heading check
* [x] Add release checklist
* [x] Add GitHub Actions validation
* [x] Add generated prompt index
* [x] Add proof section to README
* [x] Add docs consistency check

### Possible scripts

```bash
scripts/check-prompts.sh
scripts/generate-prompt-index.sh
scripts/check-docs.sh
scripts/release-check.sh
```

### v0.5.0 definition of done

* [x] Every prompt has metadata
* [x] Every mode has an example
* [x] Prompt index is generated or validated
* [x] README is synced with prompt library
* [x] GitHub Actions pass
* [x] GitHub release exists

---

## v0.6.0 — mq ecosystem integration

Goal:

Connect Atlas One to the wider mq ecosystem as a reusable reasoning and prompt
layer.

### v0.6.0 target integrations

```text
mqlaunch
mq-agent
mq-hal
repo-signal
mq-mcp
macos-scripts
```

### v0.6.0 planned scope

* [x] Add `docs/MQ_ECOSYSTEM.md`
* [x] Add mqlaunch command examples
* [x] Add mq-agent prompt workflow examples
* [x] Add mq-hal reasoning-mode examples
* [x] Add repo-signal review prompt pack
* [x] Add mq-mcp safety-review prompt pack (maps to mq-mcp review contracts:
  comment, architecture, risk, security modes — mq-mcp v1.3.0+)
* [x] Add mq-mcp architecture-memory prompt pack — prompts that surface ADRs,
  boundaries, and philosophy entries from mq-mcp architecture_memory/
* [x] Add mq ecosystem boundary prompt pack covering central cognition in
  mq-mcp, orchestration in mq-agent, preprocessing in repo-signal, UX in
  macos-scripts, visual cognition in mq-image-analyze and observability in
  mq-hal
* [x] Add macos-scripts terminal workflow prompt pack
* [x] Add local assistant prompt bundle
* [x] Add prompt pack for release readiness
* [x] Keep prompt packs export-oriented; do not duplicate mq-mcp review logic
* [x] Add prompt pack for systems thinking

### v0.6.0 example target flow

```text
mqlaunch
  ↓
Atlas One prompt pack
  ↓
mq-agent / mq-hal
  ↓
repo-specific reasoning
```

### Possible command surface

```bash
mqlaunch atlas-one
mqlaunch prompt atlas-one
mqlaunch prompt repo-review
mqlaunch prompt systems-thinking
```

---

## v0.7.0 — Personal workflow packs

Goal:

Create curated prompt packs for recurring personal and professional workflows
not already covered by existing packs.

Already shipped (not in scope for v0.7.0): repo-review, release-readiness, systems-thinking, product-strategy, learning-coach — shipped in v0.3.0–v0.6.0.

### New packs planned for v0.7.0

Professional workflows:

* [x] Architecture review pack (deeper than mq-mcp-architecture-memory)
* [x] Writing / editor pack
* [x] Interview prep pack

Personal workflows (separate subfolder):

* [x] BJJ training reflection pack
* [x] Guitar practice pack

### Pack structure

```text
prompts/packs/
├── architecture-review.md    (professional)
├── writing-editor.md         (professional)
├── interview-prep.md         (professional)
└── personal/
    ├── bjj-coach.md
    └── guitar-practice.md
```

### v0.7.0 definition of done

* [x] Each pack has a clear purpose
* [x] Each pack has at least three prompts
* [x] Each pack has examples
* [x] Export format coverage completed under the v1.0.0 stable prompt system
* [x] Pages browsing completed under the v1.0.0 stable prompt system

---

## v1.0.0 — Stable prompt operating system

Goal:

Make Atlas One stable enough to be the default prompt and reasoning layer for
personal work, repo review and local AI-assisted workflows.

### v1.0.0 requirements

* [x] Stable core prompt
* [x] Stable mode taxonomy
* [x] Stable prompt file structure
* [x] Stable prompt metadata format
* [x] Stable export formats
* [x] Complete prompt library docs
* [x] Complete examples
* [x] Complete GitHub Pages interface
* [x] Complete changelog
* [x] Complete release checklist
* [x] GitHub Actions validation
* [x] GitHub release
* [x] Protected main branch
* [x] No known prompt-injection or unsafe-instruction issues in packaged prompts

---

## v1.1.0 — mq-agent execution bridge

Goal:

Turn atlas-one from a prompt-UI into an execution layer — route the auto-classified
goal directly to the mq-agent CLI and show the result inline.

### v1.1.0 scope

* [x] Add `POST /api/execute` to AtlasServer (port 8766, mq-mcp owns 8765)
* [x] Mode → mq-agent command mapping:
  * `architect` → `mq-agent review repo <path> --architecture`
  * `review`    → `mq-agent review repo <path>`
  * `debug`     → `mq-agent audit <path> --dry-run`
  * `research`  → `mq-agent signal <path>`
  * default     → `mq-agent plan <goal>`
* [x] `▶ Run via mq-agent` button in UI
* [x] Inline output panel (command shown, result rendered, ok/err styled)
* [x] Binary resolved from `MQ_AGENT_BIN` env or `~/mq-agent/.venv/bin/mq-agent`
* [x] 60s timeout with reader thread to avoid buffer deadlock
* [x] Repo path input — let user point execution at any local repo (not just `.`)
* [x] Visible mode fallback label — clarify when decide/explain/teach map to `plan`

### v1.1.0 definition of done

* [x] `GET /api/health` returns ok on port 8766
* [x] plan + architect modes tested live and return structured results
* [x] README updated with port, `/api/execute`, and mq-agent flow diagram
* [x] Integration pattern stored in mq-mcp semantic memory (`atlas-mq-agent-bridge`)
* [x] Repo path is user-configurable in the UI

---

## v1.2.0 — Ollama runtime policy for MQ

Goal:

Define how local Ollama models should be used by the mq ecosystem without
turning Ollama into a separate product or unconstrained chatbot.

Atlas One should provide the reasoning brief, safety framing and prompt pack
for this work. The actual local model calls, JSON validation and runtime
contracts should remain in mq-mcp and mq-agent. `MCamner/ollama` should stay a
clean upstream fork unless there is a specific upstream contribution to make.

### v1.2.0 target flow

```text
Atlas One prompt pack
  ↓
mq-agent learn / review command
  ↓
mq-mcp Ollama provider
  ↓
local Ollama model
  ↓
structured JSON
  ↓
mq-mcp schema validation and safety classification
```

### v1.2.0 planned scope

* [x] Add an `ollama-runtime-policy` prompt pack that frames local model usage
      for learn extraction, summarization and lightweight review
* [x] Add an `ollama-learn-extract` prompt pattern that asks for schema-shaped
      output without bypassing mq-mcp validation
* [x] Document the boundary between Atlas One, mq-agent, mq-mcp and Ollama in
      `docs/MQ_ECOSYSTEM.md`
* [x] Define allowed local model tasks:
  * learn extraction
  * summary generation
  * structured notes
  * lightweight code review suggestions
  * repo signal enrichment
* [x] Define disallowed local model tasks:
  * release go/no-go decisions
  * destructive command approval
  * security-critical changes without human review
  * secret handling
  * direct writes to memory without schema validation
* [x] Add a recommended first implementation plan for the mq-mcp Ollama
      provider:
  * `mq-mcp/providers/ollama_provider.py`
  * `schemas/learn_extraction.schema.json`
  * `schemas/review_summary.schema.json`
  * `docs/OLLAMA_PROVIDER.md`
  * `examples/ollama_learn_extract.json`
  * `tests/test_ollama_provider.py`
* [x] Add a small eval checklist for local model output quality:
  * valid JSON
  * schema compliance
  * confidence field present
  * source/evidence field present
  * no invented commands
  * no release or safety decision masquerading as fact

### Initial model routing policy

Treat these as local defaults, not permanent product choices:

| Route | Intended task | Initial model class |
| ----- | ------------- | ------------------- |
| `fast` | smoke tests, short summaries, simple extraction | small general model |
| `learn` | structured learn extraction and memory candidates | small/medium general model |
| `code_light` | focused code explanation and lightweight review | small code model |
| `code_heavy` | larger repo review drafts when hardware allows | larger code model |
| `fallback` | safe degraded behavior when preferred model is missing | smallest installed capable model |

### v1.2.0 definition of done

* [x] Atlas One has a prompt pack for designing and reviewing the Ollama policy
* [x] MQ ecosystem docs explain that Ollama is a local runtime provider, not a
      decision authority
* [x] The Ollama upstream fork is explicitly kept clean of MQ-specific policy
      files
* [x] The first mq-mcp provider scaffold is documented with provider code,
      schemas, examples and tests
* [x] Learn extraction has a JSON schema and at least three example fixtures
* [x] mq-mcp remains the validation and contract boundary
* [x] No Atlas One prompt encourages direct unsafe model execution, hidden
      reasoning, approval bypass or unvalidated memory writes

### Out of scope

* Building a separate Ollama application
* Forking or maintaining MQ-specific changes inside Ollama itself
* Making Atlas One call Ollama directly
* Letting local models approve releases or destructive actions
* Replacing mq-mcp contracts with prompt-only validation

---

## v1.3.0 — Public status and release clarity

Goal:

Make the public Atlas One surfaces tell the same story after v1.0.0, v1.1.0
and v1.2.0 shipped. This release should not add major features. It should make
the repo easier to understand from README, GitHub Pages, roadmap and release
metadata.

### v1.3.0 planned scope

* [x] Update README status from `v1.0.0` to the current shipped version
* [x] Align README, ROADMAP, VERSION and CHANGELOG around the same public
      project phase
* [x] Update GitHub Pages copy where it still presents Atlas One as only the
      v1.0.0 prompt operating system
* [x] Add a short "current architecture" note that explains:
  * Atlas One packages prompts and interaction patterns
  * mq-agent orchestrates execution
  * mq-mcp owns review, risk, validation and memory contracts
  * Ollama is an optional local provider, not a decision authority
* [x] Keep v1.3.0 docs-only unless a broken link or stale generated prompt
      index requires regeneration
* [x] Run the local release/check scripts before tagging

### v1.3.0 definition of done

* [x] README, ROADMAP, VERSION and CHANGELOG are consistent
* [x] GitHub Pages presents the current Atlas One role clearly
* [x] No prompt pack encourages direct unsafe model execution, approval bypass
      or unvalidated memory writes
* [x] Release check passes locally
* [x] GitHub release notes can be generated from the updated docs

### Out of scope

* New execution features
* Direct Ollama calls from Atlas One
* Duplicating mq-mcp review or risk logic
* New prompt-pack categories beyond documentation polish
* Changing mq-agent or mq-mcp behavior from this repo

---

## v1.4.0 — Save to brain, portable MQ_ROOT, prompt reorganization

Shipped 2026-06-10.

### v1.4.0 delivered

* [x] `Save to brain` button — routes Atlas reasoning outputs directly to
      `decisions/` in the mqobsidian second brain
* [x] macOS runtime made portable via the `MQ_ROOT` environment variable — no
      hardcoded home-directory paths
* [x] Prompt references updated after moving `prompts/` → `docs/prompts/`
* [x] Second-brain folder structure reorganized (mqobsidian cleanup)
* [x] README made version-consistent at v1.4.0

---

## v1.5.0 — Public repo hygiene and workflow maturity

Goal:

Make the public surface intentional. After v1.4.0 shipped, README, ROADMAP,
VERSION and CHANGELOG should agree, the repository root should read as a
product rather than a workspace, and the MQ ecosystem boundary — including
mqobsidian — should be visible. This release adds no new execution features.

### v1.5.0 planned scope

* [ ] Align ROADMAP with the v1.4.0 shipped state and define v1.5.0 / v2.0.0
* [ ] Slim README and reduce repeated product positioning
* [ ] Make mqobsidian explicit in the architecture (persist / source of truth)
* [ ] Move dead prototype source to `archive/legacy/`; drop `.bak` and build
      artifacts from the tracked tree
* [ ] Add a CI status badge for the prompt/docs checks
* [ ] Add `SECURITY.md` and `CONTRIBUTING.md`
* [ ] Add issue and PR templates
* [ ] File public issues for the next prompt-pack maturity work

### v1.5.0 definition of done

* [ ] README, ROADMAP, VERSION and CHANGELOG agree
* [ ] Root directory looks intentional; no `.bak` or backup trees tracked
* [ ] A new visitor can tell the static demo from the local Java backend
* [ ] The MQ ecosystem boundary (including mqobsidian) is visible
* [ ] The CI/check workflow is discoverable from the README
* [ ] Remaining work exists as GitHub issues

### Out of scope

* New execution features or prompt-pack categories
* Direct Ollama calls from Atlas One
* Duplicating mq-mcp review or risk logic

---

## v2.0.0 — Atlas as a full local prompt/workflow studio (later)

Not scheduled yet. Direction only.

Atlas grows from a prompt library into a local studio: reusable prompt/workflow
packs, richer mode routing, and tighter handoff into the mq ecosystem while
keeping the existing boundaries — mq-agent executes, mq-mcp validates,
mqobsidian persists.

---

## Long-term ideas

These are intentionally not scheduled yet.

* visual prompt builder
* prompt comparison mode
* prompt scoring
* prompt version diff view
* local prompt search
* browser extension style export
* OpenAI custom GPT export
* Claude project export
* Codex prompt pack
* Obsidian vault export
* markdown knowledge-base export
* prompt cards
* shareable prompt URLs
* multi-language prompt packs
* Swedish Atlas One edition
* generated architecture diagrams
* demo videos or GIFs

---

## Design principles

Atlas One should remain:

* clear
* structured
* reusable
* versioned
* copy-friendly
* model-agnostic
* local-first when possible
* safe to paste
* easy to understand
* useful without requiring an API

It should improve thinking.

It should not become a vague prompt collection.

---

## Safety principles

Atlas One must not package prompts that:

* ask models to ignore system or developer instructions
* request hidden chain-of-thought
* encourage unsafe automation
* hide tool execution
* ask for secrets
* bypass approval gates
* blur the line between suggestion and execution

Every public prompt should have:

* purpose
* when to use it
* expected output
* constraints
* version or status
* example usage

---

## Current recommended next step

```text
v1.5.0 — public repo hygiene and workflow maturity
```

All items through v1.4.0 are shipped: the prompt operating system (v1.0.0),
the mq-agent execution bridge (v1.1.0), the Ollama runtime policy (v1.2.0),
public status/release clarity (v1.3.0), and Save to brain + portable
`MQ_ROOT` + prompt reorganization (v1.4.0).

The next concrete work is a hygiene release, not new features: align the
public docs, slim the README, make the mqobsidian boundary explicit, move
dead prototype source out of the tracked root, add community/CI files, and
file issues for the next prompt-pack work. Do this before starting v2.0.0.
