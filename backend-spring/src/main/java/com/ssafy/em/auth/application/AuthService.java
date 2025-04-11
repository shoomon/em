package com.ssafy.em.auth.application;

import com.ssafy.em.auth.domain.entity.OAuth2CustomUser;
import com.ssafy.em.auth.dto.response.TokenResponse;
import com.ssafy.em.auth.exception.AuthErrorCode;
import com.ssafy.em.auth.exception.AuthException;
import com.ssafy.em.auth.jwt.token.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtProvider jwtProvider;
    private final RefreshTokenService refreshTokenService;

    public TokenResponse reissue(String refreshToken) {
        // 1. refresh token 유효성 검사
        if (!jwtProvider.validateToken(refreshToken)) {
            throw new AuthException.AuthUnauthorizedException(AuthErrorCode.UNAUTHORIZED);
        }

        // 2. refresh token에서 사용자 식별 정보 추출
        Authentication authentication = jwtProvider.getAuthentication(refreshToken);
        OAuth2CustomUser principal = (OAuth2CustomUser) authentication.getPrincipal();
        String userId = String.valueOf(principal.getId());
        String email = principal.getAttribute("email");

        // 3. 캐시에 해당 userId의 refresh token이 존재하는지 확인
        if (!refreshTokenService.exists(userId)) {
            // userId에 맞는 토큰이 전혀 없다면, 이미 만료/삭제된 상태이므로 재발급 거부
            throw new AuthException.AuthUnauthorizedException(AuthErrorCode.UNAUTHORIZED);
        }

        // 3-1. 실제 저장된 리프레시 토큰이 현재 요청의 refreshToken과 동일한지 확인
        String storedRefreshToken = refreshTokenService.findByUserId(userId);
        if (!storedRefreshToken.equals(refreshToken)) {
            // DB/캐시에 저장된 것과 다르면, 토큰이 위/변조됐거나 이미 로테이션된 토큰이므로 예외 처리
            throw new AuthException.AuthUnauthorizedException(AuthErrorCode.UNAUTHORIZED);
        }

        // 4. 새로운 access token과 refresh token 생성
        String newAccessToken = jwtProvider.generateAccessToken(userId, email);
        String newRefreshToken = jwtProvider.generateRefreshToken(userId, email);

        // 5. 토큰 로테이션: 기존 refresh token 제거 후, 새로운 refresh token 저장
        //    (키로 userId를 사용하므로, userId 기반으로 삭제해야 함)
        refreshTokenService.deleteByUserId(userId);   // 수정된 부분
        refreshTokenService.save(userId, newRefreshToken);

        // 6. 토큰들을 응답 DTO에 담아서 반환
        return new TokenResponse(newAccessToken, newRefreshToken);
    }
}
