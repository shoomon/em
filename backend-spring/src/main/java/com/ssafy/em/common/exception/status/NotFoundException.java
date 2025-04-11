package com.ssafy.em.common.exception.status;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.GlobalException;
import org.springframework.http.HttpStatus;

public class NotFoundException extends GlobalException {
    public NotFoundException(ErrorCode errorCode) {
        super(errorCode, HttpStatus.NOT_FOUND);
    }
}

