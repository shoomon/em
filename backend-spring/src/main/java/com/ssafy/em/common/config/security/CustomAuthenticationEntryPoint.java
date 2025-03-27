package com.ssafy.em.common.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.em.auth.exception.AuthErrorCode;
import com.ssafy.em.auth.exception.JwtAuthenticationException;
import com.ssafy.em.common.exception.ErrorCode;
import com.ssafy.em.common.exception.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final String CONTENT_TYPE = "application/json";

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        log.warn("Unauthorized Access: {} - {}", request.getRequestURI(), authException.getMessage());

        response.setContentType(CONTENT_TYPE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ErrorCode errorCode = AuthErrorCode.UNAUTHORIZED.toErrorCode();
        if (authException instanceof JwtAuthenticationException jwtEx) {
            errorCode = jwtEx.getErrorCode();
        }

        ErrorResponse errorResponse = ErrorResponse.from(errorCode);
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}
