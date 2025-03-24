package com.ssafy.em.posts.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "emotions")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Emotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @Column
    String name;

    @Column(name = "hex_color")
    String hexColor;

    @Column
    LocalDateTime created_at;

    @Builder
    public Emotion(String name, String hexColor) {
        this.name = name;
        this.hexColor = hexColor;
    }
}
