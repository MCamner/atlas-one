# Writing and Editing Prompt Pack

Version: 0.7.0
Tags: pack, writing, editing, clarity, structure, tone

Use this pack for editing, restructuring, and improving written work —
technical documentation, reports, emails, and longer-form writing.

## Recommended Modes

* Edit
* Summarize
* Review

## Starter Prompt — Document Edit

```text
Use Atlas One Edit Mode.

Edit this text.

Goals:
- Remove anything that doesn't add meaning
- Tighten every sentence
- Keep the author's voice
- Preserve all claims and technical accuracy

Tell me:
- What you removed and why
- What you restructured and why
- What you left alone and why

Return the edited version first, then your notes.
```

## Structure Review Prompt

```text
Use Atlas One Review Mode.

Review the structure of this document.

Tell me:
- Does the opening tell me what this is and why I should read it?
- Is the information in the right order for the reader?
- Where does the argument or explanation break down?
- What can be cut without losing meaning?
- What is the one thing I should remember after reading this?

Return: structure diagnosis, then a reordering recommendation.
```

## Summary Generation Prompt

```text
Use Atlas One Summarize Mode.

Summarize this document.

Return:
1. What this is (one sentence)
2. Main argument or purpose
3. Key claims or decisions
4. What is missing or unresolved
5. One-line verdict

Do not compress below clarity.
```

## Tone and Clarity Check

```text
Use Atlas One Edit Mode with a clarity focus.

Read this text and tell me:
- Where is the language vague or hedged without reason?
- Where is it more formal than it needs to be?
- Where does the sentence structure slow the reader down?
- What would a reader who is skeptical object to?

Return a rewrite of the weakest paragraph with notes explaining each change.
```

## Example Usage

```text
Goal:
Edit this RFC before it goes to the team — it's too long and buries the decision.

Mode:
Edit

Output:
Edited version, structural notes, what was cut.
```

## When to Use

* When a draft is too long, unclear, or buries its point
* When you need structure and tone feedback, not just proofreading
* When a document must land a decision or argument cleanly

## Expected Output

* The edited version first, then notes explaining the changes
* What was removed, restructured and deliberately left alone
* For structure reviews: a diagnosis, then a reordering recommendation

## Constraints

* Preserve the author's voice, claims and technical accuracy
* Cut for meaning — do not compress below clarity
* Editing only; do not invent facts or sources to fill gaps
