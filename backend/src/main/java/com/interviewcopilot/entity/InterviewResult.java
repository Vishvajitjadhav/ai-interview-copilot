package com.interviewcopilot.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

/**
 * Stores AI-generated analysis for one {@link InterviewSession}.
 * Text/JSON columns keep the model flexible without many schema migrations.
 */
@Entity
@Table(name = "interview_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false, unique = true)
    private InterviewSession session;

    @Column(name = "company_overview", columnDefinition = "TEXT")
    private String companyOverview;

    @Column(name = "hiring_psychology", columnDefinition = "TEXT")
    private String hiringPsychology;

    /** Structured roadmap: JSON array of phases with tasks and time hints */
    @Column(name = "roadmap_json", columnDefinition = "TEXT")
    private String roadmapJson;

    /** Expected questions: JSON with technical / behavioral arrays */
    @Column(name = "questions_json", columnDefinition = "TEXT")
    private String questionsJson;

    /** Strengths, weaknesses, priority topics */
    @Column(name = "focus_areas_json", columnDefinition = "TEXT")
    private String focusAreasJson;

    @Column(name = "raw_ai_json", columnDefinition = "TEXT")
    private String rawAiJson;

    @Column(name = "created_at", nullable = false)
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) {
            createdAt = Instant.now();
        }
    }
}
