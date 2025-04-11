package com.ssafy.em.common.exception.status;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.GlobalException;
import org.springframework.http.HttpStatus;

public class ConflictException extends GlobalException {
    public ConflictException(ErrorCode errorCode) {
        super(errorCode, HttpStatus.CONFLICT);
    }
}

