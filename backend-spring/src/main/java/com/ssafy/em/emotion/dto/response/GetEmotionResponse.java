package com.ssafy.em.emotion.dto.response;

import com.ssafy.em.emotion.domain.entity.Emotion;
import lombok.Builder;

@Builder
public record GetEmotionResponse(
        int id,
        String name,
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
