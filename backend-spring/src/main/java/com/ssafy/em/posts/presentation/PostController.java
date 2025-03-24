package com.ssafy.em.posts.presentation;

import com.ssafy.em.posts.application.PostService;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostDetailDto;
import com.ssafy.em.posts.dto.PostPointDto;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import com.ssafy.em.posts.dto.response.GetPointListResponse;
import com.ssafy.em.posts.dto.response.GetPostListResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private static final String RADIUS = "500";

    private final PostService postService;

    //todo: 토큰에서 유저id 받기
    @PostMapping
    public ResponseEntity<Void> createPost(int userId, @RequestBody @Valid CreatePostRequest request){
        postService.createPost(userId, request);
        return ResponseEntity.ok().build();
    }

    //todo: 토큰에서 유저id 받기
    @DeleteMapping
    public ResponseEntity<Void> deletePost(int userId, @RequestParam int id){
        postService.deletePost(userId, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/points")
    public ResponseEntity<GetPointListResponse> getPointList(
            @RequestParam(name = "lat") double latitude,
            @RequestParam(name = "lon") double longitude,
            @RequestParam(name = "rad", defaultValue = RADIUS, required = false) int radius
    ){
        List<PostPointDto> pointList =  postService.getPointList(latitude, longitude, radius);
        GetPointListResponse response = new GetPointListResponse(pointList);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<GetPostListResponse> getPostList(
            @RequestParam(name = "lat") double latitude,
            @RequestParam(name = "lon") double longitude,
            @RequestParam(name = "rad", defaultValue = RADIUS, required = false) int radius,
            @RequestParam(name = "last", required = false) int lastRead
    ){
        List<PostDetailDto> postList = postService.getPostList();
        GetPostListResponse response = new GetPostListResponse(postList);

        return ResponseEntity.ok(response);
    }
}
