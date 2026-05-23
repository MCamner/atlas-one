const els = {};
let promptData = { promptTypes: [], commands: [], savedPrompts: [] };

async function init() {
  mapEls();
  await loadPrompts();
  bindEvents();
  restoreBackground();
  generatePrompt();
}

function mapEls() {
  ["promptType","commandInput","bgPicker","clearBgBtn","projectName","saveProjectBtn","loadProjectBtn",
   "promptSearch","savedPromptsList","goalInput","generateBtn","diagramBtn","editor","handoff",
   "routePreview","workflowPreview","diagramText","diagramPreview","copyOutputBtn","copyChatBtn",
   "openChatBtn","sendChatBtn","exportBtn","commandChips"].forEach(id => els[id] = document.getElementById(id));
}

async function loadPrompts() {
  let res;

  try {
    res = await fetch('/api/prompts');
    if (!res.ok) throw new Error(`Backend fetch failed: ${res.status}`);
  } catch (err) {
    console.log('No backend detected, loading local prompts.json instead.', err);
    res = await fetch('prompts.json');
    if (!res.ok) throw new Error(`Local prompts fetch failed: ${res.status}`);
  }

  promptData = await res.json();

  els.promptType.innerHTML = '';
  els.commandChips.innerHTML = '';

  promptData.promptTypes.forEach(type => {
    const opt = document.createElement('option');
    opt.value = type.toLowerCase();
    opt.textContent = type;
    els.promptType.appendChild(opt);
  });

  promptData.commands.forEach(cmd => {
    const btn = document.createElement('button');
    btn.textContent = cmd;
    btn.addEventListener('click', () => {
      els.commandInput.value = cmd + ' ' + els.goalInput.value;
    });
    els.commandChips.appendChild(btn);
  });

  renderSavedPrompts(promptData.savedPrompts || []);
}

function bindEvents() {
  els.generateBtn.addEventListener('click', generatePrompt);
  els.diagramBtn.addEventListener('click', generateDiagram);
  els.copyOutputBtn.addEventListener('click', () => navigator.clipboard.writeText(els.editor.value));
  els.copyChatBtn.addEventListener('click', () => navigator.clipboard.writeText(els.handoff.value));
  els.openChatBtn.addEventListener('click', () => window.open('https://chatgpt.com/', '_blank'));
  els.sendChatBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(els.handoff.value);
    window.open('https://chatgpt.com/', '_blank');
  });
  els.exportBtn.addEventListener('click', exportJson);
  els.bgPicker.addEventListener('change', setBackgroundFromFile);
  els.clearBgBtn.addEventListener('click', clearBackground);
  els.saveProjectBtn.addEventListener('click', saveProject);
  els.loadProjectBtn.addEventListener('click', loadProject);
  els.promptSearch.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    renderSavedPrompts(
      promptData.savedPrompts.filter(p =>
        `${p.id} ${p.title} ${p.category}`.toLowerCase().includes(q)
      )
    );
  });
}

function autoRoute(goal) {
  const t = goal.toLowerCase();

  const result = {
    goalUnderstanding: `Focus: ${goal.trim()}`,
    problemType: 'analyze',
    selectionMode: 'Mode route',
    selected: 'Analyze',
    reason: 'The request needs structure and interpretation before a more specific mode is justified.',
    workflow: null,
    pipeline: ['Analyze']
  };

  const routes = [
    ['architect', /(architecture|architect|design|system|integration|platform|citrix|igel|ums|os12)/, 'Architect', 'The request needs boundaries, components, constraints and risk evaluation.'],
    ['decide', /(decide|choose|trade.?off|option|recommend|versus|vs)/, 'Decide', 'The request asks for judgment between options.'],
    ['research', /(research|market|source|evidence|investigate|competition|porter)/, 'Research', 'The request needs evidence, synthesis and uncertainty tracking.'],
    ['debug', /(debug|bug|failure|broken|error|issue|root cause)/, 'Debug', 'The request describes a failure that needs isolation and verification.'],
    ['review', /(review|audit|critique|readiness|check|evaluate)/, 'Review', 'The request needs findings, evidence and prioritized fixes.'],
    ['teach', /(teach|learn|lesson|practice|train)/, 'Teach', 'The request asks for learning progression and practice.'],
    ['explain', /(explain|what is|why does|how does|clarify)/, 'Explain', 'The request needs a clear explanation and example.'],
    ['plan', /(plan|roadmap|steps|sequence|milestone)/, 'Plan', 'The request needs phased work and definition of done.'],
    ['summarize', /(summarize|summary|brief|digest|recap)/, 'Summarize', 'The request needs compression into key points and actions.'],
    ['create', /(create|draft|generate|write|make)/, 'Create', 'The request asks for a new artifact.'],
    ['edit', /(edit|rewrite|improve|polish|reformat)/, 'Edit', 'The request starts from an existing artifact that should be improved.'],
    ['coach', /(coach|habit|reflect|motivate|routine)/, 'Coach', 'The request needs guidance, reflection and a small next action.']
  ];

  const match = routes.find(([, pattern]) => pattern.test(t));
  if (match) {
    const [problemType, , selected, reason] = match;
    result.problemType = problemType;
    result.selected = selected;
    result.reason = reason;
    result.pipeline = [selected];
  }

  return result;
}

function generatePrompt() {
  const goal = els.goalInput.value.trim();
  const route = autoRoute(goal);

  els.routePreview.textContent = [
    `Goal\n${route.goalUnderstanding}`,
    `\nProblem type\n${route.problemType}`,
    `\nSelection mode\n${route.selectionMode}`,
    `\nSelected route\n${route.selected}`,
    `\nReason for selection\n${route.reason}`
  ].join('\n');

  els.workflowPreview.textContent = route.workflow
    ? `${route.workflow}\n\nPipeline\n${route.pipeline.join('\n→ ')}`
    : 'No predefined workflow required.';

  els.editor.value = [
    'Problem type', route.problemType, '',
    'Selection mode', route.selectionMode, '',
    'Selected mode', route.selected, '',
    'Reason for selection', route.reason, '',
    'Step-by-step analysis', route.pipeline.map((p, i) => `${i + 1}. ${p}`).join('\n'), '',
    'Conclusion',
    'Prefer the simplest strong route. Escalate only when the task truly needs multiple reasoning stages.'
  ].join('\n');

  els.handoff.value = [
    'Command', '/atlas', '',
    'Topic', goal, '', '',
    'Personas', '@architect @strategist', '',
    'Problem type', route.problemType, '',
    'Selection mode', route.selectionMode, '',
    'Selected mode', route.selected, '',
    'Reason for selection', route.reason, '',
    '---', '',
    'Use the selected route exactly as shown.', '',
    'Keep the sequence explicit and show why each stage is needed.'
  ].join('\n');

  generateDiagram();
}

function generateDiagram() {
  const route = els.editor.value.match(/Step-by-step analysis\n([\s\S]*?)\n\nConclusion/);
  const lines = route ? route[1].split('\n').map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean) : [];
  const nodes = lines.length ? lines : ['Goal', 'Analysis', 'Output'];
  const mermaid = ['flowchart LR'];

  nodes.forEach((n, i) => {
    const id = String.fromCharCode(65 + i);
    mermaid.push(`  ${id}[${n}]` + (i < nodes.length - 1 ? ` --> ${String.fromCharCode(66 + i)}` : ''));
  });

  els.diagramText.value = mermaid.join('\n');
  els.diagramPreview.textContent = nodes.join('  →  ');
}

function renderSavedPrompts(items) {
  els.savedPromptsList.innerHTML = '';

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `<strong>${item.id} ${item.title}</strong><small>${item.category}</small>`;

    div.addEventListener('click', () => {
      els.goalInput.value = `${item.id} ${item.title}`;
      generatePrompt();
    });

    els.savedPromptsList.appendChild(div);
  });
}

function exportJson() {
  const payload = {
    goal: els.goalInput.value,
    editor: els.editor.value,
    handoff: els.handoff.value,
    diagram: els.diagramText.value,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'atlas-one-export.json';
  a.click();

  URL.revokeObjectURL(a.href);
}

function setBackgroundFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    localStorage.setItem('atlas-bg', reader.result);
    document.getElementById('bg-overlay').style.backgroundImage = `url(${reader.result})`;
  };

  reader.readAsDataURL(file);
}

function restoreBackground() {
  const bg = localStorage.getItem('atlas-bg');
  if (bg) document.getElementById('bg-overlay').style.backgroundImage = `url(${bg})`;
}

function clearBackground() {
  localStorage.removeItem('atlas-bg');
  document.getElementById('bg-overlay').style.backgroundImage = 'none';
  els.bgPicker.value = '';
}

function saveProject() {
  const project = {
    name: els.projectName.value || 'Atlas Project',
    goal: els.goalInput.value,
    editor: els.editor.value,
    handoff: els.handoff.value,
    savedAt: new Date().toISOString()
  };

  localStorage.setItem('atlas-last-project', JSON.stringify(project));
  alert('Project saved locally.');
}

function loadProject() {
  const raw = localStorage.getItem('atlas-last-project');
  if (!raw) return alert('No local project saved yet.');

  const project = JSON.parse(raw);

  els.projectName.value = project.name;
  els.goalInput.value = project.goal;
  els.editor.value = project.editor;
  els.handoff.value = project.handoff;

  generatePrompt();
}

document.addEventListener('DOMContentLoaded', init);
