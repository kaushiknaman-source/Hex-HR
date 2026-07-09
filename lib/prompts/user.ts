import { JDFormInput, ToolbarAction } from '@/lib/types/jd';

/** The exact JSON shape Claude must return — mirrors GeneratedJD in lib/types/jd.ts */
export const JD_JSON_SCHEMA = `{
  "title": string,
  "location": { "city": string, "state": string, "country": "India" },
  "department": string,
  "employmentType": string,
  "experienceRange": string,
  "jobSummary": string,
  "keyResponsibilities": string[],
  "qualifications": string[],
  "preferredQualifications": string[],
  "requiredSkills": string[],
  "preferredSkills": string[],
  "softSkills": string[],
  "aboutCompany": string,
  "equalOpportunityStatement": string,
  "qualityScore": {
    "overall": number,
    "requiredFields": boolean,
    "atsReady": boolean,
    "grammar": boolean,
    "completeness": boolean,
    "professionalLanguage": boolean
  },
  "suggestions": string[]
}`;

export function buildGenerateJDPrompt(input: JDFormInput): string {
  return `Generate a job description as JSON matching exactly this schema:
${JD_JSON_SCHEMA}

Recruiter input:
- Position: ${input.position}
- Department: ${input.department}
- Experience: ${input.experience}
- Employment type: ${input.employmentType}
- Qualifications entered: ${input.qualifications.join(', ') || 'none provided'}
- Location: ${input.city}, ${input.state}, India
- Skills entered (unsorted — you decide required vs preferred): ${input.skills.join(', ') || 'none provided'}
- Draft responsibilities from recruiter (expand/polish, keep intent): ${
    input.responsibilities.length ? input.responsibilities.join(' | ') : 'none provided, infer from role'
  }
- Additional notes: ${input.additionalNotes?.trim() || 'none'}

Return JSON only.`;
}

const TOOLBAR_INSTRUCTIONS: Record<ToolbarAction, string> = {
  improve: 'Improve clarity, flow, and professionalism without changing the substance.',
  shorten: 'Tighten every section significantly. Cut redundancy. Keep only essential content.',
  more_formal: 'Raise the register to formal corporate English. Remove contractions and casual phrasing.',
  more_technical: 'Increase technical specificity appropriate to the role — tools, standards, methods.',
  ats_optimize:
    'Optimize for applicant tracking systems: front-load keywords from the skills list, use standard section headers, avoid tables or special characters, keep bullet points parallel in structure.',
  regenerate: 'Regenerate the job description from scratch with a fresh approach, same input facts.',
};

export function buildToolbarActionPrompt(action: ToolbarAction, currentJD: unknown): string {
  return `You previously generated this job description JSON:
${JSON.stringify(currentJD)}

Task: ${TOOLBAR_INSTRUCTIONS[action]}

Return the FULL updated JSON object matching the same schema:
${JD_JSON_SCHEMA}

Return JSON only.`;
}
