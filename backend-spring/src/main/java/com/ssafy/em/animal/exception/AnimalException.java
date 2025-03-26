package com.ssafy.em.animal.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.NotFoundException;

public class AnimalException {

    public static class AnimalNotFoundException extends NotFoundException {
        public AnimalNotFoundException(AnimalErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

}
