package com.ssafy.em.auth.jwt.handler;

import com.ssafy.em.auth.application.RefreshTokenService;
import com.ssafy.em.auth.domain.entity.OAuth2CustomUser;
import com.ssafy.em.auth.jwt.token.JwtProvider;
import com.ssafy.em.auth.util.CookieUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@Component
@RequiredArgsConstructor
public class OAuth2LogoutHandler implements LogoutHandler {

    private final RefreshTokenService refreshTokenService;
    private final JwtProvider jwtProvider; // JwtProvider를 주입하여 토큰에서 사용자 정보를 추출

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String refreshToken = CookieUtils.extractCookieValue(request.getCookies());

        if (refreshToken == null) {
            return;
        }

        String userId = null;
        // 1. authentication 객체에 사용자 정보가 있다면, 이를 이용해 userId 추출
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2CustomUser) {
            OAuth2CustomUser principal = (OAuth2CustomUser) authentication.getPrincipal();
            userId = String.valueOf(principal.getId());
        } else {
            // 2. authentication이 없거나 타입이 맞지 않으면, refresh token에서 userId 추출
            try {
                Authentication auth = jwtProvider.getAuthentication(refreshToken);
                if (auth.getPrincipal() instanceof OAuth2CustomUser) {
                    OAuth2CustomUser principal = (OAuth2CustomUser) auth.getPrincipal();
                    userId = String.valueOf(principal.getId());
                }
            } catch (Exception e) {
                // refresh token이 유효하지 않으면 여기서 예외가 발생할 수 있으므로, 추가 로깅이나 처리 가능
                log.error("Failed to extract userId from refresh token", e);
            }
        }

        if (userId != null) {
            // userId를 기반으로 refresh token 삭제
            refreshTokenService.deleteByUserId(userId);
        }
    }
}
