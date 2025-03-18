package com.ssafy.em.Posts.application;

import com.ssafy.em.Posts.domain.repository.PostJpaRepository;
import com.ssafy.em.Posts.dto.request.CreatePostRequest;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService{
    private final PostJpaRepository postJpaRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    @Transactional
    public void createPost(CreatePostRequest request){
        Point location = geometryFactory
                .createPoint(new Coordinate(request.longitude(), request.latitude()));
    }

    @Transactional
    public void deletePost(){

    }
}