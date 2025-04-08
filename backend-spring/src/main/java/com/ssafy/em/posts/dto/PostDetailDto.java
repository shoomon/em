package com.ssafy.em.posts.dto;

import com.ssafy.em.emotion.dto.EmotionInfo;
import com.ssafy.em.emotion.dto.ReactionEmotions;
import com.ssafy.em.music.domain.entity.Music;
import com.ssafy.em.music.dto.response.MusicInfo;
import com.ssafy.em.posts.domain.entity.Post;

import java.time.LocalDateTime;

public record PostDetailDto(
        int postId,
        boolean isAuthor,
        String nickname,
        String imageUrl,
        String emotion,
        String address,
        String content,
        double longitude,
        double latitude,
        MusicInfo musicInfo,      // 개별 artistName, title 대신 MusicInfo 사용
        EmotionInfo emotionInfo,
        LocalDateTime createdAt
) {
    public static PostDetailDto from(int userId, Post post, EmotionInfo emotionInfo) {
        Music music = post.getMusic();
        MusicInfo musicInfo = null;

        if (music != null) {
            musicInfo = new MusicInfo(music.getArtistName(), music.getTitle());
        }

        return new PostDetailDto(
                post.getId(),
                post.getUser().getId() == userId,
                post.getNickname(),
                post.getAnimalProfile().getProfileImageUrl(),
                post.getAnimalProfile().getEmotion().getName(),
                post.getAddress(),
                post.getContent(),
                post.getLocation().getX(),
                post.getLocation().getY(),
                musicInfo,
                emotionInfo,
                post.getCreatedAt()
        );
    }

    public static PostDetailDto from(int userId, Post post, ReactionEmotions reactionEmotions) {
        Music music = post.getMusic();
        MusicInfo musicInfo = null;

        if (music != null) {
            musicInfo = new MusicInfo(music.getArtistName(), music.getTitle());
        }

        return new PostDetailDto(
                post.getId(),
                post.getUser().getId() == userId,
                post.getNickname(),
                post.getAnimalProfile().getProfileImageUrl(),
                post.getAnimalProfile().getEmotion().getName(),
                post.getAddress(),
                post.getContent(),
                post.getLocation().getX(),
                post.getLocation().getY(),
                musicInfo,
                new EmotionInfo(reactionEmotions, null),
                post.getCreatedAt()
        );
    }
}