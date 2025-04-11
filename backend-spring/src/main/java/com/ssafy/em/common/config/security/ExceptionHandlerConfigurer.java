package com.ssafy.em.common.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.em.auth.exception.AuthErrorCode;
import com.ssafy.em.auth.exception.JwtAuthenticationException;
import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExceptionHandlingConfigurer;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class ExceptionHandlerConfigurer implements Customizer<ExceptionHandlingConfigurer<HttpSecurity>> {

    private static final String CONTENT_TYPE = "application/json";

    @Override
    public void customize(ExceptionHandlingConfigurer<HttpSecurity> httpSecurityExceptionHandlingConfigurer) {
        httpSecurityExceptionHandlingConfigurer
                // 인증 실패(401) 처리
                .authenticationEntryPoint(this::handleAuthenticationException)
                // 인가 실패(403) 처리
                .accessDeniedHandler(this::handleAccessDeniedException);
    }

    private void handleAuthenticationException(HttpServletRequest request, HttpServletResponse response,
                                               AuthenticationException authException) throws IOException {

        log.warn("Unauthorized Access: {} - {}", request.getRequestURI(), authException.getMessage());

        response.setContentType(CONTENT_TYPE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ErrorCode errorCode = AuthErrorCode.UNAUTHORIZED.toErrorCode(); // 기본값

        if (authException instanceof JwtAuthenticationException jwtEx) {
            errorCode = jwtEx.getErrorCode();
        }

        ErrorResponse errorResponse = ErrorResponse.from(errorCode);
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }

    private void handleAccessDeniedException(HttpServletRequest request, HttpServletResponse response,
                                             AccessDeniedException accessDeniedException) throws IOException {
        log.warn("Forbidden Access: {}", request.getRequestURI());

        response.setContentType(CONTENT_TYPE);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        // Enum을 통해 직접 커스텀 에러 코드 반환
        ErrorResponse errorResponse = ErrorResponse.from(AuthErrorCode.FORBIDDEN.toErrorCode());

        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }

}
