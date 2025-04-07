package com.ssafy.em.posts.dto.response;

import java.util.Map;

public record GetUserEmotionResponse(
        Map<String, Integer> emotionCount
){
}
