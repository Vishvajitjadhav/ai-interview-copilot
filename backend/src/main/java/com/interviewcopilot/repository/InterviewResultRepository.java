package com.interviewcopilot.repository;

import com.interviewcopilot.entity.InterviewResult;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InterviewResultRepository extends JpaRepository<InterviewResult, Long> {

    Optional<InterviewResult> findBySession_Id(Long sessionId);
}
