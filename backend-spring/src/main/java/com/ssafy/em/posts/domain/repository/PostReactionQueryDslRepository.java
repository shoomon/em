package com.ssafy.em.posts.domain.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PostReactionQueryDslRepository {
    private final JPAQueryFactory queryFactory;


}
