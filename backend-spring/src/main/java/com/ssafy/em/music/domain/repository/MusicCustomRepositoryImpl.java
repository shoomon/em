package com.ssafy.em.music.domain.repository;

import com.ssafy.em.music.domain.entity.Music;
import com.ssafy.em.music.dto.LastMusicCursor;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MusicCustomRepositoryImpl implements MusicCustomRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Music> getMusicPlaylist(
            double longitude,
            double latitude,
            int radius,
            LastMusicCursor cursor,
            int pageSize
    ) {
        StringBuilder sql = new StringBuilder("""
            SELECT DISTINCT m.*
            FROM posts p
            JOIN music m ON p.music_id = m.id
            WHERE p.created_at >= NOW() - INTERVAL '24 HOURS'
              AND ST_DWithin(
                    p.location::geography,
                    ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
                    :radius
              )
              AND p.music_id IS NOT NULL
            """);

        // cursor가 존재할 경우에만 커서 조건을 추가합니다.
        if (cursor != null) {
            sql.append("""
                AND (m.music_count < :cursorMusicCount
                     OR (m.music_count = :cursorMusicCount AND m.id > :cursorMusicId))
            """);
        }
        sql.append(" ORDER BY m.music_count DESC, m.id ASC LIMIT :limit");

        Query query = em.createNativeQuery(sql.toString(), Music.class)
                .setParameter("longitude", longitude)
                .setParameter("latitude", latitude)
                .setParameter("radius", radius)
                .setParameter("limit", pageSize + 1); // limit+1개 조회하여 다음 페이지 존재 여부 판별

        // cursor가 존재할 때에만 파라미터를 설정합니다.
        if (cursor != null) {
            query.setParameter("cursorMusicCount", cursor.lastMusicCount());
            query.setParameter("cursorMusicId", cursor.lastMusicId());
        }

        return query.getResultList();
    }
}
