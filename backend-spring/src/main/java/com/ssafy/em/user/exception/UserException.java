package com.ssafy.em.user.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.NotFoundException;

public class UserException {

    public static class UserNotFoundException extends NotFoundException {
        public UserNotFoundException(UserErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
}
