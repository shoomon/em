package com.ssafy.em.animal.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum AnimalErrorCode {
    // 404
    NOT_FOUND("E4041", "존재하지 않는 동물입니다.");

    private final String code;
    private final String message;

    AnimalErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
