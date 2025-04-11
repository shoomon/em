package com.ssafy.em.emotion.dto;

public record EmotionInfo(
        ReactionEmotions emotionCounts,
        String selectedEmotion
) {
}
