package com.ssafy.em.posts.dto.request;

public record UpsertSongRequest(
        String key,
        String title,
        String artistName,
        String spotifyAlbumUrl,
        String albumImageUrl,
        String emotion
) {
    public static UpsertSongRequest to(
            String key,
            String title,
            String artistName,
            String spotifyAlbumUrl,
            String albumImageUrl,
            String emotion
    ){
        return new UpsertSongRequest(
                key,
                title,
                artistName,
                spotifyAlbumUrl,
                albumImageUrl,
                emotion
        );
    }
}
