package com.ssafy.em.auth.jwt.token;

import com.ssafy.em.auth.domain.entity.OAuth2CustomUser;
import com.ssafy.em.auth.exception.AuthErrorCode;
import com.ssafy.em.auth.exception.JwtAuthenticationException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class JwtProvider {

    private static final String AUTH_ID = "ID";
    private static final String AUTH_EMAIL = "EMAIL";

    private final String issuer;
    private final SecretKey secretKey;
    private final long accessTokenValidity;
    private final long refreshTokenValidity;

    public JwtProvider(JwtProperties jwtProperties) {
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.secret());
        this.issuer = jwtProperties.issuer();
        this.secretKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenValidity = jwtProperties.accessTokenExpiry();
        this.refreshTokenValidity = jwtProperties.refreshTokenExpiry();
    }

    public String generateAccessToken(String userId, String email) {
        return generateToken(userId, email, accessTokenValidity);
    }

    public String generateRefreshToken(String userId, String email) {
        return generateToken(userId, email, refreshTokenValidity);
    }

    private String generateToken(String userId, String email, long validity) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + validity);

        return Jwts.builder()
                .issuer(issuer)
                .issuedAt(now)
                .claim(AUTH_ID, userId)
                .claim(AUTH_EMAIL, email)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        int userId = Integer.parseInt(claims.get(AUTH_ID, String.class));
        String email = (String) claims.get(AUTH_EMAIL);

        // OAuth2CustomUser 생성 (registrationId는 "kakao", attributes는 빈 맵 처리)
        OAuth2CustomUser principal = new OAuth2CustomUser(userId, "kakao", Map.of(), List.of(), email);

        return new UsernamePasswordAuthenticationToken(principal, token, principal.getAuthorities());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);

            return true;

        } catch (SecurityException | MalformedJwtException e) {
            log.warn("잘못된 JWT 서명 또는 토큰입니다: {}", e.getMessage());
            throw new JwtAuthenticationException(AuthErrorCode.UNAUTHORIZED.toErrorCode());

        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다: {}", e.getMessage());
            throw new JwtAuthenticationException(AuthErrorCode.EXPIRED_JWT_TOKEN.toErrorCode());

        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다: {}", e.getMessage());
            throw new JwtAuthenticationException(AuthErrorCode.UNAUTHORIZED.toErrorCode());

        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 비어있습니다: {}", e.getMessage());
            throw new JwtAuthenticationException(AuthErrorCode.UNAUTHORIZED.toErrorCode());

        } catch (Exception e) {
            log.error("JWT 검증 중 알 수 없는 에러가 발생했습니다: {}", e.getMessage());
            throw new JwtAuthenticationException(AuthErrorCode.UNAUTHORIZED.toErrorCode());
        }
    }

}
