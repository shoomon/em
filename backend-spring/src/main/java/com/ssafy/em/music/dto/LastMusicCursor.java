package com.ssafy.em.music.dto;

public record LastMusicCursor(
        int lastMusicId,
        int lastMusicCount,
        boolean hasNext
) {
}
