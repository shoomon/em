package com.ssafy.em.emotion.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateEmotionRequest(
        @NotBlank(message = "감정은 필수 입력 항목입니다.")
        @Size(max = 30, message = "감정은 30자 이내로 입력해주세요.")
        String name,

        @NotBlank(message = "감정 색상 코드는 필수 입력 항목입니다.")
        @Pattern(regexp = "^#[0-9A-Fa-f]{6}$", message = "컬러 코드는 '#'로 시작하는 7자리 16진수여야 합니다.")
        String hexColor
) {
}
