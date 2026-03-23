package com.interviewcopilot.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewcopilot.dto.ai.AiAnalysisPayloadDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * Used when {@code groq.api.key} is blank or for local demos without external calls.
 */
@Component
@RequiredArgsConstructor
public class MockAiAnalysisProvider {

    private final ObjectMapper objectMapper;

    public AiAnalysisPayloadDto loadSample() {
        try {
            ClassPathResource resource = new ClassPathResource("sample-mock-ai-response.json");
            if (resource.exists()) {
                String json = new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
                return objectMapper.readValue(json, AiAnalysisPayloadDto.class);
            }
        } catch (IOException ignored) {
            // fall through
        }
        return buildMinimalFallback();
    }

    private AiAnalysisPayloadDto buildMinimalFallback() {
        try {
            String json = """
                    {
                      "companyOverview": "Mock data: add your GROQ_API_KEY to generate real analysis.",
                      "hiringPsychology": "This company values clarity, ownership, and learning speed in interviews.",
                      "roadmap": [
                        {
                          "title": "Foundation",
                          "timeframe": "Days 1-2",
                          "tasks": ["Map job description to your resume bullets", "List 10 likely system-design angles for this role"],
                          "focus": "Align stories with the role"
                        },
                        {
                          "title": "Deep practice",
                          "timeframe": "Days 3-5",
                          "tasks": ["2 timed coding sessions on company-relevant patterns", "1 mock behavioral round"],
                          "focus": "Execution under time pressure"
                        }
                      ],
                      "expectedQuestions": {
                        "technical": ["Explain a recent backend change end-to-end.", "How would you debug a production latency spike?"],
                        "behavioral": ["Tell me about a conflict with a teammate.", "Why this company and this team?"]
                      },
                      "focusAreas": {
                        "strengths": ["Structured communication", "Hands-on project depth"],
                        "weaknesses": ["Quantifying impact in answers", "Time-boxing long explanations"],
                        "priorityTopics": ["Role-specific stack", "Company product context", "Your resume gaps vs JD"]
                      }
                    }
                    """;
            return objectMapper.readValue(json, AiAnalysisPayloadDto.class);
        } catch (IOException e) {
            throw new IllegalStateException("Failed to build fallback mock", e);
        }
    }
}
