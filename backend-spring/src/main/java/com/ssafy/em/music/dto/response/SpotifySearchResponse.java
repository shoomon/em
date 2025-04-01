package com.ssafy.em.music.dto.response;

import lombok.Builder;

@Builder
public record SpotifySearchResponse(
        String artistName,
        String title,
        String albumImageUrl,
        String spotifyAlbumUrl
) {
    public static SpotifySearchResponse of(String artistName, String title, String spotifyUrl, String imageUrl) {
        return SpotifySearchResponse.builder()
                .artistName(artistName)
                .title(title)
                .spotifyAlbumUrl(spotifyUrl)
                .albumImageUrl(imageUrl)
                .build();
    }
}
