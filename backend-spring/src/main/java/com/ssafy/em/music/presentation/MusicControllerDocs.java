package com.ssafy.em.music.presentation;

import com.ssafy.em.music.dto.response.SpotifySearchResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Tag(name = "Music API", description = "Spotify 기반 음악 검색 API")
public interface MusicControllerDocs {

    @Operation(
            summary = "음악 검색",
            description = "트랙 제목과 아티스트 이름을 파라미터로 받아 검색하는 엔드포인트. " +
                    "파라미터가 없으면 기본 검색어('a')를 사용하여 결과를 반환합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 음악 검색 결과 반환",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청",
                            content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류",
                            content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<List<SpotifySearchResponse>> searchTracks(
            @Parameter(hidden = true) int loginId,
            @Parameter(description = "검색할 트랙 이름", example = "나의 사춘기에게")
            @RequestParam(value = "q", required = false) String trackName
    );
}