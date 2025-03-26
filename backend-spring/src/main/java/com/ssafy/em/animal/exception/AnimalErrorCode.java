package com.ssafy.em.animal.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum AnimalErrorCode {
    // 400
    INVALID_ANIMAL_TYPE("E4001", "유효하지 않은 동물 타입입니다."),

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
