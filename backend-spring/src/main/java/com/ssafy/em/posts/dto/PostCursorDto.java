package com.ssafy.em.posts.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record PostCursorDto(
        @NotNull(message = "게시글 id가 없습니다.")
        Integer id,
        Double distance,
        Integer emotionCount
) {
}
