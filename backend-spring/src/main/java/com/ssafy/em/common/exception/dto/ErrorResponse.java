package com.ssafy.em.common.exception.dto;

import com.ssafy.em.common.exception.ErrorCode;

public record ErrorResponse(
        String code,
        String message
) {
    public static ErrorResponse from(ErrorCode errorCode) {
        return new ErrorResponse(errorCode.getCode(), errorCode.getMessage());
    }
}
