package com.ssafy.em.posts.domain.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "logs")
public class LogDocument {

    @Id
    private String id;
    private String message;
    private String emotion;
    private LocalDateTime timestamp;

    public LogDocument(String message, String emotion) {
        this.message = message;
        this.emotion = emotion;
        this.timestamp = LocalDateTime.now();
    }

    // getters & setters
}