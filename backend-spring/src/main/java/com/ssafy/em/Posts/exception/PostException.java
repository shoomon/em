package com.ssafy.em.Posts.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.ForbiddenException;
import com.ssafy.em.common.exception.status.NotFoundException;
import com.ssafy.em.common.exception.status.UnauthorizedException;

public class PostException {

    public static class PostUnauthorizedException extends UnauthorizedException {
        public PostUnauthorizedException(PostErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
    public static class PostForbiddenException extends ForbiddenException {
        public PostForbiddenException(PostErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }


    public static class PostNotFoundException  extends NotFoundException {
        public PostNotFoundException(PostErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }

}
