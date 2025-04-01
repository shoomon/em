package com.ssafy.em.auth.jwt.handler;

import com.ssafy.em.auth.application.RefreshTokenService;
import com.ssafy.em.auth.domain.entity.OAuth2CustomUser;
import com.ssafy.em.auth.jwt.token.JwtProperties;
import com.ssafy.em.auth.jwt.token.JwtProvider;
import com.ssafy.em.auth.util.CookieUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    private final JwtProvider jwtProvider;
    private final JwtProperties jwtProperties;
    private final RefreshTokenService refreshTokenService;

    // 로그인 성공 후 최종 리다이렉션 URL
    @Value("${spring.security.oauth2.login-success-uri}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        OAuth2CustomUser oauth2User = (OAuth2CustomUser) authentication.getPrincipal();

        String userId = String.valueOf(oauth2User.getId());
        String email = oauth2User.getEmail();

        String accessToken = jwtProvider.generateAccessToken(userId, email);
        String refreshToken = jwtProvider.generateRefreshToken(userId, email);

        refreshTokenService.save(userId, refreshToken);

        String forwardedHost = request.getHeader("X-Forwarded-Host");
        String clientDomain = (forwardedHost != null) ? "https://" + forwardedHost : "https://default-client.com";
        // Access token을 QueryString에 담기 위해 URL 인코딩 처리
        String encodedAccessToken = URLEncoder.encode(accessToken, StandardCharsets.UTF_8);

        // 기존 redirectUrl에 accessToken을 Query String으로 추가
        String redirectWithToken = redirectUrl + "?accessToken=" + encodedAccessToken;

        // refresh token은 CookieUtils를 사용해 HttpOnly 쿠키에 설정
        ResponseCookie refreshCookie = CookieUtils.createCookie(refreshToken, jwtProperties.refreshTokenExpiry());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        // 302 Redirect 응답을 통해 클라이언트를 최종 URL로 리다이렉트
        response.sendRedirect(redirectWithToken);
    }

}
