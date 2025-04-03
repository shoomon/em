package com.ssafy.em.term.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.NotFoundException;

public class TermException {
    public static class TermNotFoundException extends NotFoundException {
        public TermNotFoundException(TermErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
}
