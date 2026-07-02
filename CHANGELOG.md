# Changelog

## [Unreleased]

## [1.5.0] - 2026-07-02

### Added

* `SECURITY.md`, `CONTRIBUTING.md`, a feature-request issue template and a pull
  request template.
* CI status badge for the prompt/docs checks in the README.
* `archive/legacy/` for retired prototype source, with a provenance README.
* MQ ecosystem architecture diagram (Mermaid) in the README.
* Canonical prompt-pack template `docs/prompts/PACK_TEMPLATE.md`, with a
  defined pack-maturity standard and scope in the ROADMAP.

### Changed

* ROADMAP aligned with the v1.4.0 shipped state; v1.5.0 (public repo hygiene
  and prompt-pack maturity) defined as next and a v2.0.0 direction added.
* README slimmed — merged repeated product positioning and made mqobsidian
  explicit in the architecture boundary.
* CONTRIBUTING documents the prompt-pack template and maturity bar.
* All 14 prompt packs brought up to the maturity standard (`When to Use`,
  `Expected Output`, `Constraints`, `Example`); `check-prompts.sh` (v0.6.0)
  now enforces it. Regenerated the prompt index.

### Removed

* Tracked build artifacts (`dist/*.class`), `.bak` backups and the `backups/`
  script tree; dead `v2` / `atlas-ui-patch` prototype source moved to
  `archive/legacy/`.

## [1.4.0] - 2026-06-10

### Added

* `Save to brain` button (p11) — routes Atlas reasoning outputs directly to
  `decisions/` in the Obsidian second brain.

### Changed

* macOS runtime made portable via `MQ_ROOT` environment variable — no hardcoded
  home directory paths.
* Prompt references updated after moving `prompts/` → `docs/prompts/`.
* Second-brain folder structure reorganized (mqobsidian cleanup).

### Fixed

* markdownlint MD004: all dash lists converted to asterisk style.
* MD060 disabled for auto-generated tables.
* VSCode `codeActionsOnSave` set for markdownlint auto-fix.

## [1.3.0] - 2026-06-07

### Changed

* Updated the public project status to `v1.3.0 — public status and release
  clarity`.
* Aligned `README.md`, `ROADMAP.md`, `VERSION`, `CHANGELOG.md`, and GitHub
  Pages version copy around the same public project phase.
* Added a current architecture note clarifying that Atlas One owns prompts and
  interaction patterns, mq-agent orchestrates execution, mq-mcp owns review,
  risk, validation and memory contracts, and Ollama is only an optional local
  provider.

## [1.2.0] - 2026-06-07

### Added

* Added `prompts/packs/ollama-runtime-policy.md` and
  `prompts/packs/ollama-learn-extract.md` with export text for framing local
  Ollama model usage as mq-mcp provider work.
* Added `docs/OLLAMA_PROVIDER_PLAN.md` with the recommended mq-mcp provider
  scaffold, learn extraction schema shape, three fixtures, and eval checklist.

### Changed

* Marked v1.2.0 complete in `ROADMAP.md`.
* Updated `docs/MQ_ECOSYSTEM.md` to keep `MCamner/ollama` as a clean upstream
  fork and place MQ-specific provider work in mq-mcp.

## [1.0.0] - 2026-06-03

### Changed

* Declared v1.0.0 stable: all release requirements verified
* Core prompt status updated to `v0.7.0 stable`
* 5 new packs registered in `web/prompts.json` and `docs/prompts.json`
* `docs/prompts.json` synced with `web/prompts.json` (14 packs total)
* README version badge updated to v0.7.0

## [0.7.0] - 2026-06-03

### Added

* Added `prompts/packs/architecture-review.md` — structured architecture review pack with prompts for full review, decision critique, component responsibility, and risk surface analysis.
* Added `prompts/packs/writing-editor.md` — editing and writing pack with prompts for document editing, structure review, summary generation, and tone/clarity checks.
* Added `prompts/packs/interview-prep.md` — interview preparation pack covering interview strategy, behavioral question prep, technical concept review, and system design.
* Added `prompts/packs/personal/bjj-coach.md` — BJJ training reflection pack with prompts for session reflection, game plan development, pre-competition focus, and technique breakdown.
* Added `prompts/packs/personal/guitar-practice.md` — guitar practice pack with prompts for session planning, stuck point diagnosis, repertoire development, and ear training.
* Added 8 missing mode examples to `docs/EXAMPLES.md` — Research, Explain, Teach, Edit, Coach, Plan, Summarize, Create now all have worked examples.

## [0.6.0] - 2026-05-29

### Added

* Added `docs/MQ_ECOSYSTEM.md` — ecosystem map, boundary table, example flows, and mqlaunch command surface.
* Added `prompts/packs/mq-mcp-safety-review.md` — structures safety review thinking before invoking mq-mcp review contracts.
* Added `prompts/packs/mq-mcp-architecture-memory.md` — reasons about ADRs and boundaries from mq-mcp architecture_memory/.
* Added `prompts/packs/mq-ecosystem-boundaries.md` — maps responsibilities across mq tools for cross-tool workflow design.
* Added `prompts/packs/release-readiness.md` — wraps release-check.sh and repo-signal output in Atlas One Review mode.
* Added `prompts/packs/macos-scripts-terminal.md` — designs and debugs terminal workflows in macos-scripts.
* Added `.txt` exports for all new packs in `exports/prompt-packs/`.
* Registered all new packs in `web/prompts.json` and `docs/prompts.json`.

### Changed

* Updated `docs/PROMPT_INDEX.md` — now covers 13 modes and 9 packs.

---

## [0.5.0] - 2026-05-29

### Added

* Added `scripts/check-prompts.sh` — validates Version: Tags: metadata and Output Shape on all prompt files.
* Added `scripts/check-docs.sh` — checks VERSION/CHANGELOG/README/ROADMAP/docs consistency.
* Added `scripts/generate-prompt-index.sh` — parses all prompt files and writes `docs/PROMPT_INDEX.md`.
* Added `scripts/release-check.sh` — orchestrates all checks plus gitleaks secrets scan and manual release checklist.
* Added `.github/workflows/check-prompts.yml` — GitHub Actions CI for prompt and docs validation.
* Added `docs/PROMPT_INDEX.md` — auto-generated index of all modes, packs, and exports.

### Changed

* Bumped `VERSION` to `0.5.0`.

---

## [0.4.0] - 2026-05-29

### Added

* Added search input in sidebar (`#modeSearch`) — filters modes live by title, use case and tags.
* Added Modes section in sidebar — all 13 canonical modes rendered from `prompts.json`, clickable.
* Added Packs section in sidebar — 4 prompt packs with export links.
* Added Exports section in sidebar — direct links to `.txt`, `.md`, `.json` export files.
* Added keyboard shortcuts: `Ctrl+Enter` generate, `/` focus command, `s` focus search, `Esc` clear search.
* Added Quick Start collapsible panel in input section.
* Added `loadAndRenderSidebar()`, `renderModes()`, `filterModes()`, `renderPacks()`, `selectMode()`, `bindKeyboardShortcuts()` to `docs/atlas-final-prompt-v3-generic.js`.

### Changed

* Updated version badge in `docs/index.html` to `v0.3.0`.
* Synced `docs/prompts.json` from `web/prompts.json` (v0.3.0).

---

## [0.3.0] - 2026-05-29

### Added

* Added `exports/` directory with full export structure.
* Added `exports/atlas-one-manifest.json` — JSON manifest with metadata, tags and version for all 13 modes and 4 packs.
* Added `exports/atlas-one-core.txt` — plain-text export of core prompt.
* Added `exports/atlas-one-core.md` — markdown copy of core prompt.
* Added `exports/atlas-one-chatgpt-instructions.txt` — ChatGPT Custom Instructions format.
* Added `exports/atlas-one-claude-instructions.md` — Claude Project Instructions format.
* Added `exports/prompt-packs/` — 4 bundled packs with starter and follow-up prompts.
* Added `version` and `tags` metadata to all 13 `prompts/modes/*.md` files.
* Added `version` and `tags` metadata to all 4 `prompts/packs/*.md` files.

### Changed

* Updated `web/prompts.json` and `docs/prompts.json` to v0.3.0 with `version`, `tags`, and `exportPath` fields.
* Updated `ROADMAP.md` current status to v0.3.0.

---

## [0.2.0] - 2026-05-24

### Added

* Added file-based prompt library under `prompts/`.
* Added `prompts/atlas-one.md` as the standalone Atlas One core prompt.
* Added 13 mode files under `prompts/modes/`.
* Added seed prompt packs for repo review, systems thinking, product strategy and learning coach workflows.
* Added `docs/PROMPT_LIBRARY.md`.
* Added `docs/MODES.md`.
* Added `docs/ROUTING.md`.
* Added `docs/EXAMPLES.md`.
* Added v0.2.0 prompt manifest metadata to `web/prompts.json` and `docs/prompts.json`.

### Changed

* Updated README with v0.2.0 status, prompt library links and canonical mode list.
* Updated local and Pages prompt routing foundation to use the v0.2.0 mode taxonomy.
* Bumped `VERSION` to `0.2.0`.

### Safety

* Documented prompt safety rules for hidden chain-of-thought, tool execution and approval boundaries.

### Initial setup

* Initial release setup
