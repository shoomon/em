package com.ssafy.em.posts.application;

import static com.ssafy.em.posts.exception.PostException.PostNotFoundException;
import static com.ssafy.em.posts.exception.PostException.PostForbiddenException;


import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.repository.PostJpaRepository;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import com.ssafy.em.posts.exception.PostErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class PostService{
    private static final int PAGE_SIZE = 10;

    private final PostJpaRepository postJpaRepository;
    private final PostRedisService postRedisService;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    private final Random random = new Random();

    @Transactional
    public void createPost(int userId, CreatePostRequest request){

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
                .userId(userId)
//                .nickname("")
                .content(request.content())
                .location(location)
//                .address("")
                .build();

        postJpaRepository.save(post);
        postRedisService.savePostToRedis(post);
    }

    @Transactional
    public void deletePost(int userId, int postId){
        Post post = postJpaRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(PostErrorCode.POST_NOTFOUND));

        if(post.getUserId() != userId) throw new PostForbiddenException(PostErrorCode.POST_FORBIDDEN);

        postJpaRepository.delete(post);
        postRedisService.deletePostFromRedis(postId);
    }

    public List<PostPointDto> getPointList(double latitude, double longitude, int radius){
        return null;
    }

    public List<PostDetailDto> getPostList(){
        return null;
    }
}