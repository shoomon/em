package com.ssafy.em.post_reaction.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostReactionRepository extends JpaRepository<PostReaction, Integer> {
    Optional<PostReaction> findByUserIdAndPostId(int userId, int postId);
}
