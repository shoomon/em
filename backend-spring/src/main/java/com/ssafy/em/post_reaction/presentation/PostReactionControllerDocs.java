package com.ssafy.em.post_reaction.presentation;

import com.ssafy.em.common.annotation.LoginRequired;
import com.ssafy.em.post_reaction.dto.request.PostReactionRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Null;
import org.springframework.http.ResponseEntity;

@Tag(name = "Reaction API", description = "게시글 감정 표현 API 문서")
public interface PostReactionControllerDocs {

    @Operation(
            summary = "게시글 감정 공감 토글",
            requestBody = @RequestBody(
                    description = "감정 ID를 포함한 요청",
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = PostReactionRequest.class),
                            examples = @ExampleObject(
                                    name = "감정 선택 예시",
                                    value = "{ \"emotionId\": 3 }"
                            )
                    )
            ),
            responses = {
                    @ApiResponse(responseCode = "201", description = "성공적으로 게시글에 대한 감정 등록")
            }
    )
    ResponseEntity<Null> togglePostReaction(int postId, PostReactionRequest postReactionRequest, @Parameter(hidden = true) int userId);
}
