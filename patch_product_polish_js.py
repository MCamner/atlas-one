from pathlib import Path

path = Path("docs/atlas-final-prompt-v3-generic.js")
text = path.read_text(encoding="utf-8")

needle = """function renderPromptLibrary() {
  const { config } = getSelectedConfig();
  const list = document.getElementById('promptLibraryList');
  if (!list) return;

  list.innerHTML = config.library.map(item => `
    <div class="library-item">
      <strong>${item.title}</strong>
      <span>${item.tag}</span>
    </div>
  `).join('');
}
"""

insert = """function renderPromptLibrary() {
  const { config } = getSelectedConfig();
  const list = document.getElementById('promptLibraryList');
  if (!list) return;

  list.innerHTML = config.library.map(item => `
    <div class="library-item">
      <strong>${item.title}</strong>
      <span>${item.tag}</span>
    </div>
  `).join('');
}

function updateQuickActionActiveState() {
  const commandPalette = document.getElementById('commandPalette');
  if (!commandPalette) return;

  const current = parseCommandPalette(commandPalette.value);
  const buttons = Array.from(document.querySelectorAll('.quick-actions button'));

  const activeByMode = {
    atlas: '/atlas',
    analyze: '/analyze',
    research: '/research',
    decide: '/decide',
    solve: '/solve',
    strategy: '/strategy',
    write: '/write'
  };

  let activeLabel = activeByMode[current.mode] || null;

  const promptType = document.getElementById('promptType')?.value || '';
  if (promptType === 'architecture') activeLabel = '/architect';
  if (promptType === 'writing') activeLabel = '/write';

  buttons.forEach(btn => {
    const label = btn.textContent.trim();
    btn.classList.toggle('is-active', label === activeLabel);
  });
}
"""

if needle in text:
    text = text.replace(needle, insert, 1)
else:
    print("renderPromptLibrary block not found")

needle2 = """function refreshPromptTypeDrivenUI() {
  renderPromptLibrary();
  updateSystemReasoning();
  updateAdvancedConfig();
  updateDiagramWorkspace();
  buildFinalPrompt();
}
"""

insert2 = """function refreshPromptTypeDrivenUI() {
  renderPromptLibrary();
  updateSystemReasoning();
  updateAdvancedConfig();
  updateDiagramWorkspace();
  buildFinalPrompt();
  updateQuickActionActiveState();
}
"""

if needle2 in text:
    text = text.replace(needle2, insert2, 1)
else:
    print("refreshPromptTypeDrivenUI block not found")

needle3 = """  commandPalette?.addEventListener('input', () => {
    updateParsedCommand();
    buildFinalPrompt();
  });
"""

insert3 = """  commandPalette?.addEventListener('input', () => {
    updateParsedCommand();
    buildFinalPrompt();
    updateQuickActionActiveState();
  });
"""

if needle3 in text:
    text = text.replace(needle3, insert3, 1)
else:
    print("commandPalette event block not found")

path.write_text(text, encoding="utf-8")
print("patched docs/atlas-final-prompt-v3-generic.js")
