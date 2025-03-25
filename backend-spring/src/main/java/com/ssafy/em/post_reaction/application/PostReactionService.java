package com.ssafy.em.post_reaction.application;

import com.ssafy.em.post_reaction.domain.PostReaction;
import com.ssafy.em.post_reaction.domain.PostReactionRepository;
import com.ssafy.em.post_reaction.dto.request.PostReactionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostReactionService {

    private final PostReactionRepository postReactionRepository;

    @Transactional
    public void toggleReaction(int userId, int postId, PostReactionRequest postReactionRequest) {
        Optional<PostReaction> optionalPostReaction = postReactionRepository.findByUserIdAndPostId(userId, postId);
        int emotionId = postReactionRequest.emotionId();
        if (optionalPostReaction.isPresent()) {
            PostReaction postReaction = optionalPostReaction.get();
            if (postReaction.isSameEmotion(emotionId)) {
                postReactionRepository.delete(postReaction);
            } else {
                postReaction.updateEmotion(emotionId);
            }
        } else {
            PostReaction postReaction = PostReaction.builder()
                    .userId(userId)
                    .postId(postId)
                    .emotionId(emotionId)
                    .build();
            postReactionRepository.save(postReaction);
        }
    }

}
