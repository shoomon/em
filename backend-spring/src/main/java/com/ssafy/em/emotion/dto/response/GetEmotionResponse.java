package com.ssafy.em.emotion.dto.response;

import com.ssafy.em.emotion.domain.entity.Emotion;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record GetEmotionResponse(
        @Schema(description = "감정 ID", example = "1")
        int id,
        @Schema(description = "감정 영어 이름", example = "ANGER")
        String engName,
        @Schema(description = "감정 한글 이름", example = "분노")
        String korName
) {

    public static GetEmotionResponse from(Emotion emotion) {
        return GetEmotionResponse.builder()
                .id(emotion.getId())
                .engName(emotion.getName())
                .korName(emotion.getKorName())
                .build();
    }
}
