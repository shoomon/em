package com.ssafy.em.user.presentation;

import com.ssafy.em.user.dto.request.TermAgreementRequest;
import com.ssafy.em.user.dto.response.GetUserResponse;
import com.ssafy.em.user.dto.response.TermAgreementResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

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

    @Operation(
            summary = "이용약관 동의 처리",
            description = "사용자가 필수 약관(개인정보 처리, 위치 기반)과 선택 약관(마케팅 활용) 동의 여부를 처리합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 이용약관 온보딩 처리 결과 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청(유효성 검증 실패)", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "사용자 또는 약관을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<TermAgreementResponse> onboard(
            @Parameter(hidden = true) int loginId,
            @RequestBody TermAgreementRequest request);

    @Operation(
            summary = "이용약관 Health Check API",
            description = "특정 사용자가 필수 약관(개인정보 처리, 위치 기반)에 동의했는지 확인합니다.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 약관 동의 상태 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "401", description = "인증되지 않은 사용자", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<TermAgreementResponse> healthCheckTerms(@Parameter(hidden = true) int loginId);

}
