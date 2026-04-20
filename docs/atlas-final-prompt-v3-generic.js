function parseCommandPalette(value) {
  const raw = (value || '').trim();
  const parts = raw ? raw.split(/\s+/) : [];

  const mode = parts.find(p => p.startsWith('/'))?.replace('/', '') || 'atlas';
  const personas = parts
    .filter(p => p.startsWith('@'))
    .map(p => p.replace('@', ''));

  const nonTagged = parts.filter(p => !p.startsWith('/') && !p.startsWith('@'));
  const intent = nonTagged.slice(-1)[0] || 'general';

  return { mode, intent, personas };
}

const PROMPT_TYPE_CONFIG = {
  analysis: {
    problemType: 'structured analysis',
    selectedRoute: 'Analysis → Factors → Insight',
    pipeline: [
      '1. Problem Definition',
      '2. Key Factor Analysis',
      '3. Insight and Conclusion'
    ],
    why: 'Best for understanding a topic clearly, breaking it down, and surfacing the most important insights.',
    guidance: 'Focus on understanding the problem, identifying key factors, and producing a clear analytical breakdown.',
    outputFormat: `## 1. Problem Definition
## 2. Key Factors
## 3. Analysis
## 4. Insights
## 5. Conclusion`,
    advanced: `Problem type
structured analysis

Selection mode
Prompt type driven

Selected pipeline
1. Problem Definition
2. Key Factor Analysis
3. Insight and Conclusion

Reason for selection
Best for understanding a topic clearly, breaking it down, and surfacing the most important insights.

Working style
- clarify the problem
- identify the major factors
- distinguish signal from noise
- end with a clear conclusion`,
    diagram: `flowchart LR
  A[1. Problem Definition] --> B[2. Key Factor Analysis]
  B --> C[3. Insight and Conclusion]`
  },

  architecture: {
    problemType: 'technical architecture',
    selectedRoute: 'Architecture → Trade-offs → Recommendation',
    pipeline: [
      '1. Requirements and Constraints',
      '2. Design Options',
      '3. Review and Recommendation'
    ],
    why: 'Best for design-oriented problems involving structure, dependencies, trade-offs, and technical decisions.',
    guidance: 'Focus on structure, components, design options, dependencies, constraints, and recommendation.',
    outputFormat: `## 1. Problem Definition
## 2. Requirements and Constraints
## 3. Design Options
## 4. Trade-off Analysis
## 5. Recommendation
## 6. Risks
## 7. Implementation Guidance`,
    advanced: `Problem type
technical architecture

Selection mode
Prompt type driven

Selected pipeline
1. Requirements and Constraints
2. Design Options
3. Review and Recommendation

Reason for selection
Best for design-oriented problems involving structure, dependencies, trade-offs, and technical decisions.

Working style
- identify requirements
- compare design options
- assess trade-offs
- recommend one architecture`,
    diagram: `flowchart LR
  A[1. Requirements and Constraints] --> B[2. Design Options]
  B --> C[3. Review and Recommendation]`
  },

  strategy: {
    problemType: 'strategic decision framing',
    selectedRoute: 'Objective → Options → Recommendation',
    pipeline: [
      '1. Objective and Context',
      '2. Strategic Options',
      '3. Recommendation and Next Moves'
    ],
    why: 'Best for choices involving direction, prioritization, sequencing, and trade-offs over time.',
    guidance: 'Focus on objectives, options, trade-offs, risks, sequencing, and strategic recommendation.',
    outputFormat: `## 1. Objective
## 2. Current Situation
## 3. Strategic Options
## 4. Trade-offs
## 5. Recommendation
## 6. Risks
## 7. Next Steps`,
    advanced: `Problem type
strategic decision framing

Selection mode
Prompt type driven

Selected pipeline
1. Objective and Context
2. Strategic Options
3. Recommendation and Next Moves

Reason for selection
Best for choices involving direction, prioritization, sequencing, and trade-offs over time.

Working style
- define the objective
- compare strategic paths
- evaluate implications
- recommend the strongest path`,
    diagram: `flowchart LR
  A[1. Objective and Context] --> B[2. Strategic Options]
  B --> C[3. Recommendation and Next Moves]`
  },

  research: {
    problemType: 'evidence-based research',
    selectedRoute: 'Question → Findings → Synthesis',
    pipeline: [
      '1. Research Question',
      '2. Findings and Evidence',
      '3. Synthesis and Conclusion'
    ],
    why: 'Best for fact-finding, comparison, source-backed synthesis, and handling uncertainty explicitly.',
    guidance: 'Focus on facts, sources, uncertainty, comparison, and synthesis of findings.',
    outputFormat: `## 1. Research Question
## 2. Findings
## 3. Evidence and Sources
## 4. Comparison
## 5. Gaps and Uncertainty
## 6. Conclusion`,
    advanced: `Problem type
evidence-based research

Selection mode
Prompt type driven

Selected pipeline
1. Research Question
2. Findings and Evidence
3. Synthesis and Conclusion

Reason for selection
Best for fact-finding, comparison, source-backed synthesis, and handling uncertainty explicitly.

Working style
- define the question
- gather findings
- compare evidence
- state uncertainty clearly`,
    diagram: `flowchart LR
  A[1. Research Question] --> B[2. Findings and Evidence]
  B --> C[3. Synthesis and Conclusion]`
  },

  decision: {
    problemType: 'decision support',
    selectedRoute: 'Criteria → Alternatives → Recommendation',
    pipeline: [
      '1. Decision Context',
      '2. Alternative Evaluation',
      '3. Recommendation'
    ],
    why: 'Best for selecting between viable options using explicit criteria and trade-off analysis.',
    guidance: 'Focus on alternatives, decision criteria, trade-offs, risk, and final recommendation.',
    outputFormat: `## 1. Decision Context
## 2. Evaluation Criteria
## 3. Alternatives
## 4. Comparison
## 5. Recommendation
## 6. Risks
## 7. Next Steps`,
    advanced: `Problem type
decision support

Selection mode
Prompt type driven

Selected pipeline
1. Decision Context
2. Alternative Evaluation
3. Recommendation

Reason for selection
Best for selecting between viable options using explicit criteria and trade-off analysis.

Working style
- define decision criteria
- compare alternatives
- expose trade-offs
- recommend one option`,
    diagram: `flowchart LR
  A[1. Decision Context] --> B[2. Alternative Evaluation]
  B --> C[3. Recommendation]`
  },

  "problem solving": {
    problemType: 'problem solving',
    selectedRoute: 'Root Cause → Options → Action Plan',
    pipeline: [
      '1. Problem Definition',
      '2. Root Cause and Options',
      '3. Recommended Action Plan'
    ],
    why: 'Best for diagnosing issues, identifying causes, and moving toward a workable solution.',
    guidance: 'Focus on root cause, realistic options, constraints, action plan, and validation steps.',
    outputFormat: `## 1. Problem Definition
## 2. Root Cause Analysis
## 3. Options
## 4. Trade-offs
## 5. Recommended Solution
## 6. Risks
## 7. Action Plan`,
    advanced: `Problem type
problem solving

Selection mode
Prompt type driven

Selected pipeline
1. Problem Definition
2. Root Cause and Options
3. Recommended Action Plan

Reason for selection
Best for diagnosing issues, identifying causes, and moving toward a workable solution.

Working style
- define the problem clearly
- separate symptoms from causes
- compare realistic options
- end with an action plan`,
    diagram: `flowchart LR
  A[1. Problem Definition] --> B[2. Root Cause and Options]
  B --> C[3. Recommended Action Plan]`
  },

  execution: {
    problemType: 'execution planning',
    selectedRoute: 'Scope → Sequence → Delivery',
    pipeline: [
      '1. Objective and Scope',
      '2. Execution Plan',
      '3. Validation and Next Steps'
    ],
    why: 'Best for turning intent into practical steps, sequencing work, and highlighting dependencies.',
    guidance: 'Focus on implementation steps, sequencing, ownership, dependencies, and practical delivery.',
    outputFormat: `## 1. Objective
## 2. Scope
## 3. Execution Plan
## 4. Dependencies
## 5. Risks
## 6. Validation
## 7. Immediate Next Steps`,
    advanced: `Problem type
execution planning

Selection mode
Prompt type driven

Selected pipeline
1. Objective and Scope
2. Execution Plan
3. Validation and Next Steps

Reason for selection
Best for turning intent into practical steps, sequencing work, and highlighting dependencies.

Working style
- define scope clearly
- sequence the work
- identify dependencies
- end with immediate next steps`,
    diagram: `flowchart LR
  A[1. Objective and Scope] --> B[2. Execution Plan]
  B --> C[3. Validation and Next Steps]`
  },

  writing: {
    problemType: 'written communication',
    selectedRoute: 'Audience → Draft → Refinement',
    pipeline: [
      '1. Audience and Purpose',
      '2. Draft Content',
      '3. Refinement'
    ],
    why: 'Best for producing clear writing tailored to an audience, purpose, and tone.',
    guidance: 'Focus on clarity, structure, audience, tone, and quality of final written output.',
    outputFormat: `## 1. Audience and Purpose
## 2. Key Message
## 3. Draft
## 4. Refinement Notes`,
    advanced: `Problem type
written communication

Selection mode
Prompt type driven

Selected pipeline
1. Audience and Purpose
2. Draft Content
3. Refinement

Reason for selection
Best for producing clear writing tailored to an audience, purpose, and tone.

Working style
- define audience and purpose
- draft clearly
- refine for tone and structure
- keep the message sharp`,
    diagram: `flowchart LR
  A[1. Audience and Purpose] --> B[2. Draft Content]
  B --> C[3. Refinement]`
  }
};

function getSelectedConfig() {
  const promptType = document.getElementById('promptType')?.value || 'analysis';
  return {
    promptType,
    config: PROMPT_TYPE_CONFIG[promptType] || PROMPT_TYPE_CONFIG.analysis
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

function updateSystemReasoning() {
  const { config } = getSelectedConfig();
  const reasoningGrid = document.querySelector('.reasoning-grid');
  if (!reasoningGrid) return;

  reasoningGrid.innerHTML = `
    <div><strong>Problem type</strong><span>${config.problemType}</span></div>
    <div><strong>Selection mode</strong><span>Prompt type driven</span></div>
    <div><strong>Selected route</strong><span>${config.selectedRoute}</span></div>
    <div><strong>Pipeline</strong><span>${config.pipeline.join(' → ')}</span></div>
    <div><strong>Why this route</strong><span>${config.why}</span></div>
  `;
}

function updateAdvancedConfig() {
  const { config } = getSelectedConfig();
  const editor = document.getElementById('editorBox');
  if (!editor) return;
  editor.value = config.advanced;
}

function updateDiagramWorkspace() {
  const { config } = getSelectedConfig();
  const diagram = document.getElementById('diagramWorkspace');
  if (!diagram) return;
  diagram.value = config.diagram;
}

function buildFinalPrompt() {
  const goal = document.getElementById('goalQuestion')?.value.trim() || '';
  const commandPalette = document.getElementById('commandPalette')?.value.trim() || '/atlas';
  const { promptType, config } = getSelectedConfig();
  const parsed = parseCommandPalette(commandPalette);
  const output = document.getElementById('chatgptHandoff');

  const prompt = `Command
/${parsed.mode}

Context
You are operating inside a structured Prompt Operating System.
Adapt your reasoning depth and structure to the task type.
Produce clear, useful, high-quality output.

Topic
${goal}

Prompt type
${promptType}

Personas
${parsed.personas.length ? parsed.personas.map(p => '@' + p).join(' ') : '@generalist'}

Intent
${parsed.intent}

Problem type
${config.problemType}

Selected route
${config.selectedRoute}

Pipeline
${config.pipeline.join('\n')}

Guidance
${config.guidance}

---

CORE INSTRUCTIONS

Work step by step.
Make assumptions explicit.
Be specific.
Avoid generic filler.
Adapt the depth to the topic.
Use clear sectioning.
Where relevant, compare alternatives and explain trade-offs.
Where uncertainty exists, state it clearly.

---

OUTPUT FORMAT

${config.outputFormat}

---

QUALITY BAR

Your output must:
- be structured and easy to scan
- be relevant to the topic
- avoid fluff
- be actionable where appropriate
- explain reasoning clearly
- state uncertainty when needed

Deliver a complete, high-quality answer adapted to the selected prompt type.
`;

  if (output) output.value = prompt;
}

function refreshPromptTypeDrivenUI() {
  updateSystemReasoning();
  updateAdvancedConfig();
  updateDiagramWorkspace();
  buildFinalPrompt();
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
  const promptType = document.getElementById('promptType');
  const goalQuestion = document.getElementById('goalQuestion');
  const generateBtn = document.getElementById('generatePromptBtn');
  const copyBtn = document.getElementById('copyForChatgptBtn');
  const copyTopBtn = document.getElementById('copyPromptTopBtn');

  updateParsedCommand();
  refreshPromptTypeDrivenUI();

  commandPalette?.addEventListener('input', () => {
    updateParsedCommand();
    buildFinalPrompt();
  });

  promptType?.addEventListener('change', refreshPromptTypeDrivenUI);
  goalQuestion?.addEventListener('input', buildFinalPrompt);
  generateBtn?.addEventListener('click', buildFinalPrompt);
  copyBtn?.addEventListener('click', () => copyTextFrom('chatgptHandoff'));
  copyTopBtn?.addEventListener('click', () => copyTextFrom('chatgptHandoff'));
});
