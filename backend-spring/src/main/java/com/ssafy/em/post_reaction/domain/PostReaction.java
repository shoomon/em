package com.ssafy.em.post_reaction.domain;

import com.ssafy.em.emotion.domain.entity.Emotion;
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

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "post_id", nullable = false)
    private int postId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emotion_id", insertable = false, updatable = false)
    private Emotion emotion;

    @Column(name = "emotion_id", nullable = false)
    private int emotionId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public PostReaction(int userId, int postId, int emotionId) {
        this.userId = userId;
        this.postId = postId;
        this.emotionId = emotionId;
    }

    public void updateEmotion(int emotionId) {
        this.emotionId = emotionId;
    }

    public boolean isSameEmotion(int otherEmotionId) {
        return this.emotionId == otherEmotionId;
    }
}
