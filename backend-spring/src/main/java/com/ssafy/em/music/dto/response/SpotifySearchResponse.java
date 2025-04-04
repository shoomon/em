package com.ssafy.em.music.dto.response;

import com.ssafy.em.music.domain.entity.Music;
import lombok.Builder;

@Builder
public record SpotifySearchResponse(
        String musicId,
        String artistName,
        String title,
        String albumImageUrl,
        String spotifyTrackUrl
) {
    public static SpotifySearchResponse from(Music music) {
        return SpotifySearchResponse.builder()
                .artistName(music.getArtistName())
                .title(music.getTitle())
                .albumImageUrl(music.getAlbumImageUrl())
                .spotifyTrackUrl(music.getSpotifyTrackUrl())
                .build();
    }

    public static SpotifySearchResponse of(
            String musicId,
            String artistName,
            String title,
            String spotifyUrl,
            String imageUrl
    ) {
        return SpotifySearchResponse.builder()
                .musicId(musicId)
                .artistName(artistName)
                .title(title)
                .spotifyTrackUrl(spotifyUrl)
                .albumImageUrl(imageUrl)
                .build();
    }
}
