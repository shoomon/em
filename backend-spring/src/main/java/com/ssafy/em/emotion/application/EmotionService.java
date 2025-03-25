package com.ssafy.em.emotion.application;

import com.ssafy.em.emotion.domain.EmotionRepository;
import com.ssafy.em.emotion.domain.entity.Emotion;
import com.ssafy.em.emotion.dto.request.CreateEmotionRequest;
import com.ssafy.em.emotion.dto.response.GetEmotionResponse;
import com.ssafy.em.emotion.exception.EmotionErrorCode;
import com.ssafy.em.emotion.exception.EmotionException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class EmotionService {

    private final EmotionRepository emotionRepository;

    @Transactional
    public int create(CreateEmotionRequest request) {
        Emotion emotion = Emotion.builder()
                .name(request.name())
                .hexColor(request.hexColor())
                .build();

        emotionRepository.save(emotion);

        return emotion.getId();
    }

    public GetEmotionResponse get(int emotionId) {
        Emotion emotion = emotionRepository.findById(emotionId)
                .orElseThrow(() -> new EmotionException.EmotionNotFoundException(EmotionErrorCode.NOT_FOUND));

        return GetEmotionResponse.from(emotion);
    }
}
