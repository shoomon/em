package com.ssafy.em.emotion.presentation;

import com.ssafy.em.emotion.dto.request.CreateEmotionRequest;
import com.ssafy.em.emotion.dto.response.GetEmotionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;


@Tag(name = "Emotion API", description = "감정 관련 API 문서")
public interface EmotionControllerDocs {

    @Operation(
            summary = "감정 생성",
            responses = {
                    @ApiResponse(responseCode = "201", description = "성공적으로 감정 생성", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<Void> createEmotion(CreateEmotionRequest request);

    @Operation(
            summary = "전체 감정 목록 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 감정 목록 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<List<GetEmotionResponse>> getEmotions();

    @Operation(
            summary = "단일 감정 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 감정 정보 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "감정을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<GetEmotionResponse> getEmotion(
            @Parameter(description = "감정 ID", example = "1") int emotionId
    );

    @Operation(
            summary = "감정 삭제",
            responses = {
                    @ApiResponse(responseCode = "204", description = "성공적으로 감정 삭제", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "감정을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<Void> deleteEmotion(
            @Parameter(description = "감정 ID", example = "1") int emotionId
    );
}