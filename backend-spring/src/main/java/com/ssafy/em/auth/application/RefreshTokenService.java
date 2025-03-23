package com.ssafy.em.auth.application;

import com.ssafy.em.auth.domain.RefreshTokenRepository;
import com.ssafy.em.auth.jwt.token.JwtProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final JwtProperties jwtProperties;
    private final RefreshTokenRepository refreshTokenRepository;

    public String findByUserId(String userId) {
        return refreshTokenRepository.findByKey(userId);
    }

    public void save(String userId, String refreshToken) {
        Duration expiration = Duration.ofDays(jwtProperties.refreshTokenExpiry());
        refreshTokenRepository.save(userId, refreshToken, expiration);
    }

    public void delete(String userId) {
        refreshTokenRepository.delete(userId);
    }

}
