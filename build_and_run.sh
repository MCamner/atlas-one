#!/usr/bin/env bash
set -euo pipefail

MQ_ROOT="${MQ_ROOT:-}"
if [ -z "$MQ_ROOT" ]; then
	if git_root=$(git rev-parse --show-toplevel 2>/dev/null); then
		MQ_ROOT="$git_root"
	else
		MQ_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
	fi
fi

SRC_DIR="${SRC_DIR:-$MQ_ROOT/src}"
DIST_DIR="${DIST_DIR:-$MQ_ROOT/dist}"
MAIN_CLASS="${MAIN_CLASS:-AtlasServer}"

mkdir -p "$DIST_DIR"

echo "Compiling Java sources from $SRC_DIR to $DIST_DIR..."
javac -d "$DIST_DIR" $(find "$SRC_DIR" -name '*.java') || { echo "javac failed" >&2; exit 1; }

echo "Starting $MAIN_CLASS..."
exec java -cp "$DIST_DIR" "$MAIN_CLASS"
