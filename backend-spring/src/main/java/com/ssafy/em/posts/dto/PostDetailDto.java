package com.ssafy.em.posts.dto;

import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.util.Map;

public record PostDetailDto(
        int id,
        int userId,
        String nickname,
        String imageUrl,
        String content,
        double longitude,
        double latitude,
        Map<String, Long> emotionCountList,
        LocalDateTime createdAt
) {
}
