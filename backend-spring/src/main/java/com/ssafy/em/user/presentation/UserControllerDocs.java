package com.ssafy.em.user.presentation;

import com.ssafy.em.user.dto.response.GetUserResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

@Tag(name = "User API", description = "회원 관련 API 문서")
public interface UserControllerDocs {

    @Operation(
            summary = "로그인한 사용자 정보 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 사용자 정보 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<GetUserResponse> getUser(@Parameter(hidden = true) int loginId);
}
