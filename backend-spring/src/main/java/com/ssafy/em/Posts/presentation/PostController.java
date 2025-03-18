package com.ssafy.em.Posts.presentation;

import com.ssafy.em.Posts.application.PostService;
import com.ssafy.em.Posts.dto.request.CreatePostRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<Void> createPost(@RequestBody @Valid CreatePostRequest request){
        postService.createPost(request);
        return ResponseEntity.ok().build();
    }
}
