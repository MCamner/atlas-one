#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REQUEST_SCHEMA="$ROOT/docs/contracts/atlas-diagram-request.v1.schema.json"
RESPONSE_SCHEMA="$ROOT/docs/contracts/atlas-diagram-response.v1.schema.json"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

validate() {
  local schema="$1"
  shift
  if command -v check-jsonschema >/dev/null 2>&1; then
    check-jsonschema --schemafile "$schema" "$@"
  elif command -v uvx >/dev/null 2>&1; then
    uvx check-jsonschema --schemafile "$schema" "$@"
  else
    echo "check-atlas-canvas: install check-jsonschema or uv" >&2
    return 2
  fi
}

expect_invalid() {
  local schema="$1"
  local fixture="$2"
  if validate "$schema" "$fixture" >/dev/null 2>&1; then
    echo "check-atlas-canvas: expected invalid fixture: $fixture" >&2
    return 1
  fi
}

validate "$REQUEST_SCHEMA" \
  "$ROOT"/docs/contracts/examples/atlas-diagram-{analyze,architect,debug,decide,plan,review}.json
validate "$RESPONSE_SCHEMA" \
  "$ROOT"/docs/contracts/examples/atlas-diagram-response-{success,error}.json

jq '.schema = "atlas-diagram-request.v2"' \
  "$ROOT/docs/contracts/examples/atlas-diagram-architect.json" > "$TMP/unknown-version.json"
jq '.unexpected = true' \
  "$ROOT/docs/contracts/examples/atlas-diagram-architect.json" > "$TMP/extra-property.json"
jq '.intent = {"operation":"refine","validation":"schema-only"}' \
  "$ROOT/docs/contracts/examples/atlas-diagram-architect.json" > "$TMP/refine-without-intent.json"
jq '.error = {"code":"provider_failure","message":"unexpected","retryable":false}' \
  "$ROOT/docs/contracts/examples/atlas-diagram-response-success.json" > "$TMP/success-with-error.json"
jq '.error.code = "provider_failure"' \
  "$ROOT/docs/contracts/examples/atlas-diagram-response-error.json" > "$TMP/status-code-mismatch.json"
jq '.diagram.content = ("x" * 200001)' \
  "$ROOT/docs/contracts/examples/atlas-diagram-response-success.json" > "$TMP/oversized-diagram.json"

expect_invalid "$REQUEST_SCHEMA" "$TMP/unknown-version.json"
expect_invalid "$REQUEST_SCHEMA" "$TMP/extra-property.json"
expect_invalid "$REQUEST_SCHEMA" "$TMP/refine-without-intent.json"
expect_invalid "$RESPONSE_SCHEMA" "$TMP/success-with-error.json"
expect_invalid "$RESPONSE_SCHEMA" "$TMP/status-code-mismatch.json"
expect_invalid "$RESPONSE_SCHEMA" "$TMP/oversized-diagram.json"

echo "Atlas Canvas contracts: PASS"
