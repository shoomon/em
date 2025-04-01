package com.ssafy.em.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class GlobalException extends RuntimeException {

    private final ErrorCode errorCode;
    private final HttpStatus httpStatus;

    public GlobalException(ErrorCode errorCode, HttpStatus httpStatus) {
        super(errorCode.message());
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
}
