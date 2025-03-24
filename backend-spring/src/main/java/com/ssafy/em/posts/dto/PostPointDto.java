package com.ssafy.em.posts.dto;

import org.locationtech.jts.geom.Point;

public record PostPointDto(
        int id,
        double longitude,
        double latitude
) {
}
