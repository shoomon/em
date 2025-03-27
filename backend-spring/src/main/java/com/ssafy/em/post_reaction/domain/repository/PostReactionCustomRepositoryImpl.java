package com.ssafy.em.post_reaction.domain.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class PostReactionCustomRepositoryImpl implements PostReactionCustomRepository {

    @PersistenceContext
    EntityManager em;

    @Override
    public Map<String, Long> getEmotionCount(int postId) {
        String sql = """
                SELECT e.name, count(*)
                FROM post_reaction r
                JOIN emotion e
                ON r.emotion_id = e.id
                WHERE r.post_id = ?1
                GROUP BY e.name, r.emotion_id
                """;

        List<Object[]> result = em.createNativeQuery(sql)
                .setParameter(1, postId)
                .getResultList();

        return result.stream()
                .collect(Collectors.toMap(
                        row -> ((String)row[0]),
                        row -> ((Number)row[1]).longValue()
                ));
    }
}
