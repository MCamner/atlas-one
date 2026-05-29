# mq-mcp Safety Review Prompt Pack

Version: 0.6.0
Tags: pack, mq-mcp, safety, review, security, risk

Use this pack to structure a safety review before invoking mq-mcp security or
risk review contracts. It does not duplicate mq-mcp logic — it prepares the
thinking that makes mq-mcp review more effective.

## Recommended Modes

- Review
- Analyze
- Decide

## When to Use

- Before running a mq-mcp security or risk review on a repo
- When deciding whether a change is safe to approve
- When assessing a new MCP tool or server for safety boundaries

## Starter Prompt

```text
Use Atlas One Review Mode.

Prepare a safety review brief for this change or component.

Assess:
- What does this change or tool actually do?
- What system boundaries does it touch?
- What can go wrong if it executes incorrectly?
- What approval gates exist and are they respected?
- Does it request hidden reasoning, tool execution bypass, or credential access?

Return:
- Findings ordered by severity (critical / warn / info)
- Evidence for each finding
- Recommended fixes or constraints
- Go / no-go recommendation
```

## Follow-up: Risk Assessment

```text
Use Atlas One Decide Mode.

Given the safety review findings, assess the risk of proceeding.

Compare:
- Proceeding as-is
- Proceeding with constraints or mitigations
- Blocking and requiring a fix first

For each option: expected outcome, residual risk, and what could still go wrong.

Recommend one path and state the conditions under which you would change it.
```

## Follow-up: Approval Decision

```text
Use Atlas One Decide Mode.

Given the risk assessment, make the approval decision explicit.

State:
- What is approved
- What is not approved
- What conditions must be met before re-review
- Who should verify the fix
```

## Safety Constraints

Do not use this pack to:
- Bypass mq-mcp approval gates
- Approve changes that request hidden chain-of-thought
- Approve tool execution that circumvents user confirmation
- Substitute for a real mq-mcp security review where one is required
