package com.ssafy.em.posts.dto.response;

import java.util.Map;

public record GetCalendarListResponse(
        Map<Integer, String> dateColor
) {
}
