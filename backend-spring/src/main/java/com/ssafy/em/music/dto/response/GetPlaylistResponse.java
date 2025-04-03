package com.ssafy.em.music.dto.response;

import com.ssafy.em.music.dto.LastMusicCursor;

import java.util.List;

public record GetPlaylistResponse(
        List<SpotifySearchResponse> musicList,
        LastMusicCursor meta
) {
}
