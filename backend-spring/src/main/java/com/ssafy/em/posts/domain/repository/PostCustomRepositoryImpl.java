package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
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

    private String resolveSortColumn(String sortBy) {
        return switch (sortBy) {
            case "createdAt" -> "created_at DESC";
            case "distance" -> "ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography)";
            case "likes" -> "like_count DESC";
            default -> "created_at DESC";
        };
    }
}
