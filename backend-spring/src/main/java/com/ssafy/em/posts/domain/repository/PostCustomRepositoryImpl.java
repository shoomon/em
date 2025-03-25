package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
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
            Integer lastReadId,
            String sortBy,
            int pageSize
    ) {
        String baseQuery = """
        SELECT *
        FROM posts
        WHERE created_at >= NOW() - INTERVAL '24 HOURS'
          AND ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography, :radius)
    """;

//        if (lastReadId != null) {
//            baseQuery += " AND id < :lastReadId\n";
//        }

        baseQuery += " ORDER BY " + resolveSortColumn(sortBy) + " LIMIT :limit";

        Query query = em.createNativeQuery(baseQuery, Post.class)
                .setParameter("longitude", longitude)
                .setParameter("latitude", latitude)
                .setParameter("radius", radius)
                .setParameter("limit", pageSize + 1);

//        if (lastReadId != null) {
//            query.setParameter("lastReadId", lastReadId);
//        }
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

    private String resolveSortColumn(String sortBy) {
        return switch (sortBy) {
            case "createdAt" -> "created_at DESC";
            case "distance" -> "ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography)";
            case "likes" -> "emotion_count DESC";
            default -> "created_at DESC";
        };
    }
}
