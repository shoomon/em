package com.ssafy.em.Posts.dto;

import org.locationtech.jts.geom.Point;

public record PostPointDto(
        int id,
        Point location
) {
}
