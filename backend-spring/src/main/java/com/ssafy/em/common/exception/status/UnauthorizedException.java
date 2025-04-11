package com.ssafy.em.common.exception.status;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.GlobalException;
import org.springframework.http.HttpStatus;

public class UnauthorizedException extends GlobalException {
    public UnauthorizedException(ErrorCode errorCode) {
        super(errorCode, HttpStatus.UNAUTHORIZED);
    }
}

