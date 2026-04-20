from pathlib import Path
import re

path = Path("docs/index.html")
text = path.read_text(encoding="utf-8")

backup = path.with_suffix(path.suffix + ".bak")
backup.write_text(text, encoding="utf-8")

script_tag = '  <script src="./atlas-final-prompt-v3-generic.js"></script>\n'

text = re.sub(
    r'\n\s*<script>\s*.*?\s*</script>\s*</body>',
    '\n' + script_tag + '</body>',
    text,
    flags=re.DOTALL
)

path.write_text(text, encoding="utf-8")
print(f"patched {path}")
print(f"backup created: {backup}")
