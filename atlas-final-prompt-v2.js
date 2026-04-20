function buildFinalPrompt() {
  const goal = document.getElementById('goalQuestion')?.value.trim() || '';
  const commandPalette = document.getElementById('commandPalette')?.value.trim() || '/atlas';
  const parsed = parseCommandPalette(commandPalette);
  const output = document.getElementById('chatgptHandoff');

  const prompt = `Command
/${parsed.mode}

Context
You are a senior enterprise architect operating in a structured Prompt Operating System.
You must produce clear, decision-ready output suitable for technical stakeholders.

Topic
${goal}

Personas
${parsed.personas.length ? parsed.personas.map(p => '@' + p).join(' ') : '@architect'}

Problem type
technical architecture

Execution model
Follow this pipeline strictly:
1. Requirements Discovery
2. High-Level Architecture Design
3. Architecture Review

---

INSTRUCTIONS

Work systematically through each stage.
Do not skip steps.
Make assumptions explicit.
Avoid generic statements.

---

OUTPUT FORMAT

## 1. Problem Definition
- Restate the problem clearly
- Define scope and boundaries
- Identify constraints and assumptions

## 2. Requirements (Functional & Non-Functional)
- Functional requirements
- Non-functional requirements (security, performance, scalability, operability)
- Environmental constraints (platform, client type, network, identity)

## 3. Architecture Options
Present 2–3 realistic design alternatives.

For each option include:
- Description
- Key components
- Integration points
- Strengths
- Weaknesses

## 4. Trade-off Analysis
Compare options based on:
- Complexity
- Security
- Operational overhead
- User experience
- Time to implement

Be explicit. No vague comparisons.

## 5. Recommended Architecture
- Select ONE option
- Justify why it is best
- Explain why other options were rejected

## 6. Risk Analysis
Identify:
- Technical risks
- Operational risks
- Security risks

For each:
- Risk description
- Impact
- Mitigation

## 7. Implementation Guidance
- Key configuration principles
- Critical dependencies
- What must be validated early

---

QUALITY BAR

Your output must:
- be structured and scannable
- avoid fluff
- reflect real-world enterprise constraints
- be directly usable in architecture discussions

Do not produce generic advice.
Do not skip trade-offs.
Do not collapse sections.

Deliver a complete, decision-ready answer.
`;

  if (output) output.value = prompt;
}
