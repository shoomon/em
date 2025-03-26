package com.ssafy.em.animal.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.BadRequestException;
import com.ssafy.em.common.exception.status.NotFoundException;

public class AnimalException {

    public static class AnimalBadRequestException extends BadRequestException {
        public AnimalBadRequestException(AnimalErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

    public static class AnimalNotFoundException extends NotFoundException {
        public AnimalNotFoundException(AnimalErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

}
