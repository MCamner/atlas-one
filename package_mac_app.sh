#!/usr/bin/env bash
set -euo pipefail

# MQ_ROOT: prefer env, fallback to git repo root, then script-relative repo root
MQ_ROOT="${MQ_ROOT:-}"
if [ -z "$MQ_ROOT" ]; then
  if git_root=$(git rev-parse --show-toplevel 2>/dev/null); then
    MQ_ROOT="$git_root"
  else
    MQ_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
  fi
fi

MACOS_SCRIPTS_PATH="${MACOS_SCRIPTS_PATH:-$MQ_ROOT/macos-scripts}"
SRC_DIR="${SRC_DIR:-$MQ_ROOT/src}"
DIST_DIR="${DIST_DIR:-$MQ_ROOT/dist}"
JAR_NAME="${JAR_NAME:-atlas-studio-v12.jar}"
OUT_DIR="${OUT_DIR:-$DIST_DIR/app}"
MAIN_CLASS="${MAIN_CLASS:-AtlasServer}"
APP_NAME="${APP_NAME:-Atlas Studio}"

# Check prerequisites
if ! command -v javac >/dev/null 2>&1; then
  echo "javac not found. Please install a JDK." >&2
  exit 1
fi

if ! command -v jpackage >/dev/null 2>&1; then
  echo "jpackage not found. jpackage requires a JDK with packaging tools (JDK 16+ or distro that includes jpackage)." >&2
  exit 1
fi

mkdir -p "$DIST_DIR"

# Compile
echo "Compiling Java sources from $SRC_DIR to $DIST_DIR..."
javac -d "$DIST_DIR" $(find "$SRC_DIR" -name '*.java') || { echo "javac failed" >&2; exit 1; }

# Create jar
echo "Creating jar $JAR_NAME..."
pushd "$DIST_DIR" >/dev/null
jar cfe "$JAR_NAME" "$MAIN_CLASS" $(find . -maxdepth 1 -name '*.class') || { echo "jar failed" >&2; popd >/dev/null; exit 1; }
popd >/dev/null

# Package application
mkdir -p "$OUT_DIR"
echo "Running jpackage..."
jpackage --type app-image --name "$APP_NAME" --input "$DIST_DIR" --main-jar "$JAR_NAME" --main-class "$MAIN_CLASS" --dest "$OUT_DIR"

echo "Packaged app in $OUT_DIR/$APP_NAME"
