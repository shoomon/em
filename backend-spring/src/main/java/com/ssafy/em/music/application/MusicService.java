package com.ssafy.em.music.application;

import com.neovisionaries.i18n.CountryCode;
import com.ssafy.em.common.config.SpotifyConfig;
import com.ssafy.em.music.dto.response.SpotifySearchResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.Image;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchTracksRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class MusicService {

    private static final int LIMIT = 50;

    private final SpotifyApi spotifyApi;
    private final SpotifyConfig spotifyConfig;

    public MusicService(SpotifyConfig spotifyConfig) {
        // SpotifyConfig에서 이미 생성한 SpotifyApi 인스턴스를 재사용합니다.
        this.spotifyConfig = spotifyConfig;
        this.spotifyApi = spotifyConfig.getSpotifyApi();
        // 서비스 시작 시 access token을 갱신합니다.
//        spotifyConfig.accessToken();
    }

    public List<SpotifySearchResponse> search(String trackName) {

        spotifyConfig.accessToken();

        List <SpotifySearchResponse> musicList = new ArrayList<>();

        // 입력값이 없으면 기본 검색어 사용
        if (trackName == null || trackName.trim().isEmpty()) {
            trackName = "a";
        }

        log.info("Searching for music for " + trackName);

        try {
            SearchTracksRequest searchTrackRequest = spotifyApi.searchTracks(trackName)
                    .market(CountryCode.KR)
                    .limit(LIMIT)
                    .build();

            Paging<Track> searchResult = searchTrackRequest.execute();
            Track[] tracks = searchResult.getItems();

            // popularity 기준 내림차순 정렬 (값이 높을수록 인기)
            List<Track> sortedTracks = Arrays.stream(tracks)
//                    .sorted(Comparator.comparingInt(Track::getPopularity).reversed())
                    .toList();

            for (Track track : sortedTracks) {
                String title = track.getName();
                AlbumSimplified album = track.getAlbum();
                ArtistSimplified[] artists = album.getArtists();
                String artistName = (artists != null && artists.length > 0) ? artists[0].getName() : "Unknown Artist";

                // 이미지 배열에서 3번째 이미지(높이 64)를 직접 선택
                String imageUrl = "NO_IMAGE";
                Image[] images = album.getImages();
                if (images != null && images.length >= 3) {
                    imageUrl = images[2].getUrl();
                }

                // album의 externalUrls에서 Spotify URL 추출
                String albumExternalUrl = "NO_URL";
                if (album.getExternalUrls() != null && album.getExternalUrls().getExternalUrls() != null) {
                    albumExternalUrl = album.getExternalUrls().getExternalUrls().get("spotify");
                }

                musicList.add(SpotifySearchResponse.of(artistName, title, albumExternalUrl, imageUrl));
            }

        } catch (IOException | SpotifyWebApiException | org.apache.hc.core5.http.ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return musicList;
    }

}
