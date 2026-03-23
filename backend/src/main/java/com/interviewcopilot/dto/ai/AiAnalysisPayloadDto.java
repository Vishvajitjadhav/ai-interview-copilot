package com.interviewcopilot.dto.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

/**
 * Shape we ask the LLM to return (JSON only). Extra fields are ignored on parse.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class AiAnalysisPayloadDto {

    private String companyOverview;
    private String hiringPsychology;
    private List<RoadmapPhaseDto> roadmap;
    private ExpectedQuestionsDto expectedQuestions;
    private FocusAreasDto focusAreas;
}
