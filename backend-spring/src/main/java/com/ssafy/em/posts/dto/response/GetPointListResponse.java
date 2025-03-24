package com.ssafy.em.Posts.dto.response;

import com.ssafy.em.Posts.dto.PostPointDto;

import java.util.List;

public record GetPointListResponse(
        List<PostPointDto> pointList
) {
}
