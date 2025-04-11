package com.ssafy.em.user.dto.request;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;

public record TermAgreementRequest(
        @NotNull
        @AssertTrue(message = "개인정보 처리방침 동의는 필수입니다.")
        boolean isPersonalInfoConsented,

        @NotNull
        @AssertTrue(message = "위치 기반 동의는 필수입니다.")
        boolean isLocationInfoConsented,

        @NotNull(message = "마케팅 수집 동의는 true 또는 false 값이어야 합니다.")
        boolean isAllowingMarketing
) {
}
