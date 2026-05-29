#!/usr/bin/env bash
# release-check.sh — pre-release readiness check for atlas-one
# Uses: git, gitleaks (if available), check-prompts.sh, check-docs.sh
# v0.5.0

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS_DIR="$REPO_ROOT/scripts"

PASS=0
FAIL=0
WARN=0

ok()   { echo "  ✓ $1"; ((PASS++)) || true; }
fail() { echo "  ✗ $1"; ((FAIL++)) || true; }
warn() { echo "  ~ $1"; ((WARN++)) || true; }
section() { echo ""; echo "[ $1 ]"; }

echo ""
echo "━━━ Atlas One — Release Check ━━━━━━━━━━━━━━━━━━━"

# --- VERSION ---
section "VERSION"
VERSION_FILE="$REPO_ROOT/VERSION"
if [[ -f "$VERSION_FILE" ]]; then
  VERSION=$(cat "$VERSION_FILE" | tr -d '[:space:]')
  ok "VERSION: $VERSION"
else
  fail "VERSION file missing"
  VERSION="unknown"
fi

# --- Git status ---
section "Git"
cd "$REPO_ROOT"
if git diff --quiet && git diff --cached --quiet; then
  ok "working tree clean"
else
  warn "uncommitted changes present"
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
ok "branch: $BRANCH"

AHEAD=$(git rev-list @{u}..HEAD 2>/dev/null | wc -l | tr -d ' ') || AHEAD="?"
if [[ "$AHEAD" == "0" ]]; then
  ok "up to date with remote"
elif [[ "$AHEAD" == "?" ]]; then
  warn "no upstream configured"
else
  warn "$AHEAD commit(s) ahead of remote"
fi

# Show last 3 commits
echo ""
echo "  Recent commits:"
git log --oneline -3 | sed 's/^/    /'

# --- Secrets scan (gitleaks) ---
section "Secrets scan"
if command -v gitleaks &>/dev/null; then
  if gitleaks detect --source "$REPO_ROOT" --no-banner 2>/dev/null; then
    ok "gitleaks: no secrets detected"
  else
    fail "gitleaks: potential secrets found — check before releasing"
  fi
else
  warn "gitleaks not installed — skipping secrets scan"
fi

# --- Prompt checks ---
section "Prompt check"
if bash "$SCRIPTS_DIR/check-prompts.sh" 2>&1 | grep -E "^  (✓|✗|~|→|Pass|Fail|STAT)" | sed 's/^/  /'; then
  ok "check-prompts.sh passed"
else
  fail "check-prompts.sh failed"
fi

# --- Docs checks ---
section "Docs check"
if bash "$SCRIPTS_DIR/check-docs.sh" 2>&1 | grep -E "^  (✓|✗|~|→|Pass|Fail|STAT)" | sed 's/^/  /'; then
  ok "check-docs.sh passed"
else
  fail "check-docs.sh failed"
fi

# --- Prompt index freshness ---
section "Prompt index"
INDEX_FILE="$REPO_ROOT/docs/PROMPT_INDEX.md"
if [[ -f "$INDEX_FILE" ]]; then
  ok "docs/PROMPT_INDEX.md exists"
  index_date=$(grep "^Generated:" "$INDEX_FILE" | head -1 | awk '{print $2}')
  today=$(date -u +"%Y-%m-%d")
  if [[ "$index_date" == "$today" ]]; then
    ok "index generated today ($today)"
  else
    warn "index last generated $index_date — run: scripts/generate-prompt-index.sh"
  fi
else
  warn "docs/PROMPT_INDEX.md missing — run: scripts/generate-prompt-index.sh"
fi

# --- Release checklist ---
section "Release checklist"
echo ""
echo "  Manual checks (confirm before tagging):"
echo ""
echo "  [ ] CHANGELOG updated for v$VERSION"
echo "  [ ] VERSION file bumped to v$VERSION"
echo "  [ ] README status line reflects v$VERSION"
echo "  [ ] docs/prompts.json synced from web/prompts.json"
echo "  [ ] exports/ regenerated if prompts changed"
echo "  [ ] docs/PROMPT_INDEX.md regenerated"
echo "  [ ] GitHub Actions CI passing"
echo "  [ ] GitHub release tagged v$VERSION"

# --- Summary ---
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Pass: $PASS   Warn: $WARN   Fail: $FAIL"

if [[ $FAIL -gt 0 ]]; then
  echo "  STATUS: FAIL — fix errors before releasing"
  exit 1
else
  echo "  STATUS: PASS"
  exit 0
fi
