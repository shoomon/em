package com.ssafy.em.posts.domain.repository;

import com.ssafy.em.posts.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PostJpaRepository extends JpaRepository<Post, Integer>, PostCustomRepository {

    @Query("SELECT p FROM Post p " +
            "JOIN p.animalProfile ap " +
            "WHERE p.user.id = :userId " +
            "AND p.emotion = :emotion " +
            "AND p.createdAt >= :startOfMonth " +
            "AND p.createdAt < :startOfNextMonth " +
            "AND ap.isActive = true")
    List<Post> findPostsByUserIdAndEmotionAndMonth(
            @Param("userId") int userId,
            @Param("emotion") String emotion,
            @Param("startOfMonth") LocalDateTime startOfMonth,
            @Param("startOfNextMonth") LocalDateTime startOfNextMonth);
}
