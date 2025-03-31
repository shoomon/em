package com.ssafy.em.posts.application;

import com.ssafy.em.animal.domain.AnimalProfileRepository;
import com.ssafy.em.animal.domain.AnimalRepository;
import com.ssafy.em.animal.domain.entity.Animal;
import com.ssafy.em.animal.domain.entity.AnimalProfile;
import com.ssafy.em.animal.exception.AnimalProfileErrorCode;
import com.ssafy.em.animal.exception.AnimalProfileException;
import com.ssafy.em.emotion.domain.EmotionRepository;
import com.ssafy.em.emotion.domain.entity.Emotion;
import com.ssafy.em.emotion.dto.EmotionInfo;
import com.ssafy.em.emotion.dto.ReactionEmotions;
import com.ssafy.em.emotion.exception.EmotionErrorCode;
import com.ssafy.em.emotion.exception.EmotionException;
import com.ssafy.em.post_reaction.domain.PostReaction;
import com.ssafy.em.post_reaction.domain.PostReactionRepository;
import com.ssafy.em.post_reaction.exception.PostReactionErrorCode;
import com.ssafy.em.post_reaction.exception.PostReactionException;
import com.ssafy.em.posts.domain.entity.NicknameGenerator;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.repository.PostJpaRepository;
import com.ssafy.em.posts.dto.LastReadDto;
import com.ssafy.em.posts.dto.PostCursorDto;
import com.ssafy.em.posts.dto.PostDetailDto;
import com.ssafy.em.posts.dto.PostPointDto;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import com.ssafy.em.posts.dto.response.GetCalendarListResponse;
import com.ssafy.em.posts.dto.response.GetMonthlyEmotionResponse;
import com.ssafy.em.posts.dto.response.GetPostListResponse;
import com.ssafy.em.posts.exception.PostErrorCode;
import com.ssafy.em.user.domain.UserRepository;
import com.ssafy.em.user.domain.entity.User;
import com.ssafy.em.user.exception.UserErrorCode;
import com.ssafy.em.user.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.em.posts.exception.PostException.PostForbiddenException;
import static com.ssafy.em.posts.exception.PostException.PostNotFoundException;
import static com.ssafy.em.posts.util.PostConstant.PAGE_SIZE;
import static com.ssafy.em.posts.util.PostConstant.RADIUS;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class PostService{
    private final PostJpaRepository postJpaRepository;
    private final PostReactionRepository postReactionRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();
    private final UserRepository userRepository;
    private final EmotionRepository emotionRepository;
    private final AnimalRepository animalRepository;
    private final AnimalProfileRepository animalProfileRepository;


    @Transactional
    public void createPost(int userId, CreatePostRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException.UserNotFoundException(UserErrorCode.NOT_FOUND));

        Animal randomAnimal = animalRepository.findRandomAnimal();
        Emotion emotion = emotionRepository.findByName(request.emotion())
                .orElseThrow(() -> new EmotionException.EmotionNotFoundException(EmotionErrorCode.NOT_FOUND));

        AnimalProfile animalProfile = animalProfileRepository.findByAnimal_IdAndEmotion_Id(randomAnimal.getId(), emotion.getId())
                .orElseThrow(() -> new AnimalProfileException.AnimalProfileNotFoundException(AnimalProfileErrorCode.NOT_FOUND));

        String nickname = NicknameGenerator.getNickname(emotion.getName(), randomAnimal.getKorName());

        Point location = geometryFactory
                .createPoint(new Coordinate(request.longitude(), request.latitude()));
        location.setSRID(4326);

        Post post = Post.builder()
                .animalProfile(animalProfile)
                .user(user)
                .nickname(nickname)
                .content(request.content())
                .emotion(request.emotion())
                .location(location)
                .address(request.address())
                .build();

        log.info(request.emotion()+" "+post.getEmotion());

        postJpaRepository.save(post);
    }

    @Transactional
    public void deletePost(int userId, int postId){
        Post post = postJpaRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(PostErrorCode.POST_NOTFOUND));

        if(post.getUser().getId() != userId) throw new PostForbiddenException(PostErrorCode.POST_FORBIDDEN);

        postJpaRepository.delete(post);
    }


    //todo: MyPage -> getMyPostList
    public List<PostDetailDto> getMyPostList(){
//        List<Post> postList = postQueryDslRepository.getMyPostList();
        return null;
    }

    public PostDetailDto getPost(int userId, int postId){
        ReactionEmotions emotionCounts = getEmotionCounts(postId);
        Post post = postJpaRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(PostErrorCode.POST_NOTFOUND));
        Optional<PostReaction> postReactionOptional = postReactionRepository.findByUserIdAndPostId(userId, post.getId());
        if (postReactionOptional.isPresent()) {
            PostReaction postReaction = postReactionOptional.get();
            EmotionInfo emotionInfo = new EmotionInfo(emotionCounts, postReaction.getEmotion().getName());
            return PostDetailDto.from(userId, post, emotionInfo);
        }
        return PostDetailDto.from(userId, post, emotionCounts);
    }

    public List<PostPointDto> getPointList(
            double longitude,
            double latitude,
            int radius
    ){
        return postJpaRepository.getPointList(longitude, latitude, radius);
    }

    public GetPostListResponse getPostList(
            int userId,
            double longitude,
            double latitude,
            Integer radius,
            Integer cursorId,
            Double cursorDist,
            Integer cursorEmoCnt,
            String sortBy,
            Double lng1,
            Double lat1,
            Double lng2,
            Double lat2
    ) {
        PostCursorDto cursor = PostCursorDto.from(cursorId, cursorDist, cursorEmoCnt, sortBy);

        List<Post> postList = postJpaRepository.getPostList(
                longitude,
                latitude,
                radius,
                cursor,
                sortBy,
                PAGE_SIZE,
                lng1,
                lat1,
                lng2,
                lat2
        );

        if (postList.isEmpty()) {
            return new GetPostListResponse(Collections.emptyList(),
                    new LastReadDto(0,0,Double.parseDouble(RADIUS), false)
            );
        }

        boolean hasNext = postList.size() == PAGE_SIZE+1;

        if (hasNext) {
            postList = postList.subList(0, PAGE_SIZE);
        }

        List<PostDetailDto> dtoList = postList.stream()
                .map(post -> {
                   ReactionEmotions emotionCounts = getEmotionCounts(post.getId());
                   Optional<PostReaction> postReactionOptional = postReactionRepository.findByUserIdAndPostId(userId, post.getId());
                   if (postReactionOptional.isPresent()) {
                       PostReaction postReaction = postReactionOptional.get();
                       EmotionInfo emotionInfo = new EmotionInfo(emotionCounts, postReaction.getEmotion().getName());
                       return PostDetailDto.from(userId, post, emotionInfo);
                   }
                    return PostDetailDto.from(userId, post, emotionCounts);
                })
                .toList();

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

    public GetCalendarListResponse getCalendarEmotionList(int userId, YearMonth yearMonth) {
        List<Object[]> list = postJpaRepository.getCalendarEmotionList(userId, yearMonth);

        if(list.isEmpty()){
            return new GetCalendarListResponse(null);
        }

        Map<Integer, String> result = list.stream()
                                .collect(Collectors.toMap(
                                        row -> ((Number)row[0]).intValue(),
                                        row -> ((String)row[1])
                                ));

        return new GetCalendarListResponse(result);
    }

    public GetPostListResponse getDatePostList(
            int userId,
            LocalDate date,
            int lastRead
    ){
        List<Post> postList = postJpaRepository.getDatePostList(
                userId,
                date,
                lastRead,
                PAGE_SIZE
        );

        if (postList.isEmpty()) {
            return new GetPostListResponse(Collections.emptyList(),
                    new LastReadDto(0,null,null, false)
            );
        }

        boolean hasNext = postList.size() == PAGE_SIZE+1;

        if(hasNext) {
            postList.subList(0, PAGE_SIZE);
        }

        List<PostDetailDto> dtoList = postList.stream()
                .map(post -> {
                    ReactionEmotions emotionCounts = getEmotionCounts(post.getId());
                    Optional<PostReaction> postReactionOptional = postReactionRepository.findByUserIdAndPostId(userId, post.getId());
                    if (postReactionOptional.isPresent()) {
                        PostReaction postReaction = postReactionOptional.get();
                        EmotionInfo emotionInfo = new EmotionInfo(emotionCounts, postReaction.getEmotion().getName());
                        return PostDetailDto.from(userId, post, emotionInfo);
                    }
                    return PostDetailDto.from(userId, post, emotionCounts);
                })
                .toList();

        return new GetPostListResponse(dtoList,
                new LastReadDto(dtoList.get(dtoList.size()-1).postId(),null, null, hasNext)
        );
    }

    public GetMonthlyEmotionResponse getMonthlyEmotionCount(int userId, YearMonth yearMonth) {
        List<Object[]> emotionCount = postJpaRepository.getMonthlyEmotionCount(userId, yearMonth);

        Map<Integer, String> emotions = getAllEmotion();

        Map<String, Integer> monthlyEmotionCount = emotionCount.stream()
                .collect(Collectors.toMap(
                        row -> (String)row[0],
                        row -> ((Number)row[1]).intValue()
                ));

        for(int emotion : emotions.keySet()){
            String emo = emotions.get(emotion);

            if(monthlyEmotionCount.containsKey(emo)) continue;

            monthlyEmotionCount.put(emo, 0);
        }
        return new GetMonthlyEmotionResponse(monthlyEmotionCount);
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

    private Map<Integer, String> getAllEmotion(){
        List<Emotion> emotionList = emotionRepository.findAll();

        return emotionList.stream()
                .collect(Collectors.toMap(Emotion::getId, Emotion::getName));
    }

    private Map<Integer, String> getAllProfileImage(){
        List<AnimalProfile> animalProfileList = animalProfileRepository.findAll();

        return animalProfileList.stream()
                .collect(Collectors.toMap(AnimalProfile::getId, AnimalProfile::getProfileImageUrl));
    }

}
