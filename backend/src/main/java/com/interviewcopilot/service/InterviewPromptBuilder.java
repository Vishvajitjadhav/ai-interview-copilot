package com.interviewcopilot.service;

import org.springframework.stereotype.Component;

/**
 * Builds the user message sent to the LLM from structured inputs.
 */
@Component
public class InterviewPromptBuilder {

    public String buildUserPrompt(
            String resumeText,
            String companyName,
            String companyWebsite,
            String roleTitle,
            String jobDescription,
            String timeAvailable,
            String extraContext
    ) {
        StringBuilder sb = new StringBuilder();
        sb.append("Prepare this candidate for an interview at ").append(companyName).append(".\n");
        sb.append("Role: ").append(roleTitle).append("\n");
        if (companyWebsite != null && !companyWebsite.isBlank()) {
            sb.append("Company website (for context): ").append(companyWebsite).append("\n");
        }
        if (jobDescription != null && !jobDescription.isBlank()) {
            sb.append("Job description:\n").append(jobDescription.trim()).append("\n\n");
        }
        sb.append("Time available to prepare: ").append(timeAvailable).append("\n");
        if (extraContext != null && !extraContext.isBlank()) {
            sb.append("Additional instructions from the candidate:\n").append(extraContext.trim()).append("\n\n");
        }
        sb.append("Resume text:\n---\n").append(resumeText).append("\n---\n");
        sb.append("""
                Produce the JSON object described in the system message.
                Ground every section in this company, this role, and this resume.
                Avoid generic interview advice; prefer concrete drills, topics, and questions they are likely to face.
                """);
        return sb.toString();
    }
}
