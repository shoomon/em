package com.ssafy.em.animal.domain;

import com.ssafy.em.animal.domain.entity.AnimalProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalProfileRepository extends JpaRepository<AnimalProfile, Integer> {
}
