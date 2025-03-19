package com.ssafy.em.common.config.security;

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
                .authenticationEntryPoint(this::handleAuthenticationException)
                .accessDeniedHandler(this::handleAccessDeniedException);
    }
    private void handleAuthenticationException(HttpServletRequest request, HttpServletResponse response,
                                               AuthenticationException authException) throws IOException {
        log.warn("Unauthorized Access: {} - {}", request.getRequestURI(), authException.getMessage());

        response.setContentType(CONTENT_TYPE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // TODO: 커스텀 에러 코드 적용
        ErrorResponse errorResponse = ErrorResponse.from(new ErrorCode("UNAUTHORIZED", "인증이 필요합니다."));

        response.getWriter().write(errorResponse.toString());
    }

    private void handleAccessDeniedException(HttpServletRequest request, HttpServletResponse response,
                                             AccessDeniedException accessDeniedException) throws IOException {
        log.warn("Forbidden Access: {}", request.getRequestURI());

        response.setContentType(CONTENT_TYPE);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        // TODO: 커스텀 에러 코드 적용
        ErrorResponse errorResponse = ErrorResponse.from(new ErrorCode("FORBIDDEN", "접근 권한이 없습니다."));

        response.getWriter().write(errorResponse.toString());
    }

}
