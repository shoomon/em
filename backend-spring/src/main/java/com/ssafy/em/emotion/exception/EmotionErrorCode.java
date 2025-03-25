package com.ssafy.em.emotion.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum EmotionErrorCode {
    // 404
    NOT_FOUND("D4041", "존재하지 않는 감정입니다.");

    private final String code;
    private final String message;

    EmotionErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
