package com.ssafy.em.auth.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.ForbiddenException;
import com.ssafy.em.common.exception.status.UnauthorizedException;

public class AuthException {

    public static class AuthUnauthorizedException extends UnauthorizedException {
        public AuthUnauthorizedException(AuthErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

    public static class AuthForbiddenException extends ForbiddenException {
        public AuthForbiddenException(AuthErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
}

