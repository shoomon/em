package com.ssafy.em.posts.presentation;

import com.ssafy.em.posts.application.PostService;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
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
@RequestMapping("/post")
public class PostController {
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
}
