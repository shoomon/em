package com.ssafy.em.animal.presentation;

import com.ssafy.em.animal.application.AnimalProfileService;
import com.ssafy.em.animal.dto.request.CreateAnimalProfileRequest;
import com.ssafy.em.animal.dto.response.GetAnimalProfileResponse;
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
@RequestMapping("/animal-profiles")
@RequiredArgsConstructor
public class AnimalProfileController implements AnimalProfileControllerDocs {

    private final AnimalProfileService animalProfileService;

    @PostMapping
    public ResponseEntity<Void> createAnimalProfile(@Valid @RequestBody CreateAnimalProfileRequest request) {
        int animalProfileId = animalProfileService.create(request);
        URI uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/animals/{id}").buildAndExpand(animalProfileId).toUri();

        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<GetAnimalProfileResponse>> getAnimalProfiles() {
        List<GetAnimalProfileResponse> animalProfiles = animalProfileService.getList();
        return ResponseEntity.ok(animalProfiles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetAnimalProfileResponse> getAnimalProfile(@PathVariable("id") int animalProfileId) {
        GetAnimalProfileResponse response = animalProfileService.get(animalProfileId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnimalProfile(@PathVariable("id") int animalProfileId) {
        animalProfileService.delete(animalProfileId);
        return ResponseEntity.noContent().build();
    }

}
