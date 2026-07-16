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
v1.5.0 — public repo hygiene and prompt-pack maturity (done)
v2.0.0 — Atlas as a local prompt/workflow studio (next)
v2.1.0 — Atlas Canvas: structured Excalidraw workflows (planned)
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
| v1.5.0  | Public repo hygiene and prompt-pack maturity | Done        |
| v2.0.0  | Atlas as a local prompt/workflow studio      | Next        |
| v2.1.0  | Atlas Canvas: structured Excalidraw workflows | Planned    |

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

## v1.5.0 — Public repo hygiene and prompt-pack maturity

Shipped 2026-07-02.

Goal:

Make the public surface intentional. After v1.4.0 shipped, README, ROADMAP,
VERSION and CHANGELOG should agree, the repository root should read as a
product rather than a workspace, and the MQ ecosystem boundary — including
mqobsidian — should be visible. This release adds no new execution features.

### v1.5.0 planned scope

Repo hygiene (shipped):

* [x] Align ROADMAP with the v1.4.0 shipped state and define v1.5.0 / v2.0.0
* [x] Slim README and reduce repeated product positioning
* [x] Make mqobsidian explicit in the architecture (persist / source of truth)
* [x] Move dead prototype source to `archive/legacy/`; drop `.bak` and build
      artifacts from the tracked tree
* [x] Add a CI status badge for the prompt/docs checks
* [x] Add `SECURITY.md` and `CONTRIBUTING.md`
* [x] Add issue and PR templates
* [x] Add an MQ ecosystem architecture diagram to the README

Prompt-pack maturity:

* [x] Define a canonical pack template (`docs/prompts/PACK_TEMPLATE.md`)
* [x] Bring the thin packs up to the template — `learning-coach`,
      `product-strategy`, `repo-review`, `systems-thinking`
* [x] Add the missing maturity sections across packs — `When to Use`,
      `Expected Output`, `Constraints`, `Example Usage`
* [x] Extend `check-prompts.sh` to enforce the maturity sections (v0.6.0 —
      179 checks pass)
* [x] Regenerate the prompt index; bump `web/prompts.json` /
      `docs/prompts.json` version at release tag

### v1.5.0 definition of done

* [x] README, ROADMAP, VERSION and CHANGELOG agree
* [x] Root directory looks intentional; no `.bak` or backup trees tracked
* [x] A new visitor can tell the static demo from the local Java backend
* [x] The MQ ecosystem boundary (including mqobsidian) is visible
* [x] The CI/check workflow is discoverable from the README
* [x] Every public pack meets the `PACK_TEMPLATE.md` standard, verified by
      `check-prompts.sh`

### Prompt-pack maturity standard

A pack is mature when it carries all of the elements the safety principles
already require of every public prompt:

```text
Version + Tags        — metadata (enforced today)
purpose / When to Use — when this pack is the right choice
Recommended Modes     — which reasoning modes it drives
Starter Prompt        — the reusable prompt body (enforced today)
Expected Output       — what a good response looks like
Constraints           — what it must not do; mq-agent / mq-mcp boundaries
Example Usage         — a concrete input → output example
```

`docs/prompts/PACK_TEMPLATE.md` is the copy-paste source. The gap today is
consistency: only some packs carry `When to Use`, `Example Usage` or explicit
constraints, and `check-prompts.sh` does not yet verify them.

### Out of scope

* New execution features or new prompt-pack categories
* Direct Ollama calls from Atlas One
* Duplicating mq-mcp review or risk logic

---

## v2.0.0 — Atlas as a local prompt/workflow studio

Scoped, not yet started.

Goal:

Turn Atlas from a prompt launcher into a local **workflow studio**. The release
centers on reusable workflow-packs, sequence-aware mode routing, and explicit
mq handoff contracts — while keeping execution, review and risk logic in the mq
stack. Atlas stays a packaging and orchestration layer; it does not become an
execution or decision layer.

After v2.0.0 Atlas should be able to:

* package reusable prompt/workflow packs that chain more than one step
* route a goal to the right mode **or a defined sequence of modes**
* hand structured payloads to mq-agent / mq-mcp / mqobsidian over a documented
  contract
* remain a packaging and orchestration layer, not an execution layer

Lead with workflow-packs. Support with richer routing. Formalize with mq
handoff. The three scope blocks below are ordered by build priority.

### Scope

#### 1. Workflow packs (lead)

* [ ] Define a workflow-pack format that extends the mature pack template with
      an ordered `steps` sequence (each step: mode + starter prompt + expected
      output)
* [ ] Add `docs/prompts/WORKFLOW_PACK_TEMPLATE.md` as the copy-paste source
* [ ] Ship at least three working workflow-pack types (e.g. repo-review flow,
      architecture-decision flow, learn-and-persist flow)
* [ ] Extend `check-prompts.sh` to validate workflow-pack structure (ordered
      steps, per-step mode + expected output, no execution instructions)
* [ ] Surface workflow packs in the GitHub Pages / web UI alongside single
      prompts

#### 2. Mode routing v2 (support)

* [ ] Let the router select a **sequence template**, not just a single mode
* [ ] Map goal → sequence (e.g. `analyze → plan → review`) with a visible,
      user-editable plan before anything runs
* [ ] Keep routing declarative: Atlas describes the flow, it does not plan
      agentically or execute
* [ ] Show the resolved sequence and per-step mode in the UI

#### 3. MQ handoff contracts (formalize)

* [ ] Define a handoff payload schema (goal, mode/sequence, repo path, pack id,
      metadata, validation points) from Atlas → mq-agent / mq-mcp / mqobsidian
* [ ] Document the contract in `docs/MQ_ECOSYSTEM.md` with example payloads
* [ ] Add a documented, testable handoff endpoint/format — no new review or
      risk rules in Atlas
* [ ] Keep persistence going through mqobsidian handoff, not Atlas-side writes

### v2.0.0 definition of done

* [ ] At least three working workflow-pack types, verified by `check-prompts.sh`
* [ ] Router can select a defined sequence, not only a single mode
* [ ] Handoff schema is documented and testable, with example payloads
* [ ] No direct model calls from Atlas
* [ ] No review/risk logic implemented in Atlas
* [ ] README, ROADMAP, VERSION and CHANGELOG agree at the release tag

### Out of scope

* Free agentic planning inside Atlas
* A local review engine in Atlas
* Duplicated memory or risk assessment from mq-mcp
* Direct persistence logic in Atlas beyond the handoff
* Direct Ollama calls from Atlas

### Dependencies and build order

```text
1. Workflow packs      (Atlas-only; builds on v1.5.0 pack maturity)
   ↓
2. Mode routing v2     (needs packs to route into)
   ↓
3. MQ handoff contracts (needs a routed sequence to hand off)
```

Blocks 2 and 3 depend on 1. mq-agent / mq-mcp / mqobsidian keep their existing
contracts; v2.0.0 adds the Atlas-side composer, router and handoff, nothing in
the mq runtimes.

---

## v2.1.0 — Atlas Canvas: structured Excalidraw workflows

Planned after v2.0.0.

Goal:

Turn Atlas reasoning modes and workflow sequences into editable Excalidraw
diagrams without making Atlas a model runtime, diagram renderer, review engine
or source of truth. Atlas owns intent, routing and the diagram request;
`excalidraw-ai-proxy` owns model access, streaming and Mermaid normalization;
Excalidraw owns canvas state and editing; mq-agent / mq-mcp own optional
execution, validation and review; mqobsidian owns durable curated records.

### Target flow

```text
User goal
  ↓
Atlas mode or workflow sequence
  ↓
atlas-diagram-request.v1
  ↓
excalidraw-ai-proxy
  ↓
normalized Mermaid stream
  ↓
editable Excalidraw canvas
  ↓ optional
mq-agent → mq-mcp review → annotations
```

### Architecture boundaries and ownership

* [ ] Atlas One owns mode selection, workflow context, diagram intent, style
      hints and user-visible handoff
* [ ] `excalidraw-ai-proxy` owns OpenAI credentials, model routing, prompt
      limits, rate limits, SSE streaming and Mermaid repair
* [ ] Excalidraw owns element state, selection state, layout interaction,
      editing, export and undo/redo
* [ ] mq-agent owns optional review/audit orchestration
* [ ] mq-mcp owns validation, safety classification and review contracts
* [ ] mqobsidian owns durable decisions and curated diagram references
* [ ] No browser surface receives an API key or calls a model provider directly
* [ ] No repo duplicates another repo's runtime or review logic

### 1. Contract and compatibility spike

Purpose: prove the smallest end-to-end path before adding product UI.

* [x] Define `atlas-diagram-request.v1` with:
  * request id and schema version
  * goal and user-visible title
  * Atlas mode or ordered workflow sequence
  * diagram type and layout direction
  * required concepts, relationships and boundaries
  * style hints that remain advisory
  * source/provenance metadata
  * explicit validation and refinement intent
* [x] Define a versioned response envelope for success, validation failure,
      timeout, rate limit and unsupported capability
* [x] Add JSON examples for `architect`, `analyze`, `decide`, `plan`, `debug`
      and `review`
* [ ] Confirm the existing proxy capability endpoint and
      `POST /v1/ai/text-to-diagram/chat-streaming` support the handoff
* [ ] Build a local proof that sends one architecture request through the proxy
      and imports the normalized Mermaid into Excalidraw
* [x] Record unsupported Excalidraw import or selection APIs before committing
      to the refinement design
* [x] Reject unknown schema versions and malformed payloads with clear errors

Proposed Atlas-owned files:

```text
docs/contracts/atlas-diagram-request.v1.schema.json
docs/contracts/examples/atlas-diagram-architect.json
docs/contracts/examples/atlas-diagram-review.json
docs/ATLAS_CANVAS.md
```

### 2. Atlas mode-to-diagram composer

Purpose: make diagram requests deterministic enough to review and test.

* [ ] Map supported modes to diagram defaults:
  * `architect` → architecture / trust-boundary diagram
  * `analyze` → dependency or cause map
  * `decide` → decision tree or option matrix
  * `plan` → phased roadmap or process flow
  * `debug` → diagnostic flow
  * `review` → risk and control map
* [ ] Keep every default visible and editable before generation
* [ ] Compose requests from the resolved v2.0 workflow sequence when present
* [ ] Let users select diagram type, layout and included concerns explicitly
* [ ] Add deterministic fallbacks for modes without a dedicated mapping
* [ ] Prevent free-form Atlas content from becoming hidden system instructions
* [ ] Show the final request payload in a collapsible preview
* [ ] Add unit fixtures for every supported mode and fallback

Proposed Atlas-owned files:

```text
web/atlas-canvas.js
docs/atlas-canvas.js
docs/contracts/examples/
scripts/check-atlas-canvas.sh
```

### 3. Open in Excalidraw MVP

Purpose: deliver a useful one-way generation flow before bidirectional editing.

* [ ] Add an `Open in Canvas` action beside copy and mq-agent execution
* [ ] Add a preflight check against the proxy capability endpoint
* [ ] Show unavailable, connecting, streaming, ready and failed states
* [ ] Stream generation progress without exposing raw provider responses
* [ ] Import the completed Mermaid into the configured local Excalidraw editor
* [ ] Preserve the original Atlas goal, mode and request id as safe metadata
* [ ] Provide copy/download fallback when Excalidraw is unavailable
* [ ] Avoid popup-only navigation; require an explicit user action
* [ ] Add keyboard access and screen-reader labels to the complete flow
* [ ] Document local ports and configuration without hardcoded private paths

### 4. Excalidraw integration surface

Purpose: keep the Excalidraw fork change small and upstream-aware.

* [ ] Prefer supported Excalidraw import/library mechanisms over fork-specific
      internals
* [ ] Add the smallest bridge needed to accept a versioned Atlas handoff
* [ ] Validate origin, payload size, schema version and allowed message types
* [ ] Require user confirmation before replacing or adding canvas content
* [ ] Preserve undo/redo for every Atlas-originated canvas mutation
* [ ] Store only non-sensitive provenance in element or scene metadata
* [ ] Add a visible `Generated from Atlas` source marker
* [ ] Document all fork-specific changes and likely upstream conflicts
* [ ] Add compatibility tests for the pinned Excalidraw revision

### 5. Selection refinement loop

Purpose: let users evolve a diagram without regenerating the whole scene.

* [ ] Define `atlas-diagram-refinement.v1` for selected elements plus intent
* [ ] Support initial refinement actions:
  * expand architecture
  * add trust boundaries
  * show dependencies
  * show risks and controls
  * simplify selected area
  * turn selection into an implementation plan
* [ ] Send only the minimum selected context required for refinement
* [ ] Preview the proposed change before mutating the canvas
* [ ] Add or replace only the confirmed selection scope
* [ ] Preserve stable identifiers where possible
* [ ] Make every refinement undoable in one action
* [ ] Handle deleted, stale or unsupported selections safely
* [ ] Record request lineage without storing raw sensitive diagram content

### 6. MQ validation and annotation loop

Purpose: add evidence-backed review without moving review logic into Atlas.

* [ ] Add a separate, explicit `Validate with MQ` action
* [ ] Convert the diagram into a compact review payload with source references
* [ ] Route validation through mq-agent to existing mq-mcp review contracts
* [ ] Keep validation read-only until the user accepts proposed annotations
* [ ] Map structured findings to annotation nodes for:
  * fact
  * assumption
  * risk
  * missing boundary
  * recommendation
* [ ] Include finding id, severity, source and timestamp in safe metadata
* [ ] Never present model-generated annotations as verified facts
* [ ] Allow users to accept, dismiss or refresh findings individually
* [ ] Save durable decisions only through an mqobsidian handoff

### 7. MQ visual library and theme

Purpose: make generated diagrams recognizable and semantically consistent.

* [ ] Define an `mq-amber-dark` theme with accessible contrast
* [ ] Define colors and line styles for facts, assumptions, risks, controls and
      recommendations
* [ ] Create reusable components for mq-agent, mq-mcp, mqobsidian, mq-hal and
      external providers
* [ ] Add curated Azure, Entra ID, Citrix and IGEL symbols only when licensing
      permits redistribution
* [ ] Keep semantic role separate from visual style in the request contract
* [ ] Make every generated diagram usable without the custom library
* [ ] Version the library and document migration behavior

### 8. Security, privacy and failure handling

* [ ] Keep proxy binding on localhost by default
* [ ] Maintain explicit CORS allowlists for Atlas and Excalidraw origins
* [ ] Enforce request, prompt, image and response size limits
* [ ] Apply timeouts, cancellation and rate limiting to all generation flows
* [ ] Redact or reject secrets, tokens and private absolute paths before handoff
* [ ] Do not persist raw prompts, scenes or provider responses by default
* [ ] Treat imported Mermaid and diagram metadata as untrusted input
* [ ] Render errors as user-visible states without leaking credentials or
      internal provider details
* [ ] Fail closed when capability negotiation or schema validation fails
* [ ] Add a public-safe scan before commit, release and generated-doc publish

### 9. Test and release gates

Atlas One gates:

* [ ] Contract examples validate against their JSON schemas
* [ ] Every supported mode produces a valid deterministic request
* [ ] Unsupported modes use the documented fallback
* [ ] Static Pages mode remains useful without the local proxy
* [ ] `scripts/check-prompts.sh` continues to pass
* [ ] `scripts/check-docs.sh` continues to pass
* [ ] `scripts/check-atlas-canvas.sh` passes
* [ ] `scripts/release-check.sh` passes

Integration gates:

* [ ] Proxy health and capability preflight passes
* [ ] Text-to-diagram SSE success and error paths are tested
* [ ] Mermaid repair failures produce a safe, actionable error
* [ ] Excalidraw import preserves editable elements
* [ ] Selection refinement changes only confirmed scope and is undoable
* [ ] MQ review annotations preserve finding provenance
* [ ] Browser tests cover unavailable proxy, timeout, cancellation and retry
* [ ] No test or fixture contains real keys, private paths or sensitive scenes

Release gates:

* [ ] Pin and document compatible Atlas, proxy and Excalidraw versions
* [ ] Update README, ROADMAP, VERSION and CHANGELOG together
* [ ] Add installation, troubleshooting and rollback documentation
* [ ] Pass Atlas One, proxy and Excalidraw CI on the integration branches
* [ ] Complete manual smoke test on a clean local setup
* [ ] Publish a demo diagram containing no private infrastructure details

### v2.1.0 definition of done

* [ ] A user can turn an Atlas goal into an editable Excalidraw diagram
* [ ] Architect, analyze, decide, plan, debug and review modes are supported
* [ ] The request contract is versioned, documented and schema-validated
* [ ] Proxy capabilities are negotiated before generation
* [ ] A selected diagram region can be refined with preview and single-step undo
* [ ] MQ validation is explicit, read-only by default and provenance-preserving
* [ ] Static Atlas remains useful when local integration services are offline
* [ ] API keys remain server-side in `excalidraw-ai-proxy`
* [ ] Atlas contains no duplicated model, review or persistence runtime
* [ ] Accessibility, security, integration and release gates pass

### Dependencies and build order

```text
v2.0 workflow sequences
  ↓
1. Contract + compatibility spike
  ↓
2. Mode-to-diagram composer
  ↓
3. Open in Excalidraw MVP
  ↓
4. Excalidraw bridge hardening
  ↓
5. Selection refinement
  ↓
6. MQ validation annotations
  ↓
7. Visual library + release hardening
```

Steps 1–3 form the first releasable vertical slice. Steps 5–7 must not block a
safe one-way MVP.

### Rollback

* [ ] Keep Atlas Canvas behind a local feature flag until integration gates pass
* [ ] Preserve copy/export and mq-agent actions as independent fallbacks
* [ ] Make the Excalidraw bridge additive so it can be disabled without scene
      migration
* [ ] Roll back by disabling the feature flag and reverting the integration
      commits per owner repo; do not rewrite stored user scenes
* [ ] Keep all request schemas versioned so older clients fail clearly rather
      than silently changing behavior

### Out of scope

* Atlas-side OpenAI or Ollama calls
* Autonomous canvas editing without preview and user confirmation
* Replacing Excalidraw's editor, scene model or export system
* Reimplementing mq-mcp review, safety or validation rules
* Persisting diagrams directly from Atlas into mqobsidian
* Real-time multi-user collaboration
* Cloud hosting, remote authentication or internet-exposed proxy deployment
* Automatic infrastructure deployment from a generated diagram

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
v2.0.0 — Atlas as a local prompt/workflow studio (build workflow packs first)
```

All items through v1.5.0 are shipped: the prompt operating system (v1.0.0),
the mq-agent execution bridge (v1.1.0), the Ollama runtime policy (v1.2.0),
public status/release clarity (v1.3.0), Save to brain + portable `MQ_ROOT` +
prompt reorganization (v1.4.0), and public repo hygiene + prompt-pack maturity
(v1.5.0).

v2.0.0 is now scoped (see the section above). The first concrete step is scope
block 1 — reusable workflow packs: define the workflow-pack format and
`WORKFLOW_PACK_TEMPLATE.md`, ship at least three working pack types, and extend
`check-prompts.sh` to validate them. Mode routing v2 and mq handoff contracts
build on top of that, in that order, while keeping the existing boundaries —
mq-agent executes, mq-mcp validates, mqobsidian persists.
