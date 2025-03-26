package com.ssafy.em.animal.presentation;

import com.ssafy.em.animal.application.AnimalService;
import com.ssafy.em.animal.dto.request.CreateAnimalRequest;
import com.ssafy.em.animal.dto.response.GetAnimalResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/animals")
@RequiredArgsConstructor
public class AnimalController implements AnimalControllerDocs {

    private final AnimalService animalService;

    @PostMapping
    @Override
    public ResponseEntity<Void> createAnimal(@Valid @RequestBody CreateAnimalRequest request) {
        int animalId = animalService.create(request);
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/animals/{id}").buildAndExpand(animalId).toUri();

        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    @Override
    public ResponseEntity<List<GetAnimalResponse>> getAnimals() {
        List<GetAnimalResponse> animals = animalService.getList();
        return ResponseEntity.ok(animals);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<GetAnimalResponse> getAnimal(@PathVariable("id") int animalId) {
        GetAnimalResponse response = animalService.get(animalId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Void> deleteAnimal(@PathVariable("id") int animalId) {
        animalService.delete(animalId);
        return ResponseEntity.noContent().build();
    }
}
