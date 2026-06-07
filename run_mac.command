#!/usr/bin/env bash
set -euo pipefail

# If MQ_ROOT provided in env use it; otherwise assume repo layout relative to this launcher
MQ_ROOT="${MQ_ROOT:-}"
if [ -z "$MQ_ROOT" ]; then
	MQ_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
fi

SCRIPT="$MQ_ROOT/build_and_run.sh"

if [ ! -f "$SCRIPT" ]; then
	echo "Launcher: $SCRIPT not found." >&2
	exit 1
fi

if [ ! -x "$SCRIPT" ]; then
	chmod +x "$SCRIPT" || { echo "Failed to make $SCRIPT executable" >&2; exit 1; }
fi

exec "$SCRIPT"
