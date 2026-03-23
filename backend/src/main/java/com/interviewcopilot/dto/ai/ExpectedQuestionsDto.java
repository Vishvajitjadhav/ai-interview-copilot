package com.interviewcopilot.dto.ai;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExpectedQuestionsDto {

    private List<String> technical;
    private List<String> behavioral;
}
