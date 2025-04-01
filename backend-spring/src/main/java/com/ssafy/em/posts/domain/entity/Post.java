package com.ssafy.em.posts.domain.entity;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.ssafy.em.animal.domain.entity.AnimalProfile;
import com.ssafy.em.music.domain.entity.Music;
import com.ssafy.em.user.domain.entity.User;
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
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.SqlTypes;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.CLASS,
        include = JsonTypeInfo.As .PROPERTY,
        property = "@class"
)

@Entity
@Table(name = "posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_profile_id", nullable = false)
    private AnimalProfile animalProfile;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "music_id")
    private Music music;

    @Column(name = "anonymous_nickname", length = 50, nullable = false)
    private String nickname;

    @Column(length = 1500)
    private String content;

    @Column(name = "emotion")
    private String emotion;

    @JdbcTypeCode(SqlTypes.GEOMETRY)
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    @Column
    private String address;

    @Column(name = "reaction_count", nullable = false)
    private int reactionCount;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Post(
            AnimalProfile animalProfile,
            Music music,
            User user,
            String nickname,
            String content,
            String emotion,
            Point location,
            String address
    ){
        this.animalProfile = animalProfile;
        this.music = music;
        this.user = user;
        this.nickname = nickname;
        this.content = content;
        this.emotion = emotion;
        this.location = location;
        this.address = address;
    }

    public void increaseReactionCount() {
        this.reactionCount++;
    }

    public void decreaseReactionCount() {
        if (this.reactionCount > 0) {
            this.reactionCount--;
        }
    }
}
