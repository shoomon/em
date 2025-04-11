package com.ssafy.em.posts.dto;

public record LastReadDto(
        Integer lastId,
        Integer lastCnt,
        Double lastDist,
        boolean hasNext
) {
}
