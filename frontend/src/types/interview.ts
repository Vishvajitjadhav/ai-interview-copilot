export interface RoadmapPhase {
  title: string;
  timeframe: string;
  tasks: string[];
  focus: string;
}

export interface ExpectedQuestions {
  technical: string[];
  behavioral: string[];
}

export interface FocusAreas {
  strengths: string[];
  weaknesses: string[];
  priorityTopics: string[];
}

export interface InterviewDetail {
  sessionId: number;
  companyName: string;
  companyWebsite: string | null;
  roleTitle: string;
  jobDescription: string | null;
  timeAvailable: string;
  extraContext: string | null;
  resumeFileName: string | null;
  createdAt: string;
  companyOverview: string;
  hiringPsychology: string;
  roadmap: RoadmapPhase[];
  expectedQuestions: ExpectedQuestions;
  focusAreas: FocusAreas;
}

export interface InterviewSessionSummary {
  id: number;
  companyName: string;
  roleTitle: string;
  timeAvailable: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  userId: number;
  email: string;
}
