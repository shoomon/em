package com.ssafy.em.Posts.exception;

import lombok.Getter;

@Getter
public enum PostErrorCode {
    POST_FORBIDDEN("A4031","게시글 작성자가 아닙니다."),
    POST_NOTFOUND("A4042","게시글을 찾을 수 없습니다.")
    ;

    private final String code;
    private final String message;

    PostErrorCode(String code, String message){
        this.code = code;
        this.message = message;
    }
}
