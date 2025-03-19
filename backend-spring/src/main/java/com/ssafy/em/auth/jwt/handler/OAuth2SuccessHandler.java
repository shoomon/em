package com.ssafy.em.auth.jwt.handler;

import com.ssafy.em.auth.application.RefreshTokenService;
import com.ssafy.em.auth.domain.entity.OAuth2CustomUser;
import com.ssafy.em.auth.jwt.token.JwtProperties;
import com.ssafy.em.auth.jwt.token.JwtProvider;
import jakarta.servlet.FilterChain;
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

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

    private static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    private final JwtProvider jwtProvider;
    private final JwtProperties jwtProperties;
    private final RefreshTokenService refreshTokenService;

    @Value("")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        OAuth2CustomUser oauth2User = (OAuth2CustomUser) authentication.getPrincipal();

        String userId = oauth2User.getId().toString();
        String email = oauth2User.getEmail();

        String accessToken = jwtProvider.generateAccessToken(userId, email);
        String refreshToken = jwtProvider.generateRefreshToken(userId, email);

        refreshTokenService.save(userId, refreshToken);

        // AccessToken을 QueryString으로 보내도록 수정하기
        response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);


        ResponseCookie refreshCookie = createCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, jwtProperties.refreshTokenExpiry());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        response.sendRedirect(redirectUrl);
    }

    private ResponseCookie createCookie(String userId, String refreshToken, long maxAge) {
        return ResponseCookie.from(userId, refreshToken)
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .path("/")
                .maxAge(maxAge)
                .build();
    }
}
