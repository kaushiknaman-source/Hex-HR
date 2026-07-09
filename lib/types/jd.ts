export interface JDFormInput {
  position: string;
  department: string;
  experience: string;
  employmentType: string;
  qualifications: string[];
  state: string;
  city: string;
  skills: string[];
  responsibilities: string[];
  additionalNotes?: string;
}

export interface QualityScore {
  overall: number; // 0-100
  requiredFields: boolean;
  atsReady: boolean;
  grammar: boolean;
  completeness: boolean;
  professionalLanguage: boolean;
}

/** Structured shape Claude must return — the frontend never renders raw model text. */
export interface GeneratedJD {
  title: string;
  location: { city: string; state: string; country: 'India' };
  department: string;
  employmentType: string;
  experienceRange: string;
  jobSummary: string;
  keyResponsibilities: string[];
  qualifications: string[];
  preferredQualifications: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  softSkills: string[];
  aboutCompany: string;
  equalOpportunityStatement: string;
  qualityScore: QualityScore;
  suggestions: string[];
}

export type ToolbarAction =
  | 'improve'
  | 'shorten'
  | 'more_formal'
  | 'more_technical'
  | 'ats_optimize'
  | 'regenerate';
