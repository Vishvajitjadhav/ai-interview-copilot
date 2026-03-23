package com.interviewcopilot.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interviewcopilot.dto.ai.*;
import com.interviewcopilot.dto.interview.InterviewDetailResponse;
import com.interviewcopilot.dto.interview.InterviewSessionSummaryDto;
import com.interviewcopilot.entity.InterviewResult;
import com.interviewcopilot.entity.InterviewSession;
import com.interviewcopilot.entity.User;
import com.interviewcopilot.repository.InterviewResultRepository;
import com.interviewcopilot.repository.InterviewSessionRepository;
import com.interviewcopilot.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {

    private final UserRepository userRepository;
    private final InterviewSessionRepository sessionRepository;
    private final InterviewResultRepository resultRepository;
    private final ResumeTextExtractionService resumeTextExtractionService;
    private final InterviewPromptBuilder interviewPromptBuilder;
    private final GroqInterviewAiService groqInterviewAiService;
    private final ObjectMapper objectMapper;

    @Transactional
    public InterviewDetailResponse analyzeAndSave(
            MultipartFile resume,
            String companyName,
            String companyWebsite,
            String roleTitle,
            String jobDescription,
            String timeAvailable,
            String extraContext
    ) throws Exception {
        if (companyName == null || companyName.isBlank()) {
            throw new IllegalArgumentException("Company name is required");
        }
        if (roleTitle == null || roleTitle.isBlank()) {
            throw new IllegalArgumentException("Role is required");
        }
        if (timeAvailable == null || timeAvailable.isBlank()) {
            throw new IllegalArgumentException("Time available is required");
        }

        User user = currentUser();

        String resumeText = resumeTextExtractionService.extractTextFromPdf(resume);
        String prompt = interviewPromptBuilder.buildUserPrompt(
                resumeText,
                companyName,
                companyWebsite,
                roleTitle,
                jobDescription,
                timeAvailable,
                extraContext
        );

        AiAnalysisPayloadDto ai = normalizeAnalysis(groqInterviewAiService.generateAnalysis(prompt));

        InterviewSession session = InterviewSession.builder()
                .user(user)
                .companyName(companyName.trim())
                .companyWebsite(blankToNull(companyWebsite))
                .roleTitle(roleTitle.trim())
                .jobDescription(blankToNull(jobDescription))
                .timeAvailable(timeAvailable.trim())
                .extraContext(blankToNull(extraContext))
                .resumeContent(resumeText)
                .resumeFileName(resume.getOriginalFilename())
                .build();
        session = sessionRepository.save(session);

        String rawJson = objectMapper.writeValueAsString(ai);
        InterviewResult result = InterviewResult.builder()
                .session(session)
                .companyOverview(ai.getCompanyOverview())
                .hiringPsychology(ai.getHiringPsychology())
                .roadmapJson(objectMapper.writeValueAsString(ai.getRoadmap()))
                .questionsJson(objectMapper.writeValueAsString(ai.getExpectedQuestions()))
                .focusAreasJson(objectMapper.writeValueAsString(ai.getFocusAreas()))
                .rawAiJson(rawJson)
                .build();
        resultRepository.save(result);

        return toDetailResponse(session, ai);
    }

    @Transactional(readOnly = true)
    public InterviewDetailResponse getByIdForCurrentUser(Long sessionId) throws Exception {
        User user = currentUser();
        InterviewSession session = sessionRepository.findByIdAndUserId(sessionId, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
        InterviewResult result = resultRepository.findBySession_Id(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("No analysis for this session"));

        return toDetailResponse(session, result);
    }

    @Transactional(readOnly = true)
    public List<InterviewSessionSummaryDto> listHistoryForCurrentUser() {
        User user = currentUser();
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(s -> InterviewSessionSummaryDto.builder()
                        .id(s.getId())
                        .companyName(s.getCompanyName())
                        .roleTitle(s.getRoleTitle())
                        .timeAvailable(s.getTimeAvailable())
                        .createdAt(s.getCreatedAt())
                        .build())
                .toList();
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalStateException("Authenticated user not found"));
    }

    private static String blankToNull(String s) {
        if (s == null || s.isBlank()) {
            return null;
        }
        return s.trim();
    }

    /** Avoid null nested objects when persisting JSON columns. */
    private static AiAnalysisPayloadDto normalizeAnalysis(AiAnalysisPayloadDto ai) {
        if (ai.getRoadmap() == null) {
            ai.setRoadmap(Collections.emptyList());
        }
        if (ai.getExpectedQuestions() == null) {
            ai.setExpectedQuestions(new ExpectedQuestionsDto());
        }
        if (ai.getExpectedQuestions().getTechnical() == null) {
            ai.getExpectedQuestions().setTechnical(Collections.emptyList());
        }
        if (ai.getExpectedQuestions().getBehavioral() == null) {
            ai.getExpectedQuestions().setBehavioral(Collections.emptyList());
        }
        if (ai.getFocusAreas() == null) {
            ai.setFocusAreas(new FocusAreasDto());
        }
        if (ai.getFocusAreas().getStrengths() == null) {
            ai.getFocusAreas().setStrengths(Collections.emptyList());
        }
        if (ai.getFocusAreas().getWeaknesses() == null) {
            ai.getFocusAreas().setWeaknesses(Collections.emptyList());
        }
        if (ai.getFocusAreas().getPriorityTopics() == null) {
            ai.getFocusAreas().setPriorityTopics(Collections.emptyList());
        }
        return ai;
    }

    private InterviewDetailResponse toDetailResponse(InterviewSession session, AiAnalysisPayloadDto ai) {
        return InterviewDetailResponse.builder()
                .sessionId(session.getId())
                .companyName(session.getCompanyName())
                .companyWebsite(session.getCompanyWebsite())
                .roleTitle(session.getRoleTitle())
                .jobDescription(session.getJobDescription())
                .timeAvailable(session.getTimeAvailable())
                .extraContext(session.getExtraContext())
                .resumeFileName(session.getResumeFileName())
                .createdAt(session.getCreatedAt())
                .companyOverview(ai.getCompanyOverview())
                .hiringPsychology(ai.getHiringPsychology())
                .roadmap(ai.getRoadmap())
                .expectedQuestions(ai.getExpectedQuestions())
                .focusAreas(ai.getFocusAreas())
                .build();
    }

    private InterviewDetailResponse toDetailResponse(InterviewSession session, InterviewResult result) throws Exception {
        List<RoadmapPhaseDto> roadmap = objectMapper.readValue(
                result.getRoadmapJson(),
                new TypeReference<>() {
                }
        );
        ExpectedQuestionsDto questions = objectMapper.readValue(
                result.getQuestionsJson(),
                ExpectedQuestionsDto.class
        );
        FocusAreasDto focus = objectMapper.readValue(
                result.getFocusAreasJson(),
                FocusAreasDto.class
        );

        AiAnalysisPayloadDto ai = new AiAnalysisPayloadDto();
        ai.setCompanyOverview(result.getCompanyOverview());
        ai.setHiringPsychology(result.getHiringPsychology());
        ai.setRoadmap(roadmap);
        ai.setExpectedQuestions(questions);
        ai.setFocusAreas(focus);

        return toDetailResponse(session, ai);
    }
}
