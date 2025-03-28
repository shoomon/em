package com.ssafy.em.animal.domain;

import com.ssafy.em.animal.domain.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnimalRepository extends JpaRepository<Animal, Integer> {

    @Query(value = "SELECT * FROM animals ORDER BY random() LIMIT 1", nativeQuery = true)
    Animal findRandomAnimal();
}
