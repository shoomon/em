package com.ssafy.em.animal.presentation;

import com.ssafy.em.animal.dto.request.CreateAnimalRequest;
import com.ssafy.em.animal.dto.response.GetAnimalResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Tag(name = "Animal API", description = "동물 관련 API 문서")
public interface AnimalControllerDocs {

    @Operation(
            summary = "동물 생성",
            responses = {
                    @ApiResponse(responseCode = "201", description = "성공적으로 동물 생성", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "400", description = "잘못된 요청", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<Void> createAnimal(CreateAnimalRequest request);

    @Operation(
            summary = "전체 동물 목록 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 동물 목록 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<List<GetAnimalResponse>> getAnimals();

    @Operation(
            summary = "단일 동물 조회",
            responses = {
                    @ApiResponse(responseCode = "200", description = "성공적으로 동물 정보 반환", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "동물을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<GetAnimalResponse> getAnimal(
            @Parameter(description = "동물 ID", example = "1") int animalId
    );

    @Operation(
            summary = "감정 삭제",
            responses = {
                    @ApiResponse(responseCode = "204", description = "성공적으로 동물 삭제", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "404", description = "동물을 찾을 수 없음", content = @Content(mediaType = "application/json")),
                    @ApiResponse(responseCode = "500", description = "서버 오류", content = @Content(mediaType = "application/json"))
            }
    )
    ResponseEntity<Void> deleteAnimal(
            @Parameter(description = "동물 ID", example = "1") int animalId
    );
}
