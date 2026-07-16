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

These paths were verified against the current `MCamner/excalidraw-ai-proxy`
README during the compatibility spike. Runtime behavior and response framing
still require an integration test against a running proxy.

Atlas should check capabilities before generation and treat all returned
content as untrusted. Credentials remain server-side in the proxy.

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
