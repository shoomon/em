package com.ssafy.em.emotion.dto;

public record ReactionEmotions(
        int joy,
        int sadness,
        int anger,
        int surprise,
        int trust,
        int sum
) {
}
