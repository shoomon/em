package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostCursorDto;
import com.ssafy.em.posts.dto.PostPointDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostCustomRepositoryImpl implements PostCustomRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Post> getPostList(
            double longitude,
            double latitude,
            int radius,
            PostCursorDto cursor,
            String sortBy,
            int pageSize
    ) {
        StringBuilder baseQuery = new StringBuilder("""
        SELECT *
        FROM posts
        WHERE created_at >= NOW() - INTERVAL '24 HOURS'
          AND ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography, :radius)
    """);

        if (sortBy == null || sortBy.isBlank()) {
            sortBy = "latest";
        }
        switch (sortBy) {
            case "popular" -> baseQuery.append("""
                AND (
                    emotion_count < :cursorEmotionCount
                    OR (emotion_count = :cursorEmotionCount AND id < :cursorId)
                )
                """);
            case "distance" -> baseQuery.append("""
                AND (
                    ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography) > :cursorDistance
                    OR (
                        ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography) = :cursorDistance
                        AND id < :cursorId
                    )
                )
                """);
            case "latest" -> baseQuery.append("""
                 AND id < :cursorId
                """);
            }


        baseQuery.append(" ORDER BY ").append(resolveSortColumn(sortBy)).append(", id DESC LIMIT :limit");

        Query query = em.createNativeQuery(baseQuery.toString(), Post.class)
                .setParameter("longitude", longitude)
                .setParameter("latitude", latitude)
                .setParameter("radius", radius)
                .setParameter("limit", pageSize + 1);

        if (cursor != null) {
            query.setParameter("cursorId", cursor.id());
            switch (sortBy) {
                case "popular" -> query.setParameter("cursorEmotionCount", cursor.emotionCount());
                case "distance" -> query.setParameter("cursorDistance", cursor.distance());
            }
        }else{
            query.setParameter("cursorId", Integer.MAX_VALUE);
        }

        List temp = query.getResultList();
        return temp;
    }

    @Override
    public List<PostPointDto> getPointList(double longitude, double latitude, int radius) {
        String sql = """
        SELECT p.id, ST_X(p.location) AS longitude, ST_Y(p.location) AS latitude
        FROM posts p
        WHERE p.created_at >= NOW() - INTERVAL '24 HOURS'
          AND ST_DWithin(p.location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography, :radius)
    """;

        List<Object[]> results = em.createNativeQuery(sql)
                .setParameter("longitude", longitude)
                .setParameter("latitude", latitude)
                .setParameter("radius", radius)
                .getResultList();

        return results.stream()
                .map(row -> new PostPointDto(
                        ((Number) row[0]).intValue(),
                        ((Number) row[1]).doubleValue(),
                        ((Number) row[2]).doubleValue()
                ))
                .toList();
    }

    @Override
    public List<Post> getClusteredPostList(double lng1, double lat1, double lng2, double lat2) {
        String sql = """
                SELECT *
                FROM posts
                WHERE post.location && ST_MakeEnvelope(:lng1, :lat1, :lng2, :lat2)
                """;

        em.createNativeQuery(sql)
        return List.of();
    }


    private String resolveSortColumn(String sortBy) {
        return switch (sortBy) {
            case "createdAt" -> "created_at DESC";
            case "distance" -> "ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography)";
            case "likes" -> "emotion_count DESC";
            default -> "created_at DESC";
        };
    }
}
