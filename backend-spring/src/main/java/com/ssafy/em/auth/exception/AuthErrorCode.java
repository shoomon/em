package com.ssafy.em.auth.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum AuthErrorCode {
    // 401
    UNAUTHORIZED("B4011", "인증에 실패했습니다."),
    EXPIRED_JWT_TOKEN("B4012", "만료된 JWT 토큰입니다."),

    // 403
    FORBIDDEN("B4031", "접근 권한이 없습니다.");

    private final String code;
    private final String message;

    AuthErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
