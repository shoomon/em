package com.ssafy.em.animal.application;

import com.ssafy.em.animal.domain.AnimalRepository;
import com.ssafy.em.animal.domain.entity.Animal;
import com.ssafy.em.animal.dto.request.CreateAnimalRequest;
import com.ssafy.em.animal.dto.response.GetAnimalResponse;
import com.ssafy.em.animal.exception.AnimalErrorCode;
import com.ssafy.em.animal.exception.AnimalException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    @Transactional
    public int create(CreateAnimalRequest request) {
        Animal animal = Animal.builder()
                .name(request.name())
                .korName(request.korName())
                .build();

        animalRepository.save(animal);

        return animal.getId();
    }

    public List<GetAnimalResponse> getList() {
        List<Animal> animals = animalRepository.findAll();

        return animals.stream()
                .map(GetAnimalResponse::from)
                .toList();
    }

    public GetAnimalResponse get(int animalId) {
        Animal animal = animalRepository.findById(animalId)
                .orElseThrow(() -> new AnimalException.AnimalNotFoundException(AnimalErrorCode.NOT_FOUND));

        return GetAnimalResponse.from(animal);
    }

    public void delete(int animalId) {
        if(!animalRepository.existsById(animalId)) {
            throw new AnimalException.AnimalNotFoundException(AnimalErrorCode.NOT_FOUND);
        }

        animalRepository.deleteById(animalId);
    }
}
