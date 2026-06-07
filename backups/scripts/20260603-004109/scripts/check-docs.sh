#!/usr/bin/env bash
# check-docs.sh — verify docs consistency across VERSION, CHANGELOG, README
# v0.5.0

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"

PASS=0
FAIL=0
WARN=0

ok()   { echo "  ✓ $1"; ((PASS++)) || true; }
fail() { echo "  ✗ $1"; ((FAIL++)) || true; }
warn() { echo "  ~ $1"; ((WARN++)) || true; }

echo ""
echo "━━━ Atlas One — Docs Check ━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# --- VERSION file ---
echo "[ VERSION ]"
VERSION_FILE="$REPO_ROOT/VERSION"
if [[ -f "$VERSION_FILE" ]]; then
  VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')
  ok "VERSION file exists: $VERSION"
else
  fail "VERSION file missing"
  VERSION="unknown"
fi

# --- CHANGELOG ---
echo ""
echo "[ CHANGELOG ]"
CHANGELOG="$REPO_ROOT/CHANGELOG.md"
if [[ -f "$CHANGELOG" ]]; then
  ok "CHANGELOG.md exists"
  if grep -q "\[$VERSION\]" "$CHANGELOG"; then
    ok "CHANGELOG contains version [$VERSION]"
  else
    fail "CHANGELOG missing entry for [$VERSION]"
  fi
  if grep -q "\[Unreleased\]" "$CHANGELOG"; then
    ok "CHANGELOG has [Unreleased] section"
  else
    warn "CHANGELOG missing [Unreleased] section"
  fi
else
  fail "CHANGELOG.md missing"
fi

# --- README ---
echo ""
echo "[ README ]"
README="$REPO_ROOT/README.md"
if [[ -f "$README" ]]; then
  ok "README.md exists"
  if grep -q "v$VERSION" "$README"; then
    ok "README references v$VERSION"
  else
    warn "README does not mention v$VERSION (may be intentional)"
  fi
  if grep -q "docs/prompts/" "$README"; then
    ok "README links to docs/prompts/"
  else
    warn "README has no links to docs/prompts/"
  fi
else
  fail "README.md missing"
fi

# --- ROADMAP ---
echo ""
echo "[ ROADMAP ]"
ROADMAP="$REPO_ROOT/ROADMAP.md"
if [[ -f "$ROADMAP" ]]; then
  ok "ROADMAP.md exists"
  if grep -q "v$VERSION" "$ROADMAP"; then
    ok "ROADMAP references v$VERSION"
  else
    warn "ROADMAP does not mention v$VERSION"
  fi
else
  warn "ROADMAP.md missing"
fi

# --- Docs directory ---
echo ""
echo "[ docs/ ]"
DOCS_DIR="$REPO_ROOT/docs"
for doc in PROMPT_LIBRARY.md MODES.md ROUTING.md EXAMPLES.md; do
  if [[ -f "$DOCS_DIR/$doc" ]]; then
    ok "docs/$doc exists"
  else
    fail "docs/$doc missing"
  fi
done

# --- Prompt files vs docs/MODES.md ---
echo ""
echo "[ mode files vs docs/MODES.md ]"
MODES_FILE="$DOCS_DIR/MODES.md"
MODES_DIR="$REPO_ROOT/docs/prompts/modes"
if [[ -f "$MODES_FILE" ]]; then
  file_count=0
  for f in "$MODES_DIR"/*.md; do
    [[ -f "$f" ]] || continue
    mode_id="$(basename "$f" .md)"
    if grep -qi "$mode_id" "$MODES_FILE"; then
      ok "docs/MODES.md covers '$mode_id'"
    else
      warn "docs/MODES.md may not cover '$mode_id'"
    fi
    ((file_count++)) || true
  done
  echo "  → $file_count modes checked against docs/MODES.md"
else
  warn "docs/MODES.md missing — cannot cross-check"
fi

# --- exports/ ---
echo ""
echo "[ exports/ ]"
EXPORTS_DIR="$REPO_ROOT/exports"
for f in atlas-one-core.txt atlas-one-manifest.json atlas-one-chatgpt-instructions.txt atlas-one-claude-instructions.md; do
  if [[ -f "$EXPORTS_DIR/$f" ]]; then
    ok "exports/$f exists"
  else
    fail "exports/$f missing"
  fi
done

# --- web/prompts.json vs docs/prompts.json ---
echo ""
echo "[ prompts.json sync ]"
WEB_JSON="$REPO_ROOT/web/prompts.json"
DOCS_JSON="$REPO_ROOT/docs/prompts.json"
  if [[ -f "$WEB_JSON" && -f "$DOCS_JSON" ]]; then
  web_ver=$(grep '"version"' "$WEB_JSON" | head -1 | grep -o '"[0-9.]*"' | tr -d '"')
  docs_ver=$(grep '"version"' "$DOCS_JSON" | head -1 | grep -o '"[0-9.]*"' | tr -d '"')
  if [[ "$web_ver" == "$docs_ver" ]]; then
    ok "web/prompts.json and docs/prompts.json both at v$web_ver"
  else
    fail "version mismatch: web=$web_ver docs=$docs_ver — run: cp web/prompts.json docs/prompts.json"
  fi
else
  warn "one or both prompts.json files missing"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Pass: $PASS   Warn: $WARN   Fail: $FAIL"

if [[ $FAIL -gt 0 ]]; then
  echo "  STATUS: FAIL"
  exit 1
else
  echo "  STATUS: PASS"
  exit 0
fi
