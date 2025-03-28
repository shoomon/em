package com.ssafy.em.posts.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePostRequest(
        @NotBlank(message = "게시글 내용이 없습니다.")
        String content,
        @NotNull(message = "위도가 없습니다.")
        double latitude,
        @NotNull(message = "경도가 없습니다.")
        double longitude,
        String address,
        String emotion
) {
}
