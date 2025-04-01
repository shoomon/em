package com.ssafy.em.animal.presentation;

import com.ssafy.em.animal.dto.request.CreateAnimalProfileRequest;
import com.ssafy.em.animal.dto.response.GetAnimalProfileResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Animal Profile API", description = "동물 프로필 관련 API 문서")
public interface AnimalProfileControllerDocs {

    @Operation(
            summary = "동물 프로필 생성",
            responses = {
                    @ApiResponse(responseCode = "201", description = "성공적으로 동물 프로필 생성", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<Void> createAnimalProfile(CreateAnimalProfileRequest request);

    @Operation(
            summary = "전체 동물 프로필 목록 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 동물 프로필 목록 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<List<GetAnimalProfileResponse>> getAnimalProfiles();

    @Operation(
            summary = "단일 동물 프로필 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 동물 프로필 정보 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "동물 프로필을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<GetAnimalProfileResponse> getAnimalProfile(
            @Parameter(description = "동물 프로필 ID", example = "1") int animalProfileId
    );

    @Operation(
            summary = "감정 삭제",
            responses = {
                    @ApiResponse(responseCode = "204", description = "성공적으로 동물 프로필 삭제", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "동물 프로필을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<Void> deleteAnimalProfile(
            @Parameter(description = "동물 프로필 ID", example = "1") int animalProfileId
    );
}
