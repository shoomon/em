package com.ssafy.em.user.domain.entity;

import com.ssafy.em.auth.domain.entity.Provider;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false, length = 30)
    private Provider provider;  // 예: KAKAO

    @Column(name = "social_id", length = 100, unique = true)
    private String socialId;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "profile_image_url", length = 500, columnDefinition = "text")
    private String profileImageUrl;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Builder
    public User(Provider provider, String socialId, String username, String profileImageUrl) {
        this.provider = provider;
        this.socialId = socialId;
        this.username = username;
        this.profileImageUrl = profileImageUrl;
    }

    public User update(String username, String profileImageUrl) {
        this.username = username;
        this.profileImageUrl = profileImageUrl;
        return this;
    }

}

