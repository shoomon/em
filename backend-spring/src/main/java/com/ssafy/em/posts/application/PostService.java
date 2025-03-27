package com.ssafy.em.posts.application;

import static com.ssafy.em.posts.exception.PostException.PostNotFoundException;
import static com.ssafy.em.posts.exception.PostException.PostForbiddenException;
import static com.ssafy.em.posts.util.PostConstant.PAGE_SIZE;
import static com.ssafy.em.posts.util.PostConstant.RADIUS;


import com.ssafy.em.emotion.dto.EmotionInfo;
import com.ssafy.em.emotion.dto.ReactionEmotions;
import com.ssafy.em.post_reaction.domain.PostReaction;
import com.ssafy.em.post_reaction.domain.PostReactionRepository;
import com.ssafy.em.post_reaction.exception.PostReactionErrorCode;
import com.ssafy.em.post_reaction.exception.PostReactionException;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.repository.PostJpaRepository;
import com.ssafy.em.posts.dto.LastReadDto;
import com.ssafy.em.posts.dto.PostCursorDto;
import com.ssafy.em.posts.dto.PostDetailDto;
import com.ssafy.em.posts.dto.PostPointDto;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import com.ssafy.em.posts.dto.response.GetCalendarListResponse;
import com.ssafy.em.posts.dto.response.GetPostListResponse;
import com.ssafy.em.posts.exception.PostErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.YearMonth;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostService{
    private final PostJpaRepository postJpaRepository;
    private final PostReactionRepository postReactionRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    private final Random random = new Random();
    private final RedisTemplate<String, Object> redisTemplate;

    //동물 임시 배열
    private static final List<String> ANIMALS = List.of(
            "고양이", "강아지", "팬더", "코끼리", "호랑이", "토끼", "곰", "다람쥐", "여우", "늑대", "햄스터"
    );

    @Transactional
    public void createPost(int userId, CreatePostRequest request){

        //todo: user에서 동물 프로필 레포지토리 가져오기
//        List<animalProfiles> animalProfilesList = animalProfilesJpaRepository
//                .findAllByEmotionId(request.emotionId());
//
//        int randomIndex = random.nextInt(animalProfilesList.size());
//        int animalProfileId = animalProfilesList.get(randomIndex).getId();
        //todo: 감정에 대한 형용사 조회해와서 닉네임 생성
        Random random = new Random();
        String randomAnimal = ANIMALS.get(random.nextInt(ANIMALS.size()));

        Point location = geometryFactory
                .createPoint(new Coordinate(request.longitude(), request.latitude()));
        location.setSRID(4326);

        Post post = Post.builder()
                .animalProfileId(0)
                .userId(userId)
                .nickname(request.emotion()+randomAnimal)
                .content(request.content())
                .location(location)
                .address(request.address())
                .build();

        postJpaRepository.save(post);
    }

    @Transactional
    public void deletePost(int userId, int postId){
        Post post = postJpaRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(PostErrorCode.POST_NOTFOUND));

        if(post.getUserId() != userId) throw new PostForbiddenException(PostErrorCode.POST_FORBIDDEN);

        postJpaRepository.delete(post);
    }


    //todo: MyPage -> getMyPostList
    public List<PostDetailDto> getMyPostList(){
//        List<Post> postList = postQueryDslRepository.getMyPostList();
        return null;
    }

    public List<PostPointDto> getPointList(
            double longitude,
            double latitude,
            int radius
    ){
        return postJpaRepository.getPointList(longitude, latitude, radius);
    }

    public GetPostListResponse getPostList(
            double longitude,
            double latitude,
            Integer radius,
            Integer cursorId,
            Double cursorDist,
            Integer cursorEmoCnt,
            String sortBy
    ) {
        PostCursorDto cursor = PostCursorDto.from(cursorId, cursorDist, cursorEmoCnt, sortBy);

        List<Post> postList = postJpaRepository.getPostList(
                longitude,
                latitude,
                radius,
                cursor,
                sortBy,
                PAGE_SIZE
        );

        if (postList.isEmpty()) {
            return new GetPostListResponse(Collections.emptyList(),
                    new LastReadDto(0,0,Double.parseDouble(RADIUS), false)
            );
        }

        List<PostDetailDto> dtoList = postList.stream()
                .map(post -> {
                   ReactionEmotions emotionCounts = getEmotionCounts(post.getId());
                    return PostDetailDto.from(post, emotionCounts);
                })
                .toList();

        boolean hasNext = dtoList.size() == PAGE_SIZE+1;

        if (hasNext) {
            dtoList = dtoList.subList(0, PAGE_SIZE);
        }

        PostDetailDto lastPost = dtoList.get(dtoList.size() - 1);

        Integer lastCnt=null;
        Double lastDist=null;

        switch (sortBy) {
            case "distance" -> {
                lastDist = calculateDistance(latitude, longitude, lastPost.latitude(), lastPost.longitude());
            }
            case "popular" -> {
                lastCnt = lastPost.emotionInfo().emotionCounts().sum();
            }
        }

        return new GetPostListResponse(dtoList,
                new LastReadDto(dtoList.get(dtoList.size()-1).postId(),lastCnt, lastDist, hasNext)
        );
    }

    //todo: 거리순 sorting
    public GetPostListResponse getClusteredPostList(
            double lng1,
            double lat1,
            double lng2,
            double lat2,
            Integer cursorId,
            Double cursorDist,
            Integer cursorEmoCnt,
            String sortBy,
            int userId
    ){
        PostCursorDto cursor = PostCursorDto.from(cursorId, cursorDist, cursorEmoCnt, sortBy);

        List<PostDetailDto> dtoList = postJpaRepository.getClusteredPostList(
                lng1,
                lat1,
                lng2,
                lat2,
                cursor,
                sortBy,
                PAGE_SIZE
        );

        boolean hasNext = dtoList.size() == PAGE_SIZE+1;

        if (hasNext) {
            dtoList = dtoList.subList(0, PAGE_SIZE);
        }

        List<PostDetailDto> result =  dtoList.stream()
                .map(dto -> {
                    ReactionEmotions emotionCounts = this.getEmotionCounts(dto.postId());
                    PostReaction postReaction = postReactionRepository.findByUserIdAndPostId(userId, dto.postId())
                            .orElseThrow(()-> new PostReactionException.PostReactionNotFoundException(PostReactionErrorCode.NOT_FOUND));
                    EmotionInfo emotionInfo = new EmotionInfo(
                            emotionCounts,
                            postReaction.getEmotion().getName()
                    );
                    return new PostDetailDto(
                            dto.postId(),
                            dto.userId(),
                            dto.nickname(),
                            null,
                            dto.address(),
                            dto.content(),
                            dto.longitude(),
                            dto.latitude(),
                            emotionInfo,
                            dto.createdAt()
                    );
                }
                )
                .toList();

        PostDetailDto lastPost = result.get(result.size() - 1);

        Integer lastCnt=null;
        Double lastDist=null;

//        switch (sortBy) {
//            case "distance" -> {
//                lastDist = calculateDistance(latitude, longitude, lastPost.latitude(), lastPost.longitude());
//            }
//            case "reaction" -> {
//                lastCnt = lastPost.emotionCountList().values().stream()
//                        .mapToInt(Long::intValue)
//                        .sum();
//            }
//        }

        return new GetPostListResponse(result, null);
    }

    public GetCalendarListResponse getCalendarPostList(int userId, YearMonth yearMonth) {
        return new GetCalendarListResponse(
                postJpaRepository.getCalendarPostList(userId, yearMonth)
        );
    }

    private ReactionEmotions getEmotionCounts(int postId) {
        List<Object[]> rawCounts = postReactionRepository.countReactionsByEmotionName(postId);

        Map<String, Long> emotionCountMap = new HashMap<>();
        int sum = 0;
        for (Object[] row : rawCounts) {
            String emotionName = (String) row[0];
            Long count = (Long) row[1];
            sum += count.intValue();
            emotionCountMap.put(emotionName.toLowerCase(), count); // 감정 이름 소문자로
        }

        return new ReactionEmotions(
                emotionCountMap.getOrDefault("joy", 0L).intValue(),
                emotionCountMap.getOrDefault("sadness", 0L).intValue(),
                emotionCountMap.getOrDefault("anger", 0L).intValue(),
                emotionCountMap.getOrDefault("surprise", 0L).intValue(),
                emotionCountMap.getOrDefault("trust", 0L).intValue(),
                sum

        );
    }

    private Double calculateDistance(double lat1, double lng1, double lat2, double lng2) {
            final int R = 6371000; // 지구 반지름 (미터 단위)

            double dLat = Math.toRadians(lat2 - lat1);
            double dLon = Math.toRadians(lng2 - lng1);

            double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                    + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                    * Math.sin(dLon / 2) * Math.sin(dLon / 2);

            double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c; // 거리 (미터 단위)
    }

}
