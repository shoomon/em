package com.ssafy.em.auth.jwt.handler;

import com.ssafy.em.auth.application.RefreshTokenService;
import com.ssafy.em.auth.util.CookieUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2LogoutHandler implements LogoutHandler {

    private final RefreshTokenService refreshTokenService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String refreshToken = CookieUtils.extractCookieValue(request.getCookies());

        if (refreshToken == null) {
            return;
        }

        // 서버 측 캐시나 DB에서 refresh token 삭제
        refreshTokenService.delete(refreshToken);
    }

}