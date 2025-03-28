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

    // userId를 key로, refreshToken을 value로 저장한 구조라고 가정
    public String findByUserId(String userId) {
        return refreshTokenRepository.findByKey(userId);
    }

    // userId -> refreshToken 매핑 저장
    public void save(String userId, String refreshToken) {
        Duration expiration = Duration.ofDays(jwtProperties.refreshTokenExpiry());
        refreshTokenRepository.save(userId, refreshToken, expiration);
    }

    // userId를 이용해 refresh token을 삭제
    public void deleteByUserId(String userId) {
        refreshTokenRepository.delete(userId);
    }

    // userId를 통해 Refresh Token이 존재하는지 체크
    public boolean exists(String userId) {
        return refreshTokenRepository.findByKey(userId) != null;
    }

}

