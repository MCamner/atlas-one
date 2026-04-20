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
    problemType: 'analysis',
    selectionMode: 'Single-engine route',
    selected: '01.02 Analyze Engine',
    reason: 'The topic requires structured analysis but not a full pipeline.',
    workflow: null,
    pipeline: ['01.02 Analyze Engine']
  };

  if (/(citrix|igel|architecture|migration|integration|ums|os12)/.test(t)) {
    result.problemType = 'technical architecture';
    result.workflow = '09.03 Architecture → Risk → Recommendation';
    result.selectionMode = 'Pre-built workflow';
    result.selected = result.workflow;
    result.reason = 'The topic aligns with architecture scenarios requiring structured design and risk evaluation.';
    result.pipeline = [
      '02.01 Requirements Discovery',
      '02.02 High-Level Architecture Design',
      '02.10 Architecture Review'
    ];
  } else if (/(research|market|industry|porter|competition)/.test(t)) {
    result.problemType = 'strategy';
    result.workflow = '09.02 Research → Strategy → Decision';
    result.selectionMode = 'Pre-built workflow';
    result.selected = result.workflow;
    result.reason = 'The question requires research-driven strategy and decision support.';
    result.pipeline = [
      '01.12 Research Synthesizer',
      '01.08 Voloditha Framework Analysis',
      '01.11 Decision & Trade-off Engine'
    ];
  } else if (/(problem|root cause|issue|bug)/.test(t)) {
    result.problemType = 'problem solving';
    result.workflow = '09.01 Problem → Root Cause → Solution';
    result.selectionMode = 'Pre-built workflow';
    result.selected = result.workflow;
    result.reason = 'The situation fits a root cause and solution-oriented workflow.';
    result.pipeline = [
      '01.13 Root Cause Analyzer',
      '01.14 Problem Solving Engine'
    ];
  } else if (/(idea|brainstorm|concept)/.test(t)) {
    result.problemType = 'ideas';
    result.workflow = '09.04 Idea → Validation → Execution';
    result.selectionMode = 'Pre-built workflow';
    result.selected = result.workflow;
    result.reason = 'The input is focused on idea generation and validation.';
    result.pipeline = [
      '01.01 Ideas Engine',
      '01.11 Decision & Trade-off Engine'
    ];
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
    route.selectionMode === 'Single-engine route' ? 'Selected engine' : 'Selected pipeline',
    route.selectionMode === 'Single-engine route' ? route.selected : route.pipeline.join('\n→ '), '',
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
    route.selectionMode === 'Single-engine route' ? 'Selected engine' : 'Selected pipeline',
    route.selectionMode === 'Single-engine route' ? route.selected : route.pipeline.join('\n→ '), '',
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
