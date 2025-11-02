// AI Clinical Analysis Prompt Library for ADONIS Platform

export interface AIPrompt {
  id: string
  title: string
  description: string
  requiresLabs: boolean
  prompt: string
}

export const AI_PROMPTS: Record<string, AIPrompt> = {
  initialAssessment: {
    id: 'initialAssessment',
    title: 'Initial Assessment',
    description: 'Analyze symptoms and recommend lab panels',
    requiresLabs: false,
    prompt: `You are a clinical expert reviewing an initial patient consultation for a premium men's health optimization program.

Patient Information:
Name: {NAME}
Age: {AGE}
Occupation: {OCCUPATION}

Primary Goals: {GOALS}
Current Symptoms: {SYMPTOMS}
Medical Conditions: {CONDITIONS}
Lifestyle Factors: {LIFESTYLE}

Please provide:

1. **Clinical Impression**: Summarize the patient's presentation and likely underlying issues.
2. **Recommended Lab Panels**: Which specific lab panels would you recommend and why?
3. **Priority Areas**: What are the 2-3 most important health areas to address first?
4. **Initial Recommendations**: Any lifestyle or preliminary recommendations while awaiting lab results?

Format your response in clear sections for provider review.`
  },

  comprehensive: {
    id: 'comprehensive',
    title: 'Systems Analysis',
    description: 'Full physiological systems review',
    requiresLabs: true,
    prompt: `Analyze the following patient data and lab results organized by physiological system.

Patient: {NAME}, {AGE} years old
Symptoms: {SYMPTOMS}
Goals: {GOALS}

Lab Results:
{LAB_RESULTS}

For each system:
- Identify if results fall within optimal, borderline, or pathological range
- Explain clinical relevance
- Highlight system imbalances
- Recommend next steps`
  }
}

export function buildPrompt(promptId: string, data: any): string {
  const prompt = AI_PROMPTS[promptId]
  if (!prompt) throw new Error('Prompt not found: ' + promptId)

  return prompt.prompt
    .replace(/{NAME}/g, data.name || 'Patient')
    .replace(/{AGE}/g, String(data.age || 'Unknown'))
    .replace(/{OCCUPATION}/g, data.occupation || 'Not specified')
    .replace(/{SYMPTOMS}/g, data.symptoms?.join(', ') || 'None')
    .replace(/{GOALS}/g, data.goals?.join(', ') || 'Health optimization')
    .replace(/{CONDITIONS}/g, data.conditions?.join(', ') || 'None')
    .replace(/{LIFESTYLE}/g, JSON.stringify(data.lifestyle || {}, null, 2))
    .replace(/{LAB_RESULTS}/g, JSON.stringify(data.labResults || {}, null, 2))
}
