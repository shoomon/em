package com.ssafy.em.post_reaction.exception;

import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.status.ForbiddenException;
import com.ssafy.em.common.exception.status.NotFoundException;
import com.ssafy.em.common.exception.status.UnauthorizedException;

public class PostReactionException {
    public static class PostReactionUnauthorizedException extends UnauthorizedException {
        public PostReactionUnauthorizedException(PostReactionErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
    public static class PostReactionForbiddenException extends ForbiddenException {
        public PostReactionForbiddenException(PostReactionErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }


    public static class PostReactionNotFoundException  extends NotFoundException {
        public PostReactionNotFoundException(PostReactionErrorCode errorCode) {
            super(new ErrorCode(errorCode.getCode(), errorCode.getMessage()));
        }
    }
}
