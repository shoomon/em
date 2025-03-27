package com.ssafy.em.posts.dto;

import com.ssafy.em.emotion.dto.ReactionEmotions;

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
        ReactionEmotions emotionCountList,
        LocalDateTime createdAt
) {
}
