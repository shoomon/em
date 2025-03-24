package com.ssafy.em.posts.domain.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.NumberTemplate;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.entity.QPost;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.querydsl.core.types.dsl.Expressions.numberTemplate;

@Repository
@RequiredArgsConstructor
public class PostQueryDslRepository {
    private final JPAQueryFactory queryFactory;

    public List<Post> getMyPostList(
            String sortBy,
            Double lon,
            Double lat,
            Integer userId,
            int pageSize,
            Integer lastCursor) {
        QPost post = QPost.post;

        BooleanBuilder where = new BooleanBuilder();
        if (userId != null) {
            where.and(post.userId.eq(userId));
        }

        if (lastCursor != null) {
            where.and(post.id.lt(lastCursor));
        }

        JPQLQuery<Post> query = queryFactory
                .selectFrom(post)
                .where(where);

        if ("popular".equals(sortBy)) {
            query.orderBy(post.reactionCount.desc(), post.id.desc());
        } else if ("distance".equals(sortBy) && lon != null && lat != null) {
            Point userLocation = new GeometryFactory().createPoint(new Coordinate(lon, lat));
            userLocation.setSRID(4326);

            NumberTemplate<Double> distanceExpr = numberTemplate(Double.class,
                    "ST_DistanceSphere({0}, {1})",
                    post.location,
                    userLocation
            );

            query.orderBy(distanceExpr.asc(), post.id.desc());
        } else {
            query.orderBy(post.createdAt.desc(), post.id.desc());
        }

        return query
                .limit(pageSize)
                .fetch();
    }
}
