package com.ssafy.em.post_reaction.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "게시글 감정 요청 DTO")
public record PostReactionRequest(
        @Schema(description = "감정 ID", example = "JOY")
        String emotionName
) {
}
