package com.ssafy.em.animal.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "animals")
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Animal {

    private static final boolean DEFAULT_ACTIVE = true;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 30)
    private String name;

    @Column(name = "kor_name", nullable = false, length = 30)
    private String korName;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    @Builder
    public Animal(String name, String korName) {
        this.name = name;
        this.korName = korName;
        this.isActive = DEFAULT_ACTIVE;
    }
}
