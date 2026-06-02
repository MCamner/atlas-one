#!/usr/bin/env bash
# release-check.sh — pre-release readiness check for atlas-one
# Uses: git, gitleaks, mqlaunch doctor, check-prompts.sh, check-docs.sh
# v0.5.0

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCRIPTS_DIR="$REPO_ROOT/scripts"

PASS=0
FAIL=0
WARN=0

ok()      { echo "  ✓ $1"; ((PASS++)) || true; }
fail()    { echo "  ✗ $1"; ((FAIL++)) || true; }
warn()    { echo "  ~ $1"; ((WARN++)) || true; }
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
if git rev-parse --git-dir &>/dev/null; then
  ok "git repo detected"
else
  fail "not a git repository"
fi

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
  warn "$AHEAD commit(s) ahead of remote — push before tagging"
fi

echo ""
echo "  Recent commits:"
git log --oneline -3 | sed 's/^/    /'

# --- mqlaunch doctor ---
section "Environment (mqlaunch doctor)"
if command -v mqlaunch &>/dev/null && command -v jq &>/dev/null; then
  doctor_json=$(mqlaunch doctor --json 2>/dev/null) || doctor_json=""
  if [[ -n "$doctor_json" ]]; then
    doc_ok=$(echo "$doctor_json" | jq -r '.summary.ok // 0')
    doc_warn=$(echo "$doctor_json" | jq -r '.summary.warn // 0')
    doc_fail=$(echo "$doctor_json" | jq -r '.summary.fail // 0')
    if [[ "$doc_fail" -gt 0 ]]; then
      fail "mqlaunch doctor: $doc_fail check(s) failed (ok=$doc_ok warn=$doc_warn)"
      echo "$doctor_json" | jq -r '.checks[] | select(.status != "ok") | "    ✗ \(.name): \(.status)"'
    elif [[ "$doc_warn" -gt 0 ]]; then
      warn "mqlaunch doctor: ok=$doc_ok warn=$doc_warn fail=$doc_fail"
    else
      ok "mqlaunch doctor: all $doc_ok checks pass"
    fi
  else
    warn "mqlaunch doctor returned no output"
  fi
else
  warn "mqlaunch or jq not available — skipping environment check"
fi

# --- Secrets scan (gitleaks, with timeout) ---
section "Secrets scan"
if command -v gitleaks &>/dev/null; then
  if command -v timeout &>/dev/null; then
    scan_cmd="timeout 30 gitleaks detect --source $REPO_ROOT --no-banner"
  else
    scan_cmd="gitleaks detect --source $REPO_ROOT --no-banner"
  fi
  if $scan_cmd 2>/dev/null; then
    ok "gitleaks: no secrets detected"
  else
    exit_code=$?
    if [[ $exit_code -eq 124 ]]; then
      warn "gitleaks timed out after 30s — run manually to verify"
    else
      fail "gitleaks: potential secrets found — check before releasing"
    fi
  fi
else
  warn "gitleaks not installed — skipping secrets scan"
fi

# --- Prompt checks ---
section "Prompt check"
prompt_out=$(bash "$SCRIPTS_DIR/check-prompts.sh" 2>&1)
prompt_exit=$?
echo "$prompt_out" | grep -E "^  (✓|✗|~|→|Pass|Fail|STATUS)" | tail -3 | sed 's/^/  /'
if [[ $prompt_exit -eq 0 ]]; then
  ok "check-prompts.sh passed"
else
  fail "check-prompts.sh failed — run scripts/check-prompts.sh for details"
fi

# --- Docs checks ---
section "Docs check"
docs_out=$(bash "$SCRIPTS_DIR/check-docs.sh" 2>&1)
docs_exit=$?
echo "$docs_out" | grep -E "^  (✓|✗|~|→|Pass|Fail|STATUS)" | tail -3 | sed 's/^/  /'
if [[ $docs_exit -eq 0 ]]; then
  ok "check-docs.sh passed"
else
  fail "check-docs.sh failed — run scripts/check-docs.sh for details"
fi

# --- Prompt index freshness ---
section "Prompt index"
INDEX_FILE="$REPO_ROOT/docs/PROMPT_INDEX.md"
if [[ -f "$INDEX_FILE" ]]; then
  ok "docs/PROMPT_INDEX.md exists"
  index_date=$(grep "^Generated:" "$INDEX_FILE" 2>/dev/null | head -1 | awk '{print $2}' || echo "")
  today=$(date -u +"%Y-%m-%d")
  if [[ "$index_date" == "$today" ]]; then
    ok "index generated today ($today)"
  else
    warn "index last generated ${index_date:-unknown} — run: scripts/generate-prompt-index.sh"
  fi
else
  warn "docs/PROMPT_INDEX.md missing — run: scripts/generate-prompt-index.sh"
fi

# --- Release checklist ---
section "Release checklist"
echo ""
echo "  Automated checks above. Manual steps before tagging v$VERSION:"
echo ""
echo "  [ ] CHANGELOG entry added for v$VERSION"
echo "  [ ] VERSION file set to $VERSION"
echo "  [ ] README status line reflects v$VERSION"
echo "  [ ] docs/prompts.json synced:  cp web/prompts.json docs/prompts.json"
echo "  [ ] exports/ regenerated if prompts changed"
echo "  [ ] prompt index regenerated:  scripts/generate-prompt-index.sh"
echo "  [ ] GitHub Actions CI passing"
echo "  [ ] AI review run:             mqlaunch review"
echo "  [ ] GitHub release tagged:     git tag v$VERSION && git push --tags"
echo ""
echo "  Quick commands:"
echo "    mqlaunch review             — copy review prompt to clipboard"
echo "    mqlaunch ask \"release v$VERSION ready?\" — ask for release assessment"

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
