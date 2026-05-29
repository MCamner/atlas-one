# Changelog

## [Unreleased]

## [0.6.0] - 2026-05-29

### Added

- Added `docs/MQ_ECOSYSTEM.md` — ecosystem map, boundary table, example flows, and mqlaunch command surface.
- Added `prompts/packs/mq-mcp-safety-review.md` — structures safety review thinking before invoking mq-mcp review contracts.
- Added `prompts/packs/mq-mcp-architecture-memory.md` — reasons about ADRs and boundaries from mq-mcp architecture_memory/.
- Added `prompts/packs/mq-ecosystem-boundaries.md` — maps responsibilities across mq tools for cross-tool workflow design.
- Added `prompts/packs/release-readiness.md` — wraps release-check.sh and repo-signal output in Atlas One Review mode.
- Added `prompts/packs/macos-scripts-terminal.md` — designs and debugs terminal workflows in macos-scripts.
- Added `.txt` exports for all new packs in `exports/prompt-packs/`.
- Registered all new packs in `web/prompts.json` and `docs/prompts.json`.

### Changed

- Updated `docs/PROMPT_INDEX.md` — now covers 13 modes and 9 packs.

---

## [0.5.0] - 2026-05-29

### Added

- Added `scripts/check-prompts.sh` — validates Version: Tags: metadata and Output Shape on all prompt files.
- Added `scripts/check-docs.sh` — checks VERSION/CHANGELOG/README/ROADMAP/docs consistency.
- Added `scripts/generate-prompt-index.sh` — parses all prompt files and writes `docs/PROMPT_INDEX.md`.
- Added `scripts/release-check.sh` — orchestrates all checks plus gitleaks secrets scan and manual release checklist.
- Added `.github/workflows/check-prompts.yml` — GitHub Actions CI for prompt and docs validation.
- Added `docs/PROMPT_INDEX.md` — auto-generated index of all modes, packs, and exports.

### Changed

- Bumped `VERSION` to `0.5.0`.

---

## [0.4.0] - 2026-05-29

### Added

- Added search input in sidebar (`#modeSearch`) — filters modes live by title, use case and tags.
- Added Modes section in sidebar — all 13 canonical modes rendered from `prompts.json`, clickable.
- Added Packs section in sidebar — 4 prompt packs with export links.
- Added Exports section in sidebar — direct links to `.txt`, `.md`, `.json` export files.
- Added keyboard shortcuts: `Ctrl+Enter` generate, `/` focus command, `s` focus search, `Esc` clear search.
- Added Quick Start collapsible panel in input section.
- Added `loadAndRenderSidebar()`, `renderModes()`, `filterModes()`, `renderPacks()`, `selectMode()`, `bindKeyboardShortcuts()` to `docs/atlas-final-prompt-v3-generic.js`.

### Changed

- Updated version badge in `docs/index.html` to `v0.3.0`.
- Synced `docs/prompts.json` from `web/prompts.json` (v0.3.0).

---

## [0.3.0] - 2026-05-29

### Added

- Added `exports/` directory with full export structure.
- Added `exports/atlas-one-manifest.json` — JSON manifest with metadata, tags and version for all 13 modes and 4 packs.
- Added `exports/atlas-one-core.txt` — plain-text export of core prompt.
- Added `exports/atlas-one-core.md` — markdown copy of core prompt.
- Added `exports/atlas-one-chatgpt-instructions.txt` — ChatGPT Custom Instructions format.
- Added `exports/atlas-one-claude-instructions.md` — Claude Project Instructions format.
- Added `exports/prompt-packs/` — 4 bundled packs with starter and follow-up prompts.
- Added `version` and `tags` metadata to all 13 `prompts/modes/*.md` files.
- Added `version` and `tags` metadata to all 4 `prompts/packs/*.md` files.

### Changed

- Updated `web/prompts.json` and `docs/prompts.json` to v0.3.0 with `version`, `tags`, and `exportPath` fields.
- Updated `ROADMAP.md` current status to v0.3.0.

---

## [0.2.0] - 2026-05-24

### Added

- Added file-based prompt library under `prompts/`.
- Added `prompts/atlas-one.md` as the standalone Atlas One core prompt.
- Added 13 mode files under `prompts/modes/`.
- Added seed prompt packs for repo review, systems thinking, product strategy and learning coach workflows.
- Added `docs/PROMPT_LIBRARY.md`.
- Added `docs/MODES.md`.
- Added `docs/ROUTING.md`.
- Added `docs/EXAMPLES.md`.
- Added v0.2.0 prompt manifest metadata to `web/prompts.json` and `docs/prompts.json`.

### Changed

- Updated README with v0.2.0 status, prompt library links and canonical mode list.
- Updated local and Pages prompt routing foundation to use the v0.2.0 mode taxonomy.
- Bumped `VERSION` to `0.2.0`.

### Safety

- Documented prompt safety rules for hidden chain-of-thought, tool execution and approval boundaries.

### Initial setup

- Initial release setup
