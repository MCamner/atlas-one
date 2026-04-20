function parseCommandPalette(value) {
  const raw = value.trim();
  const parts = raw.split(/\s+/);

  const mode = parts.find(p => p.startsWith('/'))?.replace('/', '') || 'atlas';
  const personas = parts
    .filter(p => p.startsWith('@'))
    .map(p => p.replace('@', ''));

  const nonTagged = parts.filter(p => !p.startsWith('/') && !p.startsWith('@'));
  const intent = nonTagged.slice(-1)[0] || 'general';

  return {
    mode,
    intent,
    personas
  };
}

function updateParsedCommand() {
  const input = document.getElementById('commandPalette');
  const target = document.getElementById('parsedCommand');
  if (!input || !target) return;

  const parsed = parseCommandPalette(input.value);

  target.innerHTML = `
    <div><strong>Mode:</strong> ${parsed.mode}</div>
    <div><strong>Intent:</strong> ${parsed.intent}</div>
    <div><strong>Personas:</strong> ${parsed.personas.length ? parsed.personas.join(', ') : 'none'}</div>
  `;
}

function buildFinalPrompt() {
  const goal = document.getElementById('goalQuestion')?.value.trim() || '';
  const commandPalette = document.getElementById('commandPalette')?.value.trim() || '/atlas';
  const parsed = parseCommandPalette(commandPalette);
  const output = document.getElementById('chatgptHandoff');

  const prompt = `Command
/${parsed.mode}

Topic
${goal}

Personas
${parsed.personas.length ? parsed.personas.map(p => '@' + p).join(' ') : '@architect'}

Problem type
technical architecture

Selection mode
Pre-built workflow

Selected pipeline
1. Requirements Discovery
2. High-Level Architecture Design
3. Architecture Review

Reason for selection
Requires structured design and explicit risk evaluation typical for infrastructure architecture decisions.

---

Use the selected route exactly as shown.

Keep the sequence explicit and show why each stage is needed.

Include:
- explicit assumptions
- risk evaluation
- final recommendation`;

  if (output) output.value = prompt;
}

function copyTextFrom(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.select();
  el.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

document.addEventListener('DOMContentLoaded', () => {
  const commandPalette = document.getElementById('commandPalette');
  const generateBtn = document.getElementById('generatePromptBtn');
  const copyBtn = document.getElementById('copyForChatgptBtn');

  updateParsedCommand();
  buildFinalPrompt();

  commandPalette?.addEventListener('input', updateParsedCommand);
  generateBtn?.addEventListener('click', buildFinalPrompt);
  copyBtn?.addEventListener('click', () => copyTextFrom('chatgptHandoff'));
});
