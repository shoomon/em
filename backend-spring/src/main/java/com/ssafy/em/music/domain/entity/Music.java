package com.ssafy.em.music.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    @Column(name = "artist_name", nullable = false)
    private String artistName;

    @Column(nullable = false)
    private String title;

    @Column(name = "album_image_url", nullable = false, columnDefinition = "text")
    private String albumImageUrl;

    @Column(name = "spotify_track_url", nullable = false, columnDefinition = "text")
    private String spotifyTrackUrl;

    @Column(name = "music_count", nullable = false, columnDefinition = "integer default 1")
    private int musicCount;

    @Builder
    public Music(String artistName, String title, String albumImageUrl, String spotifyTrackUrl) {
        this.artistName = artistName;
        this.title = title;
        this.albumImageUrl = albumImageUrl;
        this.spotifyTrackUrl = spotifyTrackUrl;
        this.musicCount = 1;
    }

    public void increaseMusicCount() {
        this.musicCount++;
    }

    public void decreaseMusicCount() {
        this.musicCount--;
    }
}
