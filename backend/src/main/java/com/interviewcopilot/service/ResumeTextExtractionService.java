package com.interviewcopilot.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ResumeTextExtractionService {

    private static final long MAX_BYTES = 10 * 1024 * 1024;

    public String extractTextFromPdf(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is required");
        }
        String original = file.getOriginalFilename();
        if (original == null || !original.toLowerCase().endsWith(".pdf")) {
            throw new IllegalArgumentException("Only PDF resumes are supported");
        }
        if (file.getSize() > MAX_BYTES) {
            throw new IllegalArgumentException("Resume must be smaller than 10 MB");
        }

        byte[] bytes = file.getBytes();
        try (PDDocument document = Loader.loadPDF(bytes)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            if (text == null || text.isBlank()) {
                throw new IllegalArgumentException("Could not read text from this PDF. Try a text-based PDF.");
            }
            // Keep a reasonable size for the LLM context window
            String trimmed = text.trim();
            int maxChars = 24_000;
            if (trimmed.length() > maxChars) {
                return trimmed.substring(0, maxChars) + "\n\n[... truncated for processing ...]";
            }
            return trimmed;
        }
    }
}
