package com.ssafy.em.auth.jwt.token;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("spring.jwt")
public record JwtProperties(
        String issuer,
        String secret,
        long accessTokenExpiry,
        long refreshTokenExpiry
) {
}
