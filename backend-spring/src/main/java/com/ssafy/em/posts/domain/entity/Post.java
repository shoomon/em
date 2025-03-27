package com.ssafy.em.posts.domain.entity;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.ssafy.em.emotion.dto.ReactionEmotions;
import com.ssafy.em.posts.dto.PostDetailDto;
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
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.util.Map;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.CLASS,
        include = JsonTypeInfo.As.PROPERTY,
        property = "@class"
)

@Entity
@Table(name = "posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "animal_profile_id", nullable = false)
    private int animalProfileId;

    @Column(name = "anonymous_nickname", length = 50, nullable = false)
    private String nickname;

    @Column(length = 1500, nullable = false)
    private String content;

    @JdbcTypeCode(SqlTypes.GEOMETRY)
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point location;

    @Column
    private String address;

    @Column(name = "reaction_count", nullable = false)
    private int reactionCount;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public Post(
            int animalProfileId,
            int userId,
            String nickname,
            String content,
            Point location,
            String address
    ){
        this.animalProfileId = animalProfileId;
        this.userId = userId;
        this.nickname = nickname;
        this.content = content;
        this.location = location;
        this.address = address;
        this.createdAt = LocalDateTime.now();
    }

    public static PostDetailDto from(Post post, ReactionEmotions emotionCounts) {
        return new PostDetailDto(
                post.getId(),
                post.getUserId(),
                post.getNickname(),
                null,
                post.getAddress(),
                post.getContent(),
                post.getLocation().getX(),
                post.getLocation().getY(),
                emotionCounts,
                post.getCreatedAt()
        );
    }
}
