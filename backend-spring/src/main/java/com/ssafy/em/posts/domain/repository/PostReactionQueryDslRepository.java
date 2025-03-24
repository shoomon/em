package com.ssafy.em.posts.domain.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
@RequiredArgsConstructor
public class PostReactionQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public Map<String, Integer> getEmotionCount(int postId){
        queryFactory.select()
                .from(emotion)
                .join(postReaction)
                .where()
    }
}
