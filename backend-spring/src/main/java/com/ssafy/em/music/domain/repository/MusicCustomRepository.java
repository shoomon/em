package com.ssafy.em.music.domain.repository;

import com.ssafy.em.music.domain.entity.Music;
import com.ssafy.em.music.dto.LastMusicCursor;

import java.util.List;

public interface MusicCustomRepository {
    List<Music> getMusicPlaylist(
            double longitude,
            double latitude,
            int radius,
            LastMusicCursor cursor,
            int pageSize
    );
}
