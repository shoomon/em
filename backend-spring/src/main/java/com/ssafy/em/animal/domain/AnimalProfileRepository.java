package com.ssafy.em.animal.domain;

import com.ssafy.em.animal.domain.entity.AnimalProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnimalProfileRepository extends JpaRepository<AnimalProfile, Integer> {

    Optional<AnimalProfile> findByAnimal_IdAndEmotion_Id(int animalId, int emotionId);
}

