package com.ssafy.em.post_reaction.domain.repository;

import com.ssafy.em.post_reaction.domain.entity.PostReaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;

@Repository
public interface PostReactionJpaRepository extends JpaRepository<PostReaction, Integer>, PostReactionCustomRepository {
    Optional<PostReaction> findByUserIdAndPostId(int userId, int postId);
}
