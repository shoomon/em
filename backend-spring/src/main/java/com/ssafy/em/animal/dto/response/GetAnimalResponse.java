package com.ssafy.em.animal.dto.response;

import com.ssafy.em.animal.domain.entity.Animal;
import lombok.Builder;

@Builder
public record GetAnimalResponse(
        int id,
        String engName,
        String korName
) {

    public static GetAnimalResponse from(Animal animal) {
        return GetAnimalResponse.builder()
                .id(animal.getId())
                .engName(animal.getName())
                .korName(animal.getKorName())
                .build();
    }
}
