package com.ssafy.em.posts.application;

import static com.ssafy.em.posts.application.PostRedisService.POST_GEO_KEY;
import static com.ssafy.em.posts.application.PostRedisService.POST_KEY;
import static com.ssafy.em.posts.exception.PostException.PostNotFoundException;
import static com.ssafy.em.posts.exception.PostException.PostForbiddenException;
import static com.ssafy.em.posts.util.PostConstant.PAGE_SIZE;


import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.repository.PostJpaRepository;
import com.ssafy.em.posts.domain.repository.PostQueryDslRepository;
import com.ssafy.em.posts.domain.repository.PostReactionQueryDslRepository;
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
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostService{
    private final PostJpaRepository postJpaRepository;
    private final PostReactionQueryDslRepository postReactionQueryDslRepository;
    private final PostRedisService postRedisService;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    private final Random random = new Random();
    private final RedisTemplate<Object, Object> redisTemplate;
    private final PostQueryDslRepository postQueryDslRepository;

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
            Integer postId = Integer.parseInt(
                    geoResult.getContent().getName().toString()
            );
            String redisKey = POST_KEY + postId;

            if(redisTemplate.hasKey(redisKey)){
                org.springframework.data.geo.Point point = geoResult.getContent().getPoint();
                result.add(
                        new PostPointDto(
                                postId,
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

    public List<PostDetailDto> getPostList(
            double longitude,
            double latitude,
            int radius,
            int lastRead,
            String sortBy
    ) {
        List<Post> posts = new ArrayList<>();

        Circle area = new Circle(
                new org.springframework.data.geo.Point(longitude, latitude),
                new Distance(radius, Metrics.METERS)
        );
        GeoResults<RedisGeoCommands.GeoLocation<Object>> geoResults = redisTemplate
                .opsForGeo().radius(POST_GEO_KEY, area);

        for (GeoResult<RedisGeoCommands.GeoLocation<Object>> geoResult : geoResults) {
            int postId = Integer.parseInt(geoResult.getContent().getName().toString());
            String redisKey = POST_KEY + postId;

            if (!redisTemplate.hasKey(redisKey)) {
                redisTemplate.opsForGeo().remove(POST_GEO_KEY, postId);
                continue;
            }

            Post post = (Post) redisTemplate.opsForValue().get(redisKey);
            posts.add(post);
        }

        posts = sortPosts(posts, sortBy, longitude, latitude);

        //fixme: 레디스에서 페이지네이션 하려면
        // 조회 시마다 반경 내 모든 게시글 가져오고
        // 정렬 후 다시 필터링해야함
        if (lastRead != 0) {
            posts = posts.stream()
                    .filter(p -> compareWithCursor(p,longitude, latitude, lastRead,sortBy))
                    .toList();
        }

        //fixme: 공감 수나 거리가 같은 게시글은 누락됨.
        List<Post> page = posts.stream()
                .limit(PAGE_SIZE)
                .toList();

        return page.stream()
                .map(post -> new PostDetailDto(
                        post.getId(),
                        post.getUserId(),
                        post.getNickname(),
                        null, // imageUrl 추후 추가
                        post.getContent(),
                        post.getLocation(),
                        getEmotionCount(post.getId()),
                        post.getCreatedAt()
                ))
                .toList();
    }


    //todo: MyPage -> getMyPostList
    public List<PostDetailDto> getMyPostList(){
//        List<Post> postList = postQueryDslRepository.getMyPostList();
        return null;
    }

    private List<Post> sortPosts(List<Post> posts, String sortBy, double lon, double lat) {

        List<Post> sorted;

        switch (sortBy) {
            case "popular":
                sorted = posts.stream()
                        .sorted(Comparator.comparing(Post::getReactionCount).reversed())
                        .toList();
                break;

            case "distance":
                Point center = geometryFactory.createPoint(new Coordinate(lon, lat));
                sorted = posts.stream()
                        .sorted(Comparator.comparingDouble(p -> p.getLocation().distance(center)))
                        .toList();
                break;

            case "latest":
            default:
                sorted = posts.stream()
                        .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
                        .toList();
                break;
        }

        return sorted;
    }

    private boolean compareWithCursor(Post post, double lon, double lat, int lastRead, String sortBy) {
        switch (sortBy.toLowerCase()) {
            case "latest":
                return post.getId() < lastRead; // Id를 기준으로

            case "popular":
                return post.getReactionCount() < lastRead; //Count를 기준으로

            case "distance":
                Point center = geometryFactory.createPoint(new Coordinate(lon, lat));
                return post.getLocation().distance(center) > lastRead; //마지막 조회 거리를 기준으로

            default:
                return post.getId() < lastRead;
        }
    }

    private Map<String, Long> getEmotionCount(int postId){
        return postReactionQueryDslRepository.getEmotionCount(postId);
    }
}