package com.ssafy.em.auth.presentation;

import com.ssafy.em.auth.application.AuthService;
import com.ssafy.em.auth.dto.response.TokenResponse;
import com.ssafy.em.auth.jwt.token.JwtProperties;
import com.ssafy.em.auth.util.CookieUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController implements AuthControllerDocs {

    private final AuthService authService;
    private final JwtProperties jwtProperties;

    @PostMapping("/reissue")
    @Override
    public ResponseEntity<Void> reissueToken(HttpServletRequest request, HttpServletResponse response) {
        // CookieUtils를 사용하여 refresh token 추출
        String refreshToken = CookieUtils.extractCookieValue(request.getCookies());
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // AuthService를 통해 토큰 재발급
        TokenResponse tokenResponse = authService.reissue(refreshToken);

        // 새로운 access token은 응답 헤더에 설정
        response.setHeader("Authorization", tokenResponse.accessToken());

        // 새로운 refresh token은 CookieUtils를 사용해 HttpOnly 쿠키에 설정
        ResponseCookie refreshCookie = CookieUtils.createCookie(tokenResponse.refreshToken(), jwtProperties.refreshTokenExpiry());
        response.setHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok().build();
    }
}
