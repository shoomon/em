package com.ssafy.em.Posts.presentation;

import com.ssafy.em.Posts.application.PostService;
import com.ssafy.em.Posts.dto.request.CreatePostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    public ResponseEntity<Void> createPost(CreatePostRequest request){
        return ResponseEntity.ok().build();
    }
}
