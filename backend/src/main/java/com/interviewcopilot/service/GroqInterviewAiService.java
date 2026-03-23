package com.interviewcopilot.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewcopilot.dto.ai.AiAnalysisPayloadDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

/**
 * Calls Groq's OpenAI-compatible Chat Completions API and parses strict JSON output.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GroqInterviewAiService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final MockAiAnalysisProvider mockAiAnalysisProvider;

    @Value("${groq.api.key:}")
    private String groqApiKey;

    @Value("${groq.api.model:llama-3.3-70b-versatile}")
    private String groqModel;

    @Value("${groq.api.url}")
    private String groqUrl;

    public AiAnalysisPayloadDto generateAnalysis(String prompt) {
        if (!StringUtils.hasText(groqApiKey)) {
            log.warn("GROQ_API_KEY is not set — returning mock analysis.");
            return mockAiAnalysisProvider.loadSample();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey.trim());

        Map<String, Object> body = Map.of(
                "model", groqModel,
                "messages", List.of(
                        Map.of("role", "system", "content", systemPrompt()),
                        Map.of("role", "user", "content", prompt)
                ),
                "temperature", 0.35,
                "response_format", Map.of("type", "json_object")
        );

        try {
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.postForObject(groqUrl, entity, Map.class);
            if (response == null) {
                throw new IllegalStateException("Empty response from Groq");
            }
            String content = extractMessageContent(response);
            String json = stripMarkdownCodeFence(content);
            return objectMapper.readValue(json, AiAnalysisPayloadDto.class);
        } catch (Exception e) {
            log.error("Groq call failed, falling back to mock sample", e);
            return mockAiAnalysisProvider.loadSample();
        }
    }

    private static String systemPrompt() {
        return """
                You are an expert interview coach. Respond with a single JSON object only (no markdown).
                The JSON must match this shape:
                {
                  "companyOverview": string,
                  "hiringPsychology": string,
                  "roadmap": [ { "title": string, "timeframe": string, "tasks": string[], "focus": string } ],
                  "expectedQuestions": { "technical": string[], "behavioral": string[] },
                  "focusAreas": { "strengths": string[], "weaknesses": string[], "priorityTopics": string[] }
                }
                The roadmap must be realistic for the candidate's available time, day-based or phase-based,
                and tightly aligned to the company, role, job description, and resume (not generic advice).
                """;
    }

    @SuppressWarnings("unchecked")
    private static String extractMessageContent(Map<String, Object> response) {
        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
        if (choices == null || choices.isEmpty()) {
            throw new IllegalStateException("No choices in Groq response");
        }
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
        if (message == null) {
            throw new IllegalStateException("No message in Groq choice");
        }
        Object content = message.get("content");
        if (content == null) {
            throw new IllegalStateException("No content in message");
        }
        return content.toString();
    }

    /** Some models occasionally wrap JSON in ``` fences — remove if present. */
    private static String stripMarkdownCodeFence(String raw) {
        String s = raw.trim();
        if (s.startsWith("```")) {
            int first = s.indexOf('\n');
            int last = s.lastIndexOf("```");
            if (first > 0 && last > first) {
                s = s.substring(first + 1, last).trim();
            }
        }
        return s;
    }
}
