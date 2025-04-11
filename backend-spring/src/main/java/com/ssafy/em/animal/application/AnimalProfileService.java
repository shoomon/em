package com.ssafy.em.animal.application;

import com.ssafy.em.animal.domain.AnimalProfileRepository;
import com.ssafy.em.animal.domain.AnimalRepository;
import com.ssafy.em.animal.domain.entity.Animal;
import com.ssafy.em.animal.domain.entity.AnimalProfile;
import com.ssafy.em.animal.dto.request.CreateAnimalProfileRequest;
import com.ssafy.em.animal.dto.response.GetAnimalProfileResponse;
import com.ssafy.em.animal.exception.AnimalErrorCode;
import com.ssafy.em.animal.exception.AnimalException;
import com.ssafy.em.animal.exception.AnimalProfileErrorCode;
import com.ssafy.em.animal.exception.AnimalProfileException;
import com.ssafy.em.emotion.domain.EmotionRepository;
import com.ssafy.em.emotion.domain.entity.Emotion;
import com.ssafy.em.emotion.exception.EmotionErrorCode;
import com.ssafy.em.emotion.exception.EmotionException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AnimalProfileService {

    private final AnimalProfileRepository animalProfileRepository;
    private final EmotionRepository emotionRepository;
    private final AnimalRepository animalRepository;

    @Transactional
    public int create(CreateAnimalProfileRequest request) {
        Emotion emotion = emotionRepository.findById(request.emotionId())
                .orElseThrow(() -> new EmotionException.EmotionNotFoundException(EmotionErrorCode.NOT_FOUND));

        Animal animal = animalRepository.findById(request.animalId())
                .orElseThrow(() -> new AnimalException.AnimalNotFoundException(AnimalErrorCode.NOT_FOUND));

        AnimalProfile animalProfile = AnimalProfile.builder()
                .emotion(emotion)
                .animal(animal)
                .profileImageUrl(request.profileImageUrl())
                .build();

        animalProfileRepository.save(animalProfile);

        return animalProfile.getId();
    }

    public List<GetAnimalProfileResponse> getList() {
        List<AnimalProfile> animalProfiles = animalProfileRepository.findAll();

        return animalProfiles.stream()
                .map(GetAnimalProfileResponse::from)
                .toList();
    }

    public GetAnimalProfileResponse get(int animalProfileId) {
        AnimalProfile animalProfile = animalProfileRepository.findById(animalProfileId)
                .orElseThrow(() -> new AnimalProfileException.AnimalProfileNotFoundException(AnimalProfileErrorCode.NOT_FOUND));

        return GetAnimalProfileResponse.from(animalProfile);
    }

    public void delete(int animalProfileId) {
        if(animalProfileRepository.existsById(animalProfileId)) {
            throw new AnimalProfileException.AnimalProfileNotFoundException(AnimalProfileErrorCode.NOT_FOUND);
        }

        animalProfileRepository.deleteById(animalProfileId);
    }
}
