package com.ssafy.em.Posts.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePostRequest(
        @NotNull(message = "감정 식별자가 없습니다.")
        int emotionId,
        @NotBlank(message = "게시글 내용이 없습니다.")
        String content,
        @NotNull(message = "위도가 없습니다.")
        double latitude,
        @NotNull(message = "경도가 없습니다.")
        double longitude
) {
}
