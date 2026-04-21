from pathlib import Path

path = Path("docs/index.html")
text = path.read_text(encoding="utf-8")

needle = """    .topbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 20px 0 28px;
    }
"""

insert = """    .topbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin: 20px 0 28px;
    }

    .topbar-secondary {
      opacity: 0.72;
    }

    .topbar-secondary button {
      padding: 8px 12px;
      font-size: 0.92rem;
    }

    .hero h1 {
      letter-spacing: -0.02em;
    }

    .hero p {
      max-width: 780px;
    }
"""

if needle in text:
    text = text.replace(needle, insert, 1)
else:
    print("topbar css block not found")

needle2 = """    .btn-primary {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }
"""

insert2 = """    .btn-primary {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
    }

    .quick-actions button.is-active {
      background: var(--accent);
      color: #fff;
      border-color: var(--accent);
      box-shadow: 0 10px 24px rgba(23, 76, 90, 0.18);
    }

    .panel {
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.06);
    }

    .final-prompt-wrap {
      margin-bottom: 18px;
    }

    .output-actions {
      margin-bottom: 4px;
    }
"""

if needle2 in text:
    text = text.replace(needle2, insert2, 1)
else:
    print("btn-primary css block not found")

path.write_text(text, encoding="utf-8")
print("patched docs/index.html css")
