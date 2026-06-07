#!/usr/bin/env bash
set -euo pipefail

# ensure-deps.sh — check required developer/runtime tools for atlas-one
# Returns non-zero when required tools are missing.

MQ_ROOT="${MQ_ROOT:-}"
if [ -z "$MQ_ROOT" ]; then
  if git_root=$(git rev-parse --show-toplevel 2>/dev/null); then
    MQ_ROOT="$git_root"
  else
    MQ_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
  fi
fi

missing=()

check() {
  if ! command -v "$1" >/dev/null 2>&1; then
    missing+=("$1")
    echo "MISSING: $1"
  else
    echo "OK: $1 -> $(command -v $1)"
  fi
}

echo "Checking required tools..."
check git
check javac
check java
check jpackage
check jq
check gitleaks
check mqlaunch || true
check timeout || true

if [ ${#missing[@]} -eq 0 ]; then
  echo "All required tools present"
  exit 0
else
  echo "Missing tools: ${missing[*]}"
  echo "Install the missing tools and re-run. For packaging you need a JDK with jpackage (JDK 16+)."
  exit 2
fi
