package com.ssafy.em.post_reaction.exception;

import com.ssafy.em.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public enum PostReactionErrorCode {

    // 404
    NOT_FOUND("F4040", "해당하는 게시글을 찾을 수 없습니다."),

    // 409
    DUPLICATE_REACTION("F4090", "이미 감정을 선택하였습니다.");

    private final String code;
    private final String message;

    PostReactionErrorCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ErrorCode toErrorCode() {
        return new ErrorCode(code, message);
    }
}
