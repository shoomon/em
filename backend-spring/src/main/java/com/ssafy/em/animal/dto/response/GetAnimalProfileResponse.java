package com.ssafy.em.animal.dto.response;

import com.ssafy.em.animal.domain.entity.AnimalProfile;
import lombok.Builder;

@Builder
public record GetAnimalProfileResponse(
        int id,
        String emotion,
        String animal,
        String profileImageUrl
) {

   public static GetAnimalProfileResponse from(AnimalProfile animalProfile) {
       return GetAnimalProfileResponse.builder()
               .id(animalProfile.getId())
               .emotion(animalProfile.getEmotion().getName())
               .animal(animalProfile.getAnimal().getName())
               .profileImageUrl(animalProfile.getProfileImageUrl())
               .build();
   }
}
