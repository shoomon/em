package com.ssafy.em.Posts.dto.request;

public record CreatePostRequest(
    int userId,
    int emotionId,
    String content,
    double latitude,
    double longitude
) {
}
