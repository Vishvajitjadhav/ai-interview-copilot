package com.interviewcopilot.controller;

import com.interviewcopilot.dto.interview.InterviewDetailResponse;
import com.interviewcopilot.dto.interview.InterviewSessionSummaryDto;
import com.interviewcopilot.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
@RequiredArgsConstructor
public class InterviewController {

    private final InterviewService interviewService;

    /**
     * Upload resume (PDF) and session fields as multipart form data.
     */
    @PostMapping(value = "/analyze", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<InterviewDetailResponse> analyze(
            @RequestPart("resume") MultipartFile resume,
            @RequestParam("companyName") String companyName,
            @RequestParam(value = "companyWebsite", required = false) String companyWebsite,
            @RequestParam("roleTitle") String roleTitle,
            @RequestParam(value = "jobDescription", required = false) String jobDescription,
            @RequestParam("timeAvailable") String timeAvailable,
            @RequestParam(value = "extraContext", required = false) String extraContext
    ) throws Exception {
        InterviewDetailResponse body = interviewService.analyzeAndSave(
                resume,
                companyName,
                companyWebsite,
                roleTitle,
                jobDescription,
                timeAvailable,
                extraContext
        );
        return ResponseEntity.ok(body);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewDetailResponse> getById(@PathVariable Long id) throws Exception {
        return ResponseEntity.ok(interviewService.getByIdForCurrentUser(id));
    }

    @GetMapping("/history")
    public ResponseEntity<List<InterviewSessionSummaryDto>> history() {
        return ResponseEntity.ok(interviewService.listHistoryForCurrentUser());
    }
}
