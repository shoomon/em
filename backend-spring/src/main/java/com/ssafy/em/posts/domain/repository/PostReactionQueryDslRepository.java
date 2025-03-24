package com.ssafy.em.posts.domain.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ssafy.em.posts.domain.entity.QEmotion.emotion;
import static com.ssafy.em.posts.domain.entity.QPostReaction.postReaction;


@Repository
@RequiredArgsConstructor
public class PostReactionQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public Map<String, Long> getEmotionCount(int postId){
        List<Tuple> emotionCount = queryFactory.select(emotion.name, postReaction.count())
                                            .from(postReaction)
                                            .join(emotion)
                                            .on(postReaction.emotionId.eq(emotion.id))
                                            .where(postReaction.postId.eq(postId))
                                            .groupBy(emotion.name, postReaction.emotionId)
                                            .fetch();
        Map<String, Long> result = new HashMap<>();
        for(Tuple tuple : emotionCount){
            result.put(tuple.get(emotion.name), tuple.get(postReaction.count()));
        }
        return result;
    }
}
