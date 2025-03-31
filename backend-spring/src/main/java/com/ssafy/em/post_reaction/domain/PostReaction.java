package com.ssafy.em.post_reaction.domain;

import com.ssafy.em.emotion.domain.entity.Emotion;
import com.ssafy.em.posts.domain.entity.Post;
import com.ssafy.em.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "post_reactions")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class PostReaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", updatable = false)
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", updatable = false)
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id", updatable = true)
    private Emotion emotion;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public PostReaction(User user, Post post, Emotion emotion) {
        this.user = user;
        this.post = post;
        this.emotion = emotion;
    }

    public void updateEmotion(Emotion emotion) {
        this.emotion = emotion;
    }

    public boolean isSameEmotion(Emotion otherEmotion) {
        return this.emotion == otherEmotion;
    }
}
