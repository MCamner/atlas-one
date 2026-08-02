# Atlas Canvas

Atlas Canvas is the planned handoff from Atlas reasoning modes and workflow
sequences to editable Excalidraw diagrams.

## Ownership

* Atlas One owns intent, mode/workflow routing and the versioned diagram request.
* `excalidraw-ai-proxy` owns provider credentials, model routing, limits,
  streaming and Mermaid normalization.
* Excalidraw owns scene state, selection, editing, export and undo/redo.
* mq-agent and mq-mcp own optional orchestration, validation and review.
* mqobsidian owns durable curated records.

Atlas must not call a model provider directly or duplicate proxy, review or
persistence logic.

## Target flow

```text
goal → Atlas route → atlas-diagram-request.v1 → proxy → Mermaid → Excalidraw
```

The request contract is defined in
[`contracts/atlas-diagram-request.v1.schema.json`](contracts/atlas-diagram-request.v1.schema.json).
Examples cover `analyze`, `architect`, `debug`, `decide`, `plan` and an ordered
`analyze → review` sequence.

Workflow sequence order is the array order. Sequence items intentionally have
no separate step number, avoiding two competing sources of ordering truth.

## Proxy compatibility

The current proxy documents these integration points:

* `GET /v1/ai/capabilities` for capability negotiation
* `POST /v1/ai/text-to-diagram/chat-streaming` for normalized Mermaid over SSE

Compatibility was verified on 2026-07-16 against
`MCamner/excalidraw-ai-proxy` commit `98b9da1d52a8`. Its route tests confirm
that the capability endpoint advertises text-to-diagram support and that the
POST endpoint returns repaired Mermaid as buffered SSE `content` events,
followed by `done` and `[DONE]`.

The proxy does not accept `atlas-diagram-request.v1` directly. Atlas must
validate that request locally, render its structured fields into one bounded
prompt and send the proxy wire request:

```json
{
  "messages": [
    { "role": "user", "content": "<rendered Atlas diagram prompt>" }
  ]
}
```

The preflight is compatible when `features.textToDiagram` is `true`,
`features.streaming` is `true`, and `endpoints.textToDiagram` matches the
documented POST path. `streamingMode` is currently
`buffered-after-repair`, so Atlas must not claim token-by-token diagram
updates. The capability response does not negotiate Atlas schema versions;
schema compatibility remains Atlas-owned until the proxy exposes an explicit
version contract.

Atlas should check capabilities before generation and treat all returned
content as untrusted. Credentials remain server-side in the proxy.

Reproduce the proxy-side verification from a local proxy checkout with
`npm test`. The verified suite passed 21 tests, including capability metadata,
missing and oversized prompt rejection, normalized Mermaid SSE, empty output
and invalid Mermaid handling. This confirms transport compatibility through
the adapter above; it does not complete Excalidraw import.

## Error model

The integration must distinguish schema rejection, unsupported capability,
rate limiting, timeout, cancellation, upstream failure and Mermaid validation
failure. Atlas's proposed normalized envelope is defined in
[`contracts/atlas-diagram-response.v1.schema.json`](contracts/atlas-diagram-response.v1.schema.json).
It is an Atlas contract proposal, not a claim about the proxy's current wire
format, and must be agreed with the proxy owner before implementation.
Successful Mermaid content is limited to 200,000 characters at this Atlas
contract boundary; the proxy may enforce a lower runtime limit.

## Open compatibility work

The supported Excalidraw import, scene metadata and selection/refinement APIs
have not been verified against the pinned local checkout. The compatibility
spike must confirm them before the roadmap marks import or refinement complete.
No fork-specific API should be presented as stable until that verification is
recorded.
