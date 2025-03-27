package com.ssafy.em.common.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.em.auth.exception.AuthErrorCode;
import com.ssafy.em.common.exception.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private static final String CONTENT_TYPE = "application/json;charset=UTF-8";

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException {
        log.warn("Forbidden Access: {}", request.getRequestURI());

        response.setContentType(CONTENT_TYPE);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        ErrorResponse errorResponse = ErrorResponse.from(AuthErrorCode.FORBIDDEN.toErrorCode());
        response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }
}