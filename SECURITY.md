# Security Policy

## Scope

Atlas Studio runs locally. The static demo runs entirely in your browser and
the optional Java backend binds to `127.0.0.1` only. No data leaves your
machine unless you explicitly configure an external AI provider or hand a
prompt off to one (for example, copying it into ChatGPT).

## Supported versions

Security fixes target the latest released version.

| Version | Supported |
| ------- | --------- |
| 1.4.x   | Yes       |
| < 1.4   | No        |

## Reporting a vulnerability

Please report suspected vulnerabilities privately, not in a public issue.

Use GitHub's **Report a vulnerability** button under the repository's
**Security** tab (Security advisories). Include what you observed, steps to
reproduce, and the affected version.

You can expect an initial acknowledgement within a reasonable time. Please give
a fix a chance to ship before any public disclosure.

## Prompt-safety note

Atlas One packages prompts; it does not execute untrusted code on its own. Do
not commit API keys, tokens or credentials — use environment variables or
ignored local files. Prompt packs must not encourage unsafe automation,
approval bypass, hidden tool execution, or unvalidated memory writes. Execution
is owned by mq-agent and review/risk by mq-mcp, behind their own gates.
