package com.ssafy.em.posts.dto.response;

import com.ssafy.em.posts.dto.PostDetailDto;

import java.util.List;

public record GetPostListResponse(
        List<PostDetailDto> postList
) {
}
