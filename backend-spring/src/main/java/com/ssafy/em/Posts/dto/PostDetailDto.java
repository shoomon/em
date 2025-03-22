package com.ssafy.em.Posts.dto;

import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.util.Map;

public record PostDetailDto(
        int id,
        int userId,
        String nickname,
        String imageUrl,
        String content,
        Point location,
        Map<String, Integer> emotionCountList,
        LocalDateTime createdAt
) {
}
