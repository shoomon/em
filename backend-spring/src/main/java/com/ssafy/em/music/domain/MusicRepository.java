package com.ssafy.em.music.domain;

import com.ssafy.em.music.domain.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Integer> {

    Optional<Music> findByArtistNameAndTitle(String artistName, String title);
}
