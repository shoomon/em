package com.ssafy.em.emotion.domain;

import com.ssafy.em.emotion.domain.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRepository extends JpaRepository<Emotion, Integer> {
}
