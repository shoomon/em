package com.ssafy.em.posts.dto;

public record LastReadDto(
        Integer lastId,
        boolean hasNext
) {
}
