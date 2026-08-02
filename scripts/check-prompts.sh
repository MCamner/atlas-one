#!/usr/bin/env bash
# check-prompts.sh — validate metadata on all prompt files
# v0.6.0 — packs must meet the maturity standard (docs/prompts/PACK_TEMPLATE.md)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MODES_DIR="$REPO_ROOT/docs/prompts/modes"
PACKS_DIR="$REPO_ROOT/docs/prompts/packs"
CORE_FILE="$REPO_ROOT/docs/prompts/atlas-one.md"

PASS=0
FAIL=0
WARN=0

# Handles ok.
ok()   { echo "  ✓ $1"; ((PASS++)) || true; }
# Marks a failing check.
fail() { echo "  ✗ $1"; ((FAIL++)) || true; }
# Handles warn.
warn() { echo "  ~ $1"; ((WARN++)) || true; }

# Handles check file.
check_file() {
  local file="$1"
  local label
  label="$(basename "$file")"
  local errors=0

  # Required: Version: line
  if grep -q "^Version:" "$file"; then
    ok "$label — Version present"
  else
    fail "$label — missing Version:"
    ((errors++)) || true
  fi

  # Required: Tags: line
  if grep -q "^Tags:" "$file"; then
    ok "$label — Tags present"
  else
    fail "$label — missing Tags:"
    ((errors++)) || true
  fi

  # Required: at least one ## section
  if grep -q "^## " "$file"; then
    ok "$label — has section headings"
  else
    fail "$label — no ## section headings"
    ((errors++)) || true
  fi

  # Required: Output Shape section (modes only)
  if [[ "$file" == */modes/* ]]; then
    if grep -q "Output Shape" "$file"; then
      ok "$label — Output Shape present"
    else
      fail "$label — missing Output Shape"
      ((errors++)) || true
    fi
  fi

  # Required: Starter Prompt + maturity sections (packs only)
  if [[ "$file" == */packs/* ]]; then
    if grep -q "Starter Prompt" "$file"; then
      ok "$label — Starter Prompt present"
    else
      fail "$label — missing Starter Prompt"
      ((errors++)) || true
    fi

    # Pack maturity standard — see docs/prompts/PACK_TEMPLATE.md.
    # Each concept is matched on a heading; sensible synonyms are accepted.
    # check_section reports via ok()/fail(), which drive the PASS/FAIL summary.
    check_section "$file" "$label" "When to Use"     'when to use'
    check_section "$file" "$label" "Expected Output" 'expected output|output contract'
    check_section "$file" "$label" "Constraints"     'constraints'
    check_section "$file" "$label" "Example"         'example'
  fi

  return $errors
}

# Verifies a pack has a heading matching the given regex; reports via ok()/fail().
check_section() {
  local file="$1" label="$2" name="$3" pattern="$4"
  if grep -qiE "^#+ .*($pattern)" "$file"; then
    ok "$label — $name section present"
  else
    fail "$label — missing $name section"
  fi
}

echo ""
echo "━━━ Atlas One — Prompt Check ━━━━━━━━━━━━━━━━━━━━"
echo ""

# Core prompt
echo "[ core ]"
if [[ -f "$CORE_FILE" ]]; then
  if grep -q "^## Operating Rule" "$CORE_FILE"; then
    ok "atlas-one.md — Operating Rule present"
  else
    fail "atlas-one.md — missing Operating Rule"
  fi
  if grep -q "^## Modes" "$CORE_FILE"; then
    ok "atlas-one.md — Modes section present"
  else
    fail "atlas-one.md — missing Modes section"
  fi
else
  fail "docs/prompts/atlas-one.md — file missing"
fi

echo ""
echo "[ modes — $MODES_DIR ]"

mode_count=0
for f in "$MODES_DIR"/*.md; do
  [[ -f "$f" ]] || continue
  check_file "$f"
  ((mode_count++)) || true
done

if [[ $mode_count -eq 0 ]]; then
  fail "no mode files found in docs/prompts/modes/"
else
  echo "  → $mode_count mode file(s) checked"
fi

# Cross-check: modes listed in core prompt exist as files
echo ""
echo "[ mode coverage ]"
while IFS= read -r mode_name; do
  mode_id="$(printf '%s' "$mode_name" | tr '[:upper:]' '[:lower:]')"
  if [[ -f "$MODES_DIR/$mode_id.md" ]]; then
    ok "$mode_id.md exists"
  else
    fail "core lists '$mode_name' but $mode_id.md not found"
  fi
done < <(awk '/^## Modes/{found=1; next} found && /^## /{exit} found && /^- /{sub(/^- /,""); print}' "$CORE_FILE")

echo ""
echo "[ packs — $PACKS_DIR ]"

pack_count=0
for f in "$PACKS_DIR"/*.md; do
  [[ -f "$f" ]] || continue
  check_file "$f"
  ((pack_count++)) || true
done

if [[ $pack_count -eq 0 ]]; then
  warn "no pack files found in docs/prompts/packs/ (not required)"
else
  echo "  → $pack_count pack file(s) checked"
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
