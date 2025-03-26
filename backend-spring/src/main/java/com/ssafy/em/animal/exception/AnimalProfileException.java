package com.ssafy.em.animal.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.NotFoundException;

public class AnimalProfileException {

    public static class AnimalProfileNotFoundException extends NotFoundException {
        public AnimalProfileNotFoundException(AnimalProfileErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

}
