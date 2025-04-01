package com.ssafy.em.music.domain.entity;

import com.ssafy.em.posts.domain.entity.Post;
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
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "music")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Music {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Post post;

    @Column(name = "artist_name", nullable = false)
    private String artistName;

    @Column(nullable = false)
    private String title;

    @Column(name = "album_image_url", nullable = false, columnDefinition = "text")
    private String albumImageUrl;

    @Column(name = "spotify_album_url", nullable = false, columnDefinition = "text")
    private String spotifyAlbumUrl;

    @Builder
    public Music(Post post, String artistName, String title, String albumImageUrl, String spotifyAlbumUrl) {
        this.post = post;
        this.artistName = artistName;
        this.title = title;
        this.albumImageUrl = albumImageUrl;
        this.spotifyAlbumUrl = spotifyAlbumUrl;
    }
}
