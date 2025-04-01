package com.ssafy.em.music.domain;

import com.ssafy.em.music.domain.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Integer> {
}
