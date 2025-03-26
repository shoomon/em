package com.ssafy.em.animal.domain;

import com.ssafy.em.animal.domain.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Integer> {
}
