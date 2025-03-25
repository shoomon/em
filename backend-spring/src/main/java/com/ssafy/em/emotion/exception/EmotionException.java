package com.ssafy.em.emotion.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.NotFoundException;

public class EmotionException {

    public static class EmotionNotFoundException extends NotFoundException {
        public EmotionNotFoundException(EmotionErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
}
