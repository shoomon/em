package com.ssafy.em.common.exception.status;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.GlobalException;
import org.springframework.http.HttpStatus;

public class ForbiddenException extends GlobalException {
    public ForbiddenException(ErrorCode errorCode) {
        super(errorCode, HttpStatus.FORBIDDEN);
    }
}

