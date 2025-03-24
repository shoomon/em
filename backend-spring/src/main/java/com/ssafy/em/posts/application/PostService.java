package com.ssafy.em.posts.application;

import static com.ssafy.em.posts.application.PostRedisService.POST_GEO_KEY;
import static com.ssafy.em.posts.application.PostRedisService.POST_KEY;
import static com.ssafy.em.posts.exception.PostException.PostNotFoundException;
import static com.ssafy.em.posts.exception.PostException.PostForbiddenException;


import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.repository.PostJpaRepository;
import com.ssafy.em.posts.dto.PostDetailDto;
import com.ssafy.em.posts.dto.PostPointDto;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import com.ssafy.em.posts.exception.PostErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.data.geo.Circle;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.GeoResult;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.domain.geo.Metrics;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostService{
    private final PostJpaRepository postJpaRepository;
    private final PostRedisService postRedisService;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    private final Random random = new Random();
    private final RedisTemplate<Object, Object> redisTemplate;

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

    public List<PostPointDto> getPointList(
            double longitude,
            double latitude,
            int radius
    ){
        List<PostPointDto> result = new ArrayList<>();

        Circle area = new Circle(
                new org.springframework.data.geo.Point(longitude,latitude),
                new Distance(radius, Metrics.METERS)
        );
        GeoResults<RedisGeoCommands.GeoLocation<Object>> geoResults = redisTemplate
                .opsForGeo().radius(POST_GEO_KEY, area);

        for(GeoResult<RedisGeoCommands.GeoLocation<Object>> geoResult : geoResults){
            String postId = geoResult.getContent().getName().toString();
            String redisKey = POST_KEY + postId;

            if(redisTemplate.hasKey(redisKey)){
                org.springframework.data.geo.Point point = geoResult.getContent().getPoint();
                result.add(
                        new PostPointDto(
                                Integer.parseInt(postId),
                                point.getX(),
                                point.getY()
                        )
                );
            }else{
                redisTemplate.opsForGeo().remove(POST_GEO_KEY, postId);
            }
        }
        return result;
    }

    public List<PostDetailDto> getPostList(){
        return null;
    }
}