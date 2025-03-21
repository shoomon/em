package com.ssafy.em.auth.exception;

import lombok.Getter;

@Getter
public enum AuthErrorCode {
    UNAUTHORIZED("B4011", "인증이 필요합니다."),

    FORBIDDEN("B4031", "접근 권한이 없습니다.");

    private final String code;
    private final String message;

    AuthErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
