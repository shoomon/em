package com.ssafy.em.posts.domain.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_reactions")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PostReaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "post_id")
    private int postId;

    @Column(name = "emotion_id")
    private int emotionId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Builder
    public PostReaction(int userId, int postId, int emotionId) {
        this.userId = userId;
        this.postId = postId;
        this.emotionId = emotionId;
    }
}
