package com.ssafy.em.animal.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateAnimalRequest(
        @NotBlank(message = "동물은 필수 입력 항목입니다.")
        @Size(max = 30, message = "동물은 30자 이내로 입력해주세요.")
        String name,

        @NotBlank(message = "동물 한글 이름은 필수 입력 항목입니다.")
        @Size(max = 30, message = "동물 한글 이름은 30자 이내로 입력해주세요.")
        String korName
) {
}
