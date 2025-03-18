package com.ssafy.em.Posts.dto.response;

import com.ssafy.em.Posts.dto.PostDetailDto;

import java.util.List;

public record GetPostListResponse(
        List<PostDetailDto> postList
) {
}
