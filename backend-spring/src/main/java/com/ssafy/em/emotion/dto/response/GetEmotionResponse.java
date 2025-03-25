package com.ssafy.em.emotion.dto.response;

import com.ssafy.em.emotion.domain.entity.Emotion;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record GetEmotionResponse(
        @Schema(description = "감정 ID", example = "1")
        int id,
        @Schema(description = "감정 이름", example = "분노")
        String name,
        @Schema(description = "감정 16진수 색상 코드", example = "#FF7676")
        String hexColor
) {

    public static GetEmotionResponse from(Emotion emotion) {
        return GetEmotionResponse.builder()
                .id(emotion.getId())
                .name(emotion.getName())
                .hexColor(emotion.getHexColor())
                .build();
    }
}
