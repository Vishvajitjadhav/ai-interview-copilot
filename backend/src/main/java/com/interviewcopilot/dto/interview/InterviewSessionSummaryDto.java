package com.interviewcopilot.dto.interview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewSessionSummaryDto {

    private Long id;
    private String companyName;
    private String roleTitle;
    private String timeAvailable;
    private Instant createdAt;
}
