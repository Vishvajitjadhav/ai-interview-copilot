package com.interviewcopilot.dto.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class RoadmapPhaseDto {

    private String title;
    /** e.g. "Days 1-3" or "Week 1" */
    private String timeframe;
    private List<String> tasks;
    private String focus;
}
