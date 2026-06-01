# Atlas One Roadmap

Atlas One is a prompt operating system for structured reasoning.

It is designed to help a user move from a rough request to a clear mode of
thinking, a useful output format and a better final answer.

The goal is not to collect random prompts.

The goal is to create a practical reasoning surface that can:

- classify the user's real goal
- choose the right thinking mode
- structure the output
- keep prompts reusable
- make expert-style reasoning easier to access
- work well as a GitHub Pages prompt library
- later connect to local mq ecosystem tools

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
v0.6.0 — mq ecosystem integration (done)
Next:    v0.7.0 — personal workflow packs
```

Completed foundation:

- GitHub Pages prompt interface
- Base Atlas One prompt
- Prompt library and mode routing
- Quick-action style prompt UX
- Release and security structure
- Structured reasoning modes

Future mq ecosystem work should build on this foundation with reusable prompt
packs. Atlas One should package prompts and interaction patterns; mq-mcp remains
the review/risk/architecture runtime.

Reason:

Atlas One needs a clearer information architecture before more features are
added. The next release should make the prompt system easier to navigate,
version, test and expand.

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
| v0.7.0  | Personal workflow packs                    | Planned       |
| v1.0.0  | Stable prompt operating system             | Future        |

---

## Completed foundation

### v0.1.0 — Public prompt foundation

Goal:

Create the first public Atlas One prompt system.

- [x] Add Atlas One base prompt
- [x] Define core operating principle
- [x] Define command interface
- [x] Add reasoning-mode concept
- [x] Add structured output rules
- [x] Add prompt reuse concept
- [x] Add README
- [x] Add ROADMAP
- [x] Add security note
- [x] Add release structure

---

### v0.1.1 — GitHub Pages and product polish

Goal:

Make Atlas One usable and understandable from the GitHub front page and Pages
site.

- [x] Add GitHub Pages front door
- [x] Add prompt UI concept
- [x] Add quick-action buttons
- [x] Add cache-busting for prompt library assets
- [x] Add basic project positioning
- [x] Add security/release notes
- [x] Add first public documentation structure

---

## Completed: v0.2.0 — Prompt library and mode routing foundation

Goal:

Turn Atlas One from a single strong prompt into a small, organized prompt
operating system.

This release should make the repo easier to extend without turning it into a
messy prompt dump.

### Scope

- [x] Create `prompts/` directory
- [x] Create `prompts/atlas-one.md`
- [x] Create `prompts/modes/`
- [x] Add prompt modes as separate markdown files
- [x] Add `docs/PROMPT_LIBRARY.md`
- [x] Add `docs/MODES.md`
- [x] Add `docs/ROUTING.md`
- [x] Add `docs/EXAMPLES.md`
- [x] Add canonical mode list
- [x] Add mode descriptions
- [x] Add recommended output format per mode
- [x] Add examples for each mode
- [x] Add GitHub Pages prompt library section
- [x] Add README links to prompt library
- [x] Add version badge or status line
- [x] Add changelog entry

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

- [x] Atlas One base prompt is stored as a standalone file
- [x] Modes are documented
- [x] Each mode has a clear use case
- [x] Each mode has a recommended output shape
- [x] README links to prompt library
- [x] GitHub Pages shows prompt library
- [x] CHANGELOG includes v0.2.0
- [x] GitHub release `v0.2.0` exists

---

## v0.3.0 — Export formats and reusable prompt packs

Goal:

Make Atlas One prompts easier to copy, save, reuse and adapt.

### v0.3.0 planned scope

- [x] Add copy-friendly prompt blocks
- [x] Add raw markdown links
- [x] Add JSON prompt manifest
- [x] Add plain-text export format
- [x] Add ChatGPT custom-instructions format
- [x] Add Claude project-instructions format
- [x] Add local markdown pack format
- [x] Add prompt pack index
- [x] Add prompt metadata
- [x] Add prompt version field
- [x] Add prompt tags
- [x] Add prompt use-case examples

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

- [x] Improve landing page hierarchy
- [x] Add prompt search
- [x] Add mode filter
- [x] Add copy buttons
- [x] Add prompt preview panel
- [x] Add examples panel
- [x] Add version/status panel
- [x] Add keyboard-friendly navigation
- [x] Add mobile-friendly layout
- [x] Add dark terminal-inspired theme
- [x] Add quick-start section
- [x] Add links to raw prompt files
- [x] Add no-build static JS architecture

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

- [x] Pages site clearly explains Atlas One
- [x] User can copy the core prompt quickly
- [x] User can browse modes
- [x] User can view examples
- [x] User can find export formats
- [x] Site works without a backend
- [x] Site works on mobile

---

## v0.5.0 — Prompt quality checks and examples

Goal:

Make the prompt library easier to maintain as it grows.

### v0.5.0 planned scope

- [x] Add prompt linting script
- [x] Add markdown link check
- [x] Add prompt metadata check
- [x] Add mode coverage check
- [x] Add examples coverage check
- [x] Add duplicate heading check
- [x] Add release checklist
- [x] Add GitHub Actions validation
- [x] Add generated prompt index
- [x] Add proof section to README
- [x] Add docs consistency check

### Possible scripts

```bash
scripts/check-prompts.sh
scripts/generate-prompt-index.sh
scripts/check-docs.sh
scripts/release-check.sh
```

### v0.5.0 definition of done

- [ ] Every prompt has metadata
- [ ] Every mode has an example
- [ ] Prompt index is generated or validated
- [ ] README is synced with prompt library
- [ ] GitHub Actions pass
- [ ] GitHub release exists

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

- [x] Add `docs/MQ_ECOSYSTEM.md`
- [x] Add mqlaunch command examples
- [x] Add mq-agent prompt workflow examples
- [x] Add mq-hal reasoning-mode examples
- [x] Add repo-signal review prompt pack
- [x] Add mq-mcp safety-review prompt pack (maps to mq-mcp review contracts:
  comment, architecture, risk, security modes — mq-mcp v1.3.0+)
- [x] Add mq-mcp architecture-memory prompt pack — prompts that surface ADRs,
  boundaries, and philosophy entries from mq-mcp architecture_memory/
- [x] Add mq ecosystem boundary prompt pack covering central cognition in
  mq-mcp, orchestration in mq-agent, preprocessing in repo-signal, UX in
  macos-scripts, visual cognition in mq-image-analyze and observability in
  mq-hal
- [x] Add macos-scripts terminal workflow prompt pack
- [x] Add local assistant prompt bundle
- [x] Add prompt pack for release readiness
- [x] Keep prompt packs export-oriented; do not duplicate mq-mcp review logic
- [x] Add prompt pack for systems thinking

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

Create curated prompt packs for recurring workflows.

### Planned packs

- [ ] Repo review pack
- [ ] Release readiness pack
- [ ] Architecture review pack
- [ ] Systems thinking pack
- [ ] Product strategy pack
- [ ] Learning coach pack
- [ ] Writing/editor pack
- [ ] Interview prep pack
- [ ] BJJ training reflection pack
- [ ] Guitar practice pack

### Pack structure

```text
prompt-packs/
├── repo-review/
├── release-readiness/
├── systems-thinking/
├── architecture-review/
├── product-strategy/
├── learning-coach/
├── writing-editor/
├── interview-prep/
├── bjj-coach/
└── guitar-practice/
```

### v0.7.0 definition of done

- [ ] Each pack has a clear purpose
- [ ] Each pack has at least three prompts
- [ ] Each pack has examples
- [ ] Each pack has export format
- [ ] Pages site can browse packs

---

## v1.0.0 — Stable prompt operating system

Goal:

Make Atlas One stable enough to be the default prompt and reasoning layer for
personal work, repo review and local AI-assisted workflows.

### v1.0.0 requirements

- [ ] Stable core prompt
- [ ] Stable mode taxonomy
- [ ] Stable prompt file structure
- [ ] Stable prompt metadata format
- [ ] Stable export formats
- [ ] Complete prompt library docs
- [ ] Complete examples
- [ ] Complete GitHub Pages interface
- [ ] Complete changelog
- [ ] Complete release checklist
- [ ] GitHub Actions validation
- [ ] GitHub release
- [ ] Protected main branch
- [ ] No known prompt-injection or unsafe-instruction issues in packaged prompts

---

## Long-term ideas

These are intentionally not scheduled yet.

- visual prompt builder
- prompt comparison mode
- prompt scoring
- prompt version diff view
- local prompt search
- browser extension style export
- OpenAI custom GPT export
- Claude project export
- Codex prompt pack
- Obsidian vault export
- markdown knowledge-base export
- prompt cards
- shareable prompt URLs
- multi-language prompt packs
- Swedish Atlas One edition
- generated architecture diagrams
- demo videos or GIFs

---

## Design principles

Atlas One should remain:

- clear
- structured
- reusable
- versioned
- copy-friendly
- model-agnostic
- local-first when possible
- safe to paste
- easy to understand
- useful without requiring an API

It should improve thinking.

It should not become a vague prompt collection.

---

## Safety principles

Atlas One must not package prompts that:

- ask models to ignore system or developer instructions
- request hidden chain-of-thought
- encourage unsafe automation
- hide tool execution
- ask for secrets
- bypass approval gates
- blur the line between suggestion and execution

Every public prompt should have:

- purpose
- when to use it
- expected output
- constraints
- version or status
- example usage

---

## Current recommended next step

Work on:

```text
v0.7.0 — personal workflow packs
```

This release should create curated prompt packs for recurring workflows.
