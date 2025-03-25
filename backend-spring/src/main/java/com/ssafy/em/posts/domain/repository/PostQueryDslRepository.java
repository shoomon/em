package com.ssafy.em.posts.domain.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.entity.QPost;
import com.ssafy.em.posts.dto.PostPointDto;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static com.querydsl.core.types.dsl.Expressions.numberTemplate;

@Repository
@RequiredArgsConstructor
public class PostQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public List<PostPointDto> getPointList(
            double longitude,
            double latitude,
            int radius
    ) {
        QPost post = QPost.post;

        return queryFactory.select(Projections.constructor(PostPointDto.class,
                        post.id,
                        post.location
                ))
                .from(post)
                .where(
                        post.createdAt.goe(LocalDateTime.now().minusHours(24)),
                        Expressions.booleanTemplate(
                                "ST_DWithin({0}, ST_SetSRID(ST_MakePoint({1}, {2}), 4326)::geography, {3})",
                                post.location, longitude, latitude, radius
                        )
                )
                .fetch();
    }
}
