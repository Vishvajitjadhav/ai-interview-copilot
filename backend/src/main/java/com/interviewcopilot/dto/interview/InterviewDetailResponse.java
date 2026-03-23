package com.interviewcopilot.dto.interview;

import com.interviewcopilot.dto.ai.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewDetailResponse {

    private Long sessionId;
    private String companyName;
    private String companyWebsite;
    private String roleTitle;
    private String jobDescription;
    private String timeAvailable;
    private String extraContext;
    private String resumeFileName;
    private Instant createdAt;

    private String companyOverview;
    private String hiringPsychology;
    private List<RoadmapPhaseDto> roadmap;
    private ExpectedQuestionsDto expectedQuestions;
    private FocusAreasDto focusAreas;
}
