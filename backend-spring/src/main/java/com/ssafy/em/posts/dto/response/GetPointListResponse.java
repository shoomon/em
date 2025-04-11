package com.ssafy.em.posts.dto.response;

import com.ssafy.em.posts.dto.PostPointDto;

import java.util.List;

public record GetPointListResponse(
        List<PostPointDto> pointList
) {
}
