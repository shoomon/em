package com.ssafy.em.posts.presentation;

import com.ssafy.em.posts.application.PostService;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.dto.PostDetailDto;
import com.ssafy.em.posts.dto.PostPointDto;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import com.ssafy.em.posts.dto.response.GetPointListResponse;
import com.ssafy.em.posts.dto.response.GetPostListResponse;
import com.ssafy.em.posts.util.PostConstant;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    //todo: 토큰에서 유저id 받기
    @PostMapping
    public ResponseEntity<Void> createPost(int userId, @RequestBody @Valid CreatePostRequest request){
        postService.createPost(userId, request);
        return ResponseEntity.ok().build();
    }

    //todo: 토큰에서 유저id 받기
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(int userId, @PathVariable int id){
        postService.deletePost(userId, id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/points")
    public ResponseEntity<GetPointListResponse> getPointList(
            @RequestParam(name = "lon") double longitude,
            @RequestParam(name = "lat") double latitude,
            @RequestParam(name = "rad", defaultValue = PostConstant.RADIUS, required = false) int radius
    ){
        List<PostPointDto> pointList =  postService.getPointList(longitude, latitude, radius);
        GetPointListResponse response = new GetPointListResponse(pointList);

        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<GetPostListResponse> getPostList(
            @RequestParam(name = "lon") double longitude,
            @RequestParam(name = "lat") double latitude,
            @RequestParam(name = "rad", defaultValue = PostConstant.RADIUS, required = false) int radius,
            @RequestParam(name = "last", required = false) int lastRead,
            @RequestParam(name = "sort", required = false) String sortBy
    ){
        List<PostDetailDto> postList = postService.getPostList(
                longitude,
                latitude,
                radius,
                lastRead,
                sortBy
        );
        GetPostListResponse response = new GetPostListResponse(postList, !postList.isEmpty());

        return ResponseEntity.ok(response);
    }
}
