package com.ssafy.em.posts.dto;

import java.time.LocalDateTime;
import java.util.Map;

public record PostDetailDto(
        int id,
        int userId,
        String nickname,
        String imageUrl,
        String content,
        Map<String, Integer> emotionCountList,
        LocalDateTime createdAt
) {
}
