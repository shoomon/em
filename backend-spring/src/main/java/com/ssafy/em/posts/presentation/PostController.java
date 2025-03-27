package com.ssafy.em.posts.presentation;

import com.ssafy.em.common.annotation.LoginRequired;
import com.ssafy.em.posts.application.PostService;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostCursorDto;
import com.ssafy.em.posts.dto.PostDetailDto;
import com.ssafy.em.posts.dto.PostPointDto;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import com.ssafy.em.posts.dto.response.GetCalendarListResponse;
import com.ssafy.em.posts.dto.response.GetPointListResponse;
import com.ssafy.em.posts.dto.response.GetPostListResponse;
import com.ssafy.em.posts.util.PostConstant;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<String> createPost(
            @LoginRequired int userId,
            @RequestBody @Valid CreatePostRequest request
    ){
        postService.createPost(userId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@LoginRequired int userId, @PathVariable int id){
        postService.deletePost(userId, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/points")
    public ResponseEntity<GetPointListResponse> getPointList(
            @RequestParam(name = "lng") double longitude,
            @RequestParam(name = "lat") double latitude,
            @RequestParam(name = "rad", defaultValue = PostConstant.RADIUS, required = false) int radius
    ){
        List<PostPointDto> pointList =  postService.getPointList(longitude, latitude, radius);
        GetPointListResponse response = new GetPointListResponse(pointList);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<GetPostListResponse> getPostList(
            @RequestParam(name = "lng") double longitude,
            @RequestParam(name = "lat") double latitude,
            @RequestParam(name = "rad", defaultValue = PostConstant.RADIUS, required = false) Integer radius,
            @RequestParam(name = "postId", required = false) Integer cursorId,
            @RequestParam(name = "dist", required = false) Double cursorDist,
            @RequestParam(name = "emoCnt", required = false) Integer cursorEmoCnt,
            @RequestParam(name = "sort", defaultValue = "latest", required = false) String sortBy
    ){
        PostCursorDto cursor = null;

        switch (sortBy) {
            case "popular" -> {
                if(cursorId == 0 && cursorEmoCnt == 0){
                    cursor = new PostCursorDto(Integer.MAX_VALUE, cursorDist, Integer.MAX_VALUE);
                }else{
                    cursor = new PostCursorDto(cursorId, cursorDist, cursorEmoCnt);
                }
                break;
            }
            case "distance" -> {
                if(cursorId == 0 && cursorDist == 0){
                    cursor = new PostCursorDto(Integer.MAX_VALUE, cursorDist, Integer.MAX_VALUE);
                }else{
                    cursor = new PostCursorDto(cursorId, cursorDist, cursorEmoCnt);
                }
                break;
            }
            default -> {
                if (cursorId != null && cursorId != 0) {
                    cursor = new PostCursorDto(cursorId, cursorDist, cursorEmoCnt);
                }
            }
        }

        GetPostListResponse response = postService.getPostList(
                longitude,
                latitude,
                radius,
                cursor,
                sortBy
        );

        return ResponseEntity.ok(response);
    }

    //todo: 거리순 sorting
    @GetMapping("/set")
    public ResponseEntity<GetPostListResponse> getClusteredPostList(
            @RequestParam(name = "lngMiin") double lng1,
            @RequestParam(name = "latMin") double lat1,
            @RequestParam(name = "lngMax") double lng2,
            @RequestParam(name = "latMax") double lat2,
            @RequestParam(name = "postId", required = false) Integer cursorId,
            @RequestParam(name = "dist", required = false) Double cursorDist,
            @RequestParam(name = "emoCnt", required = false) Integer cursorEmoCnt,
            @RequestParam(name = "sort", defaultValue = "latest", required = false) String sortBy
    ){
        PostCursorDto cursor = null;
        if (cursorId != null && cursorId != 0) {
            cursor = new PostCursorDto(cursorId, cursorDist, cursorEmoCnt);
        }

        GetPostListResponse response = postService.getClusteredPostList(
                lng1,
                lat1,
                lng2,
                lat2,
                cursor,
                sortBy
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/calendar")
    public ResponseEntity<GetCalendarListResponse> getCalendarPostList(
            @LoginRequired int userId,
            @RequestParam(name = "month")YearMonth yearMonth
    ){
        GetCalendarListResponse response = postService.getCalendarPostList(userId, yearMonth);
        return ResponseEntity.ok(response);
    }
}
