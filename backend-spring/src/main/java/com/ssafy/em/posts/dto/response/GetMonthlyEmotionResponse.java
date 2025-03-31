package com.ssafy.em.posts.dto.response;

import java.util.Map;

public record GetMonthlyEmotionResponse (
        Map<String, Integer> emotionCount
){
}
