package com.interviewcopilot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "interview_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "company_name", nullable = false, length = 512)
    private String companyName;

    @Column(name = "company_website", length = 1024)
    private String companyWebsite;

    @Column(name = "role_title", nullable = false, length = 512)
    private String roleTitle;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    /** e.g. preset label + custom hours/days from the form */
    @Column(name = "time_available", nullable = false, length = 255)
    private String timeAvailable;

    @Column(name = "extra_context", columnDefinition = "TEXT")
    private String extraContext;

    @Column(name = "resume_content", columnDefinition = "TEXT")
    private String resumeContent;

    @Column(name = "resume_file_name", length = 512)
    private String resumeFileName;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}
