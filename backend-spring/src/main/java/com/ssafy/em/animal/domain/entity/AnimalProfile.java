package com.ssafy.em.animal.domain.entity;

import com.ssafy.em.emotion.domain.entity.Emotion;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "animal_profiles")
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class AnimalProfile {

    private static final boolean DEFAULT_ACTIVE = true;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "emotion_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Emotion emotion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Animal animal;

    @Column(name = "profile_image_url", nullable = false, columnDefinition = "text")
    private String profileImageUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    @Builder
    public AnimalProfile(Emotion emotion, Animal animal, String profileImageUrl) {
        this.emotion = emotion;
        this.animal = animal;
        this.profileImageUrl = profileImageUrl;
        this.isActive = DEFAULT_ACTIVE;
    }
}
