package com.ssafy.em.common.exception.status;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.GlobalException;
import org.springframework.http.HttpStatus;

public class BadRequestException extends GlobalException {
    public BadRequestException(ErrorCode errorCode) {
        super(errorCode, HttpStatus.BAD_REQUEST);
    }
}

