package com.ssafy.em.emotion.domain;

import com.ssafy.em.emotion.domain.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmotionRepository extends JpaRepository<Emotion, Integer> {
    Optional<Emotion> findByName(String name);

    Optional<Emotion> findByNameAndIsActiveTrue(String name);

    List<Emotion> findByIsActiveTrueOrderByIdAsc();

    Optional<Emotion> findByIdAndIsActiveTrue(Integer id);
}
