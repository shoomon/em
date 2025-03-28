package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostCursorDto;
import com.ssafy.em.posts.dto.PostPointDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
@Slf4j
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
            int pageSize,
            Double lng1,
            Double lat1,
            Double lng2,
            Double lat2
    ) {
        StringBuilder baseQuery = new StringBuilder("""
        SELECT *
        FROM posts
        WHERE created_at >= NOW() - INTERVAL '24 HOURS'
         AND ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography, :radius)
    """);

        if(lng1 != null && lat1 != null && lng2 != null && lat2 != null) {
            baseQuery.append(" AND location && ST_MakeEnvelope(:lng1, :lat1, :lng2, :lat2)");
        }

        if (sortBy == null || sortBy.isBlank()) {
            sortBy = "latest";
        }

        String sortCondition = getSortCondition(sortBy);
        baseQuery.append(sortCondition);


        baseQuery.append(" ORDER BY ").append(resolveSortColumn(sortBy)).append(", id DESC LIMIT :limit");

        Query query = em.createNativeQuery(baseQuery.toString(), Post.class)
                .setParameter("longitude", longitude)
                .setParameter("latitude", latitude)
                .setParameter("radius", radius)
                .setParameter("limit", pageSize + 1);

        if(lng1 != null && lat1 != null && lng2 != null && lat2 != null) {
            query.setParameter("lng1", lng1)
            .setParameter("lat1", lat1)
            .setParameter("lng2", lng2)
            .setParameter("lat2", lat2);
        }

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

    //fixme: 거리순 조회 시 중복 조회 발생 -> 소수점 오차로 추정
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
    public Map<Integer, String> getCalendarPostList(int userId, YearMonth yearMonth) {
        String sql = """
                SELECT DISTINCT ON (DATE(p.created_at))
                EXTRACT(DAY FROM p.created_at) AS day, p.emotion
                FROM posts p
                WHERE p.user_id = :userId
                AND p.created_at >= :startDate
                AND p.created_at < :endDate
                ORDER BY DATE(p.created_at), p.id DESC
                """;

        LocalDateTime startDate = yearMonth.atDay(1).atStartOfDay();
        LocalDateTime endDate = yearMonth.plusMonths(1).atDay(1).atStartOfDay();

        List<Object[]> result = em.createNativeQuery(sql)
                .setParameter("userId", userId)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();

        return result.stream()
                .collect(Collectors.toMap(
                        row -> ((Number)row[0]).intValue(),
                        row -> ((String)row[1])
                ));
    }


    private static String getSortCondition(String sortBy) {
        String result = "";

        switch (sortBy) {
            case "popular" -> result = """
                AND (
                    reaction_count < :cursorEmotionCount
                    OR (reaction_count = :cursorEmotionCount AND id < :cursorId)
                )
                """;
            case "distance" -> result = """
                AND (
                    ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography) > :cursorDistance
                    OR (
                        ABS(ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography)-:cursorDistance) < 1e-6
                        AND id < :cursorId
                    )
                )
                """;
            case "latest" -> result =  """
                 AND id < :cursorId
                """;
        }
        return result;
    }

    private String resolveSortColumn(String sortBy) {
        return switch (sortBy) {
            case "latest" -> "created_at DESC";
            case "distance" -> "ST_Distance(location::geography, ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography)";
            case "popular" -> "reaction_count DESC";
            default -> "created_at DESC";
        };
    }
}
