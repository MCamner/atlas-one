from pathlib import Path

path = Path("docs/index.html")
text = path.read_text(encoding="utf-8")

replacements = [
    (
        "Prompt-OS aware routing, workflow detection, pipeline preview, and saved prompts.",
        "Adaptive prompt system for structured thinking and decision-making."
    ),
    (
        '<div class="topbar">',
        '<div class="topbar topbar-secondary">'
    )
]

changed = False
for old, new in replacements:
    if old in text:
        text = text.replace(old, new, 1)
        changed = True

if changed:
    path.write_text(text, encoding="utf-8")
    print("patched docs/index.html")
else:
    print("no matching text found")
