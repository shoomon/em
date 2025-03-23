package com.ssafy.em.common.resolver;

import com.ssafy.em.auth.domain.entity.OAuth2CustomUser;
import com.ssafy.em.common.annotation.Login;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class LoginArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        // @Login 어노테이션이 붙어 있고, 파라미터 타입이 OAuth2CustomUser, int 또는 Integer 인 경우 지원
        return parameter.hasParameterAnnotation(Login.class)
                && (OAuth2CustomUser.class.isAssignableFrom(parameter.getParameterType())
                || parameter.getParameterType().equals(int.class)
                || parameter.getParameterType().equals(Integer.class));
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2CustomUser) {
            OAuth2CustomUser user = (OAuth2CustomUser) authentication.getPrincipal();
            return user.getId();
        }
        // 인증된 사용자가 없는 경우 null 반환
        return null;
    }
}