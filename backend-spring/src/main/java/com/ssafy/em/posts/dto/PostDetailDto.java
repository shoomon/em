package com.ssafy.em.posts.dto;

import java.time.LocalDateTime;
import java.util.Map;

public record PostDetailDto(
        int id,
        int userId,
        String nickname,
        String imageUrl,
        String address,
        String content,
        double longitude,
        double latitude,
        Map<String, Long> emotionCountList,
        LocalDateTime createdAt
) {
}
