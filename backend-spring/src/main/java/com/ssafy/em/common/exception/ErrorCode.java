package com.ssafy.em.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

public record ErrorCode(
        String code,
        String message
) {
}
