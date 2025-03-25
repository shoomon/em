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
        if(!jwtProvider.validateToken(refreshToken)) {
            throw new AuthException.AuthUnauthorizedException(AuthErrorCode.UNAUTHORIZED);
        }

        // 2. refresh token에서 사용자 식별 정보 추출
        Authentication authentication = jwtProvider.getAuthentication(refreshToken);
        OAuth2CustomUser principal = (OAuth2CustomUser) authentication.getPrincipal();
        String userId = String.valueOf(principal.getId());
        String email = principal.getAttribute("email");

        // 3. 캐시에 refresh token이 존재하는지 확인 (로그아웃 등으로 삭제되지 않았는지)
        if (!refreshTokenService.exists(userId)) {
            throw new AuthException.AuthUnauthorizedException(AuthErrorCode.UNAUTHORIZED);
        }

        // 4. 새로운 access token과 refresh token 생성
        String newAccessToken = jwtProvider.generateAccessToken(userId, email);
        String newRefreshToken = jwtProvider.generateRefreshToken(userId, email);

        // 5. 토큰 로테이션: 기존 refresh token 삭제 후, 새로운 refresh token 저장
        refreshTokenService.delete(refreshToken);
        refreshTokenService.save(userId, newRefreshToken);

        // 6. TokenResponse 객체에 새 토큰들을 담아 반환
        return new TokenResponse(newAccessToken, newRefreshToken);
    }
}
