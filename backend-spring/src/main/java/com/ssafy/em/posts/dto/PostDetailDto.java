package com.ssafy.em.posts.dto;

import com.ssafy.em.emotion.dto.ReactionEmotions;

import java.time.LocalDateTime;

public record PostDetailDto(
        int postId,
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
