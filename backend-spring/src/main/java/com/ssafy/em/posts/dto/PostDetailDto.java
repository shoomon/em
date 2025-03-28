package com.ssafy.em.posts.dto;

import com.ssafy.em.emotion.dto.EmotionInfo;
import com.ssafy.em.emotion.dto.ReactionEmotions;
import com.ssafy.em.posts.domain.entity.Post;

import java.time.LocalDateTime;

public record PostDetailDto(
        int postId,
        int userId,
        String nickname,
        String imageUrl,
        String emotion,
        String address,
        String content,
        double longitude,
        double latitude,
        EmotionInfo emotionInfo,
        LocalDateTime createdAt
) {
    public static PostDetailDto from(Post post, EmotionInfo emotionInfo) {
        return new PostDetailDto(
                post.getId(),
                post.getUser().getId(),
                post.getNickname(),
                post.getAnimalProfile().getProfileImageUrl(),
                post.getAnimalProfile().getEmotion().getName(),
                post.getAddress(),
                post.getContent(),
                post.getLocation().getX(),
                post.getLocation().getY(),
                emotionInfo,
                post.getCreatedAt()
        );
    }

    public static PostDetailDto from(Post post, ReactionEmotions reactionEmotions) {
        return new PostDetailDto(
                post.getId(),
                post.getUser().getId(),
                post.getNickname(),
                post.getAnimalProfile().getProfileImageUrl(),
                post.getAnimalProfile().getEmotion().getName(),
                post.getAddress(),
                post.getContent(),
                post.getLocation().getX(),
                post.getLocation().getY(),
                new EmotionInfo(
                        reactionEmotions,
                        null
                ),
                post.getCreatedAt()
        );
    }
}
