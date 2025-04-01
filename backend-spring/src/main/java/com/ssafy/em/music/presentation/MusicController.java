package com.ssafy.em.music.presentation;

import com.ssafy.em.common.annotation.LoginRequired;
import com.ssafy.em.music.application.MusicService;
import com.ssafy.em.music.dto.response.SpotifySearchResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/spotify")
@RequiredArgsConstructor
public class MusicController implements MusicControllerDocs{

    private final MusicService musicService;

    /**
     * 트랙 제목과 아티스트 이름을 파라미터로 받아 검색하는 엔드포인트.
     * 파라미터가 없으면 기본 검색어("a")를 사용하여 결과를 반환합니다.
     *
     * 예시:
     * GET /spotify/search?q=나의 사춘기에게
     * GET /spotify/search
     */
    @GetMapping("/search")
    @Override
    public ResponseEntity<List<SpotifySearchResponse>> searchTracks(
            @LoginRequired int loginId,
            @RequestParam(value = "trackName", required = false) String trackName) {
        List<SpotifySearchResponse> responses = musicService.search(trackName);
        return ResponseEntity.ok(responses);
    }
}
