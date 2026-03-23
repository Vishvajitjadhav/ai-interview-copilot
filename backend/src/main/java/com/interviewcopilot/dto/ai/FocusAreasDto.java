package com.interviewcopilot.dto.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FocusAreasDto {

    private List<String> strengths;
    private List<String> weaknesses;
    /** Concrete topics to prioritize for this company + role */
    private List<String> priorityTopics;
}
