package com.ssafy.em.term.presentation;

import com.ssafy.em.term.dto.response.GetTermResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Terms API", description = "이용 약관 관련 API 문서")
public interface TermControllerDocs {

    @Operation(
            summary = "전체 약관 목록 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 약관 목록 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<List<GetTermResponse>> getTerms(@Parameter(hidden = true) int loginId);

    @Operation(
            summary = "단일 약관 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 약관 정보 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "약관을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<GetTermResponse> getTerm(
            @Parameter(hidden = true) int loginId,
            @Parameter(description = "약관 ID", example = "1") Integer termId
    );
}
