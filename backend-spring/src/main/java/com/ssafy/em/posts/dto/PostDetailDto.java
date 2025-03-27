package com.ssafy.em.posts.dto;

import com.ssafy.em.emotion.dto.ReactionEmotions;
import com.ssafy.em.posts.domain.entity.Post;

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
    public static PostDetailDto from(Post post, ReactionEmotions emotionCounts) {
        return new PostDetailDto(
                post.getId(),
                post.getUserId(),
                post.getNickname(),
                null,
                post.getAddress(),
                post.getContent(),
                post.getLocation().getX(),
                post.getLocation().getY(),
                emotionCounts,
                post.getCreatedAt()
        );
    }
}
