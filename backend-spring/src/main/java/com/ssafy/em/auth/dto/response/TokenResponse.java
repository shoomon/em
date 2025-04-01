package com.ssafy.em.auth.dto.response;

public record TokenResponse(
        String accessToken,
        String refreshToken
) {
}