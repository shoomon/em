package com.ssafy.em.Posts.domain.repository;

import com.ssafy.em.Posts.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostJpaRepository extends JpaRepository<Post, Integer> {
}
