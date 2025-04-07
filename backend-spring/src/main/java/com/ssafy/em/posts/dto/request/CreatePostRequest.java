package com.ssafy.em.posts.dto.request;

import jakarta.validation.constraints.NotNull;

public record CreatePostRequest(
        String content,
        @NotNull(message = "위도가 없습니다.")
        double latitude,
        @NotNull(message = "경도가 없습니다.")
        double longitude,
        String address,
        String emotion,
        boolean isSelected,

        // 음악 관련
        String musicId,
        String artistName,
        String title,
        String albumImageUrl,
        String spotifyTrackUrl
) {
}
