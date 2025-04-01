package com.ssafy.em.auth.util;

import jakarta.servlet.http.Cookie;
import org.springframework.http.ResponseCookie;

import java.util.Arrays;

public class CookieUtils {

    public static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    private CookieUtils() {}

    /**
     * 주어진 이름, 값, 만료시간으로 HttpOnly, Secure 쿠키를 생성합니다.
     */
    public static ResponseCookie createCookie(String cookieValue, long maxAge) {
        return ResponseCookie.from(REFRESH_TOKEN_COOKIE_NAME, cookieValue)
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .path("/")
                .maxAge(maxAge)
                .build();
    }

    /**
     * 주어진 쿠키 배열에서 지정한 이름을 가진 쿠키의 값을 추출합니다.
     */
    public static String extractCookieValue(Cookie[] cookies) {
        if (cookies == null) {
            return null;
        }
        return Arrays.stream(cookies)
                .filter(cookie -> REFRESH_TOKEN_COOKIE_NAME.equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
    }
}

