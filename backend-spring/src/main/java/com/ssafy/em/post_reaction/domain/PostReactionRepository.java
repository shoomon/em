package com.ssafy.em.post_reaction.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostReactionRepository extends JpaRepository<PostReaction, Integer> {
    Optional<PostReaction> findByUserIdAndPostId(int userId, int postId);
    @Query("SELECT pr.emotion.name, COUNT(pr) " +
            "FROM PostReaction pr " +
            "WHERE pr.post.id = :postId AND pr.emotion.name in ('JOY', 'SADNESS', 'ANGER', 'SURPRISE', 'TRUST')" +
            "GROUP BY pr.emotion.name")
    List<Object[]> countReactionsByEmotionName(@Param("postId") int postId);

    @Modifying
    @Query("DELETE FROM PostReaction pr " +
    "WHERE pr.post.id = :postId")
    void deleteByPostId(@Param("postId") int postId);
}
