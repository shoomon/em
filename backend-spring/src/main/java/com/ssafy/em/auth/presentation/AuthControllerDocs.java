package com.ssafy.em.auth.presentation;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

@Tag(name = "Auth API", description = "인증 관련 API 문서")
public interface AuthControllerDocs {

    @Operation(
            summary = "AccessToken 재발급",
            parameters = {
                    @Parameter(name = "refreshToken", in = ParameterIn.COOKIE, description = "재발급용 refresh token")
            },
            responses = {
                    @ApiResponse(responseCode = "200", description = "재발급 성공 (새로운 access token은 Authorization 헤더, refresh token은 쿠키로 제공됨)"),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<Void> reissueToken(HttpServletRequest request, HttpServletResponse response);

}
