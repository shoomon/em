package com.ssafy.em.posts.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record PostCursorDto(
        Integer id,
        Double distance,
        Integer emotionCount
) {
}
