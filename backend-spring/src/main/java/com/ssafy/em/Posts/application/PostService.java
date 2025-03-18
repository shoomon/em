package com.ssafy.em.Posts.application;

import com.ssafy.em.Posts.domain.entity.Post;
import com.ssafy.em.Posts.domain.repository.PostJpaRepository;
import com.ssafy.em.Posts.dto.request.CreatePostRequest;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService{
    private final PostJpaRepository postJpaRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();
    private final Random random = new Random();

    @Transactional
    public void createPost(CreatePostRequest request){

        //todo: user에서 동물 프로필 레포지토리 가져오기
//        List<animalProfiles> animalProfilesList = animalProfilesJpaRepository
//                .findAllByEmotionId(request.emotionId());
//
//        int randomIndex = random.nextInt(animalProfilesList.size());
//        int animalProfileId = animalProfilesList.get(randomIndex).getId();
        //todo: 감정에 대한 형용사 조회해와서 닉네임 생성

        //todo: 역geo api로 좌표정보로 주소 가져오기

        Point location = geometryFactory
                .createPoint(new Coordinate(request.longitude(), request.latitude()));
        location.setSRID(4326);

        Post post = Post.builder()
//                .animalProfileId(0)
                .userId(request.userId())
//                .nickname("")
                .content(request.content())
                .location(location)
//                .address("")
                .build();

        postJpaRepository.save(post);
    }

    @Transactional
    public void deletePost(){

    }
}