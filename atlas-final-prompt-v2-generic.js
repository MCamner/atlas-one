function buildFinalPrompt() {
  const goal = document.getElementById('goalQuestion')?.value.trim() || '';
  const commandPalette = document.getElementById('commandPalette')?.value.trim() || '/atlas';
  const promptType = document.getElementById('promptType')?.value || 'analysis';
  const parsed = parseCommandPalette(commandPalette);
  const output = document.getElementById('chatgptHandoff');

  const typeGuidance = {
    analysis: `Focus on understanding the problem, identifying key factors, and producing a clear analytical breakdown.`,
    architecture: `Focus on structure, components, design options, dependencies, constraints, and recommendation.`,
    strategy: `Focus on objectives, options, trade-offs, risks, sequencing, and strategic recommendation.`,
    research: `Focus on facts, sources, uncertainty, comparison, and synthesis of findings.`,
    decision: `Focus on alternatives, decision criteria, trade-offs, risk, and final recommendation.`,
    "problem solving": `Focus on root cause, realistic options, constraints, action plan, and validation steps.`,
    execution: `Focus on implementation steps, sequencing, ownership, dependencies, and practical delivery.`,
    writing: `Focus on clarity, structure, audience, tone, and quality of final written output.`
  };

  const outputFormat = {
    analysis: `## 1. Problem Definition
## 2. Key Factors
## 3. Analysis
## 4. Insights
## 5. Conclusion`,
    architecture: `## 1. Problem Definition
## 2. Requirements and Constraints
## 3. Design Options
## 4. Trade-off Analysis
## 5. Recommendation
## 6. Risks
## 7. Implementation Guidance`,
    strategy: `## 1. Objective
## 2. Current Situation
## 3. Strategic Options
## 4. Trade-offs
## 5. Recommendation
## 6. Risks
## 7. Next Steps`,
    research: `## 1. Research Question
## 2. Findings
## 3. Evidence and Sources
## 4. Comparison
## 5. Gaps and Uncertainty
## 6. Conclusion`,
    decision: `## 1. Decision Context
## 2. Evaluation Criteria
## 3. Alternatives
## 4. Comparison
## 5. Recommendation
## 6. Risks
## 7. Next Steps`,
    "problem solving": `## 1. Problem Definition
## 2. Root Cause Analysis
## 3. Options
## 4. Trade-offs
## 5. Recommended Solution
## 6. Risks
## 7. Action Plan`,
    execution: `## 1. Objective
## 2. Scope
## 3. Execution Plan
## 4. Dependencies
## 5. Risks
## 6. Validation
## 7. Immediate Next Steps`,
    writing: `## 1. Audience and Purpose
## 2. Key Message
## 3. Draft
## 4. Refinement Notes`
  };

  const prompt = `Command
/${parsed.mode}

Context
You are operating inside a structured Prompt Operating System.
Adapt your reasoning depth and structure to the task type.
Produce clear, useful, decision-ready output.

Topic
${goal}

Prompt type
${promptType}

Personas
${parsed.personas.length ? parsed.personas.map(p => '@' + p).join(' ') : '@generalist'}

Intent
${parsed.intent}

Guidance
${typeGuidance[promptType] || typeGuidance.analysis}

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

${outputFormat[promptType] || outputFormat.analysis}

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
