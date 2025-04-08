package com.ssafy.em.posts.exception;

import lombok.Getter;

@Getter
public enum PostErrorCode {
    POST_FORBIDDEN("A4031","게시글 작성자가 아닙니다."),
    POST_NOTFOUND("A4042","게시글을 찾을 수 없습니다."),
    POST_BADREQUEST("A4001", "비활성화된 프로필의 게시글은 삭제할 수 없습니다."),
    POST_INVALID_MUSIC("A4224", "musicId와 emotion은 필수입니다.");

    private final String code;
    private final String message;

    PostErrorCode(String code, String message){
        this.code = code;
        this.message = message;
    }
}
