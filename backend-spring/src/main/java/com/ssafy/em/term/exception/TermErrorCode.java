package com.ssafy.em.term.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum TermErrorCode {
    // 404
    NOT_FOUND("H4041", "존재하지 않는 이용약관입니다.");

    private final String code;
    private final String message;

    TermErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
