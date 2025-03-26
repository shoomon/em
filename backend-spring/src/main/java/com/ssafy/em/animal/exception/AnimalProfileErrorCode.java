package com.ssafy.em.animal.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum AnimalProfileErrorCode {
    // 404
    NOT_FOUND("G4041", "존재하지 않는 동물 프로필입니다.");

    private final String code;
    private final String message;

    AnimalProfileErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
