package com.ssafy.em.animal.dto.request;

public record CreateAnimalProfileRequest(
        int emotionId,
        int animalId,
        String profileImageUrl
) {
}
