package com.ssafy.em.user.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum UserErrorCode {
    // 404
    NOT_FOUND("C4041", "존재하지 않는 회원입니다.");

    private final String code;
    private final String message;

    UserErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
