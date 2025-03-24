package com.ssafy.em.posts;

import com.ssafy.em.posts.application.PostService;
import com.ssafy.em.posts.dto.request.CreatePostRequest;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
public class PostTest {
    PostService postService;

    @Test
    @DisplayName("게시글 생성 테스트")
    void createPost(){
        CreatePostRequest req = new CreatePostRequest(
                1,
                "게시글 생성 테스트1",
                37.5665,
                126.9780
        );

        int userId = 1;

        postService.createPost(userId, req);
    }
}
