import type { InterviewDetail, InterviewSessionSummary } from "@/types/interview";
import { apiClient } from "./apiClient";

export interface AnalyzePayload {
  resume: File;
  companyName: string;
  companyWebsite?: string;
  roleTitle: string;
  jobDescription?: string;
  timeAvailable: string;
  extraContext?: string;
}

export async function analyzeInterview(payload: AnalyzePayload): Promise<InterviewDetail> {
  const form = new FormData();
  form.append("resume", payload.resume);
  form.append("companyName", payload.companyName);
  if (payload.companyWebsite) {
    form.append("companyWebsite", payload.companyWebsite);
  }
  form.append("roleTitle", payload.roleTitle);
  if (payload.jobDescription) {
    form.append("jobDescription", payload.jobDescription);
  }
  form.append("timeAvailable", payload.timeAvailable);
  if (payload.extraContext) {
    form.append("extraContext", payload.extraContext);
  }

  const { data } = await apiClient.post<InterviewDetail>("/api/interview/analyze", form);
  return data;
}

export async function fetchInterview(sessionId: number): Promise<InterviewDetail> {
  const { data } = await apiClient.get<InterviewDetail>(`/api/interview/${sessionId}`);
  return data;
}

export async function fetchHistory(): Promise<InterviewSessionSummary[]> {
  const { data } = await apiClient.get<InterviewSessionSummary[]>("/api/interview/history");
  return data;
}
