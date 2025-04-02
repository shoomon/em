package com.ssafy.em.music.domain.repository;

import com.ssafy.em.music.domain.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MusicRepository extends JpaRepository<Music, Integer>, MusicCustomRepository {

    Optional<Music> findByArtistNameAndTitle(String artistName, String title);
}
