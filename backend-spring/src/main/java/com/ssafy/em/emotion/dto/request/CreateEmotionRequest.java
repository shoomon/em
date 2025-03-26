package com.ssafy.em.emotion.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateEmotionRequest(
        @NotBlank(message = "감정은 필수 입력 항목입니다.")
        @Size(max = 30, message = "감정은 30자 이내로 입력해주세요.")
        @Schema(description = "감정 영문 이름", example = "ANGER")
        String name,

        @NotBlank(message = "감정 한글 이름은 필수 입력 항목입니다.")
        @Size(max = 30, message = "감정 한글 이름은 30자 이내로 입력해주세요.")
        @Schema(description = "감정 한글 이름", example = "분노")
        String korName
) {
}
