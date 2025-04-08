package com.ssafy.em.post_reaction.application;

import com.ssafy.em.emotion.domain.EmotionRepository;
import com.ssafy.em.emotion.domain.entity.Emotion;
import com.ssafy.em.emotion.exception.EmotionErrorCode;
import com.ssafy.em.post_reaction.domain.PostReaction;
import com.ssafy.em.post_reaction.domain.PostReactionRepository;
import com.ssafy.em.post_reaction.dto.request.PostReactionRequest;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.posts.domain.repository.PostJpaRepository;
import com.ssafy.em.posts.exception.PostErrorCode;
import com.ssafy.em.user.domain.UserRepository;
import com.ssafy.em.user.domain.entity.User;
import com.ssafy.em.user.exception.UserErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.ssafy.em.emotion.exception.EmotionException.EmotionNotFoundException;
import static com.ssafy.em.posts.exception.PostException.PostNotFoundException;
import static com.ssafy.em.user.exception.UserException.UserNotFoundException;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostReactionService {

    private final PostReactionRepository postReactionRepository;
    private final PostJpaRepository postJpaRepository;
    private final EmotionRepository emotionRepository;
    private final UserRepository userRepository;

    @Transactional
    public void toggleReaction(int userId, int postId, PostReactionRequest postReactionRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException(UserErrorCode.NOT_FOUND));
        Post post = postJpaRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException(PostErrorCode.POST_NOTFOUND));
        Optional<PostReaction> optionalPostReaction = postReactionRepository.findByUserIdAndPostId(userId, postId);
        String emotionName = postReactionRequest.emotionName();
        Emotion emotion = emotionRepository.findByName(emotionName)
                .orElseThrow(() -> new EmotionNotFoundException(EmotionErrorCode.NOT_FOUND));
        if (optionalPostReaction.isPresent()) {
            PostReaction postReaction = optionalPostReaction.get();
            if (postReaction.isSameEmotion(emotion)) {
                postReactionRepository.delete(postReaction);
                post.decreaseReactionCount();
            } else {
                postReaction.updateEmotion(emotion);
            }
        } else {
            PostReaction postReaction = PostReaction.builder()
                    .user(user)
                    .post(post)
                    .emotion(emotion)
                    .build();
            postReactionRepository.save(postReaction);
            post.increaseReactionCount();
        }
    }

}
