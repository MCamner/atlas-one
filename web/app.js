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
   "openChatBtn","sendChatBtn","exportBtn","commandChips",
   "runMqBtn","mqOutputSection","mqCommand","mqOutput","mqRepoPath","runMqBtn2",
   "saveBrainBtn","coreRepoPath","runCoreBtn","cancelCoreBtn","coreRun"].forEach(id => els[id] = document.getElementById(id));
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
  els.runMqBtn.addEventListener('click', () => { els.mqOutputSection.style.display = 'block'; runMqAgent(); });
  els.runMqBtn2.addEventListener('click', runMqAgent);
  els.runCoreBtn.addEventListener('click', runCore);
  els.cancelCoreBtn.addEventListener('click', cancelCore);
  els.copyOutputBtn.addEventListener('click', () => navigator.clipboard.writeText(els.editor.value));
  els.copyChatBtn.addEventListener('click', () => navigator.clipboard.writeText(els.handoff.value));
  els.openChatBtn.addEventListener('click', () => window.open('https://chatgpt.com/', '_blank'));
  els.sendChatBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(els.handoff.value);
    window.open('https://chatgpt.com/', '_blank');
  });
  els.exportBtn.addEventListener('click', exportJson);
  els.saveBrainBtn.addEventListener('click', saveToBrain);
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

const MQ_MAPPED_MODES = new Set(['architect','review','debug','research','plan']);

async function runMqAgent() {
  const goal = els.goalInput.value.trim();
  if (!goal) return;

  const route = autoRoute(goal);
  const mode = route.problemType;
  const repoPath = (els.mqRepoPath.value.trim() || '.').replace(/\/+$/, '');

  const fallback = !MQ_MAPPED_MODES.has(mode);
  const modeLabel = fallback ? `${mode} → plan (fallback)` : mode;

  els.runMqBtn.disabled = true;
  els.runMqBtn2.disabled = true;
  els.runMqBtn.textContent = '⏳ Running…';
  els.mqOutputSection.style.display = 'block';
  els.mqCommand.textContent = '';
  els.mqOutput.textContent = `Mode: ${modeLabel}\nWaiting for mq-agent…`;

  try {
    const res = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal, mode, path: repoPath })
    });

    if (!res.ok) {
      els.mqOutput.textContent = `HTTP ${res.status}: ${await res.text()}`;
      return;
    }

    const data = await res.json();
    els.mqCommand.textContent = '$ ' + (data.command || '');

    const result = data.result;
    if (typeof result === 'object' && result !== null) {
      els.mqOutput.textContent = JSON.stringify(result, null, 2);
    } else {
      els.mqOutput.textContent = result || data.error || JSON.stringify(data);
    }

    els.mqOutput.className = 'mq-output ' + (data.ok ? 'mq-ok' : 'mq-err');
  } catch (err) {
    els.mqOutput.textContent = `Could not reach mq-agent.\n\nMake sure AtlasServer is running (not just the static page).\n\n${err.message}`;
    els.mqOutput.className = 'mq-output mq-err';
  } finally {
    els.runMqBtn.disabled = false;
    els.runMqBtn2.disabled = false;
    els.runMqBtn.textContent = '▶ Run via mq-agent';
  }
}

async function saveToBrain() {
  const goal = els.goalInput.value.trim();
  if (!goal) { alert('Enter a goal first.'); return; }

  const route = autoRoute(goal);

  els.saveBrainBtn.disabled = true;
  els.saveBrainBtn.textContent = 'Saving…';

  try {
    const res = await fetch('/api/decide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: goal.slice(0, 80),
        context: route.goalUnderstanding,
        decision: `Mode: ${route.selected}\nPipeline: ${route.pipeline.join(' → ')}`,
        rationale: route.reason,
        consequences: ''
      })
    });

    if (!res.ok) {
      alert(`Brain save failed: HTTP ${res.status}`);
      return;
    }

    const data = await res.json();
    els.saveBrainBtn.textContent = data.ok ? 'Saved to brain' : 'Save failed';
    if (!data.ok) console.error('[brain]', data.error || data.result);
  } catch (err) {
    alert(`No backend — start AtlasServer first.\n\n${err.message}`);
  } finally {
    els.saveBrainBtn.disabled = false;
    setTimeout(() => { els.saveBrainBtn.textContent = 'Save to brain'; }, 3000);
  }
}

// --- Atlas Core run -------------------------------------------------------
// Everything below displays what the Atlas Core CLI reported through
// /api/core. Nothing here grades, scores or reinterprets a run: a value
// Core did not report is shown as missing, never inferred.

const CORE_POLL_MS = 500;
const CORE_MAX_WAIT_MS = 10 * 60 * 1000;
let coreRunId = null;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function coreGet(runId, action) {
  const res = await fetch(`/api/core/runs/${encodeURIComponent(runId)}/${action}`);
  return { ok: res.ok, body: await res.json() };
}

async function runCore() {
  const task = els.goalInput.value.trim();
  if (!task) return;
  els.runCoreBtn.disabled = true;
  renderCoreMessage('Starting Atlas Core run…');
  try {
    const res = await fetch('/api/core/runs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, repo_path: els.coreRepoPath.value.trim() })
    });
    const started = await res.json();
    if (!res.ok) throw new Error(started.error || `HTTP ${res.status}`);
    coreRunId = started.run_id;
    els.cancelCoreBtn.disabled = false;

    const deadline = Date.now() + CORE_MAX_WAIT_MS;
    let status = null;
    let result = null;
    while (Date.now() < deadline) {
      await sleep(CORE_POLL_MS);
      status = (await coreGet(coreRunId, 'status')).body.data;
      renderCore({ runId: coreRunId, status });
      if (status && (status.state === 'finished' || status.state === 'interrupted')) break;
      // A run that exits without writing its log (a usage error, say) never
      // leaves not_found; its exit is the answer.
      const exited = await coreGet(coreRunId, 'result');
      if (exited.ok) { result = exited.body; break; }
    }
    // The run document arrives when the process exits, which is just after
    // the log says finished.
    while (!result && Date.now() < deadline) {
      const exited = await coreGet(coreRunId, 'result');
      if (exited.ok) { result = exited.body; break; }
      await sleep(CORE_POLL_MS);
    }
    const inspect = (await coreGet(coreRunId, 'inspect')).body.data;
    const events = (await coreGet(coreRunId, 'events')).body.data;
    renderCore({ runId: coreRunId, status, inspect, result, events });
  } catch (err) {
    renderCoreMessage(`Could not run Atlas Core.\n\nMake sure AtlasServer is running and \`atlas\` is on PATH (or ATLAS_BIN is set).\n\n${err.message}`);
  } finally {
    els.runCoreBtn.disabled = false;
    els.cancelCoreBtn.disabled = true;
  }
}

async function cancelCore() {
  if (!coreRunId) return;
  await fetch(`/api/core/runs/${encodeURIComponent(coreRunId)}/cancel`, { method: 'POST' });
}

function renderCoreMessage(text) {
  els.coreRun.textContent = '';
  const pre = document.createElement('pre');
  pre.className = 'mq-output';
  pre.textContent = text;
  els.coreRun.appendChild(pre);
}

function coreTable(rows) {
  const table = document.createElement('table');
  rows.forEach(([label, value, mono]) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = label;
    const td = document.createElement('td');
    td.textContent = value;
    if (mono) td.className = 'mono';
    tr.append(th, td);
    table.appendChild(tr);
  });
  return table;
}

function coreHeading(text) {
  const h = document.createElement('h3');
  h.textContent = text;
  return h;
}

function renderCore({ runId, status, inspect, result, events }) {
  const run = result && result.run;
  const missing = 'not reported';
  const lastEvaluation = run && run.evaluations.length ? run.evaluations[run.evaluations.length - 1] : null;
  const usage = run && run.metadata && run.metadata.budget_usage;

  els.coreRun.textContent = '';
  els.coreRun.appendChild(coreTable([
    ['Run id', runId, true],
    ['State', status ? status.state : missing],
    ['Status', (inspect && inspect.status) || (status && status.status) || missing],
    ['Stop reason', inspect && inspect.stop_reason
      ? `${inspect.stop_reason}${inspect.stop_class ? ` (${inspect.stop_class})` : ''}`
      : (status && status.stop_reason) || missing],
    ['Iterations', inspect ? String(inspect.iterations) : status ? String(status.iteration) : missing],
    ['Budget usage', usage
      ? `model_calls ${usage.model_calls} · tool_calls ${usage.tool_calls} · tokens ${usage.tokens} · output_bytes ${usage.output_bytes}`
      : missing],
    ['requires_user_approval', lastEvaluation ? String(lastEvaluation.requires_user_approval) : missing],
    ['Uncertainties', inspect ? (inspect.uncertainties.join('; ') || 'none recorded') : missing],
    ['Events', events ? `${events.length} (last: ${events.length ? events[events.length - 1].kind : 'none'})` : missing],
  ]));

  if (result && result.exit !== 0 && !run) {
    // Core printed no run document. Its diagnostic is shown as it came.
    els.coreRun.appendChild(coreHeading('Run document unavailable'));
    const pre = document.createElement('pre');
    pre.className = 'mq-output mq-err';
    pre.textContent = typeof result.error === 'string'
      ? result.error : JSON.stringify(result.error, null, 2);
    els.coreRun.appendChild(pre);
  }

  if (!inspect) return;
  els.coreRun.appendChild(coreHeading('Sources (Observation.v1, from atlas inspect)'));
  const details = inspect.source_details || [];
  if (!details.length) {
    els.coreRun.appendChild(coreTable([['sources', 'none recorded']]));
  } else {
    els.coreRun.appendChild(coreTable(
      details.map(item => [item.path, `sha256 ${item.content_sha256}`, true])
    ));
  }

  els.coreRun.appendChild(coreHeading('Citation checks (from the last evaluation)'));
  const checks = lastEvaluation ? lastEvaluation.citation_checks || [] : [];
  if (!lastEvaluation) {
    els.coreRun.appendChild(coreTable([['citation_checks', 'no evaluation']]));
  } else if (!checks.length) {
    els.coreRun.appendChild(coreTable([['citation_checks', 'empty — Core checked no claims']]));
  } else {
    els.coreRun.appendChild(coreTable(
      checks.map(check => [check.verdict, check.claim || ''])
    ));
  }
}

document.addEventListener('DOMContentLoaded', init);
