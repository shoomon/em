package com.ssafy.em.post_reaction.presentation;

import com.ssafy.em.common.annotation.LoginRequired;
import com.ssafy.em.post_reaction.application.PostReactionService;
import com.ssafy.em.post_reaction.dto.request.PostReactionRequest;
import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reactions")
@RequiredArgsConstructor
public class PostReactionController implements PostReactionControllerDocs {

    private final PostReactionService postReactionService;

    @PostMapping("/{postId}")
    public ResponseEntity<Null> togglePostReaction(@PathVariable int postId, @RequestBody PostReactionRequest postReactionRequest, @LoginRequired int userId) {
        postReactionService.toggleReaction(userId, postId, postReactionRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
}
