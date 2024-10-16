package com.api.member.presentation.resolver;

import com.api.global.config.interceptor.auth.support.AuthenticationContext;
import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import com.domain.annotation.AuthMember;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
public class AuthMemberArgumentResolver implements HandlerMethodArgumentResolver {

    private static final int ANONYMOUS = -1;

    private final AuthenticationContext authenticationContext;

    @Override
    public boolean supportsParameter(final MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthMember.class) &&
                parameter.getParameterType().equals(Long.class);
    }

    @Override
    public Object resolveArgument(
            final MethodParameter parameter,
            final ModelAndViewContainer mavContainer,
            final NativeWebRequest webRequest,
            final WebDataBinderFactory binderFactory
    ) {
        Long memberId = authenticationContext.getPrincipal();

        if (memberId == ANONYMOUS) {
            throw new AuthException(AuthExceptionType.LOGIN_INVALID_EXCEPTION);
        }

        return memberId;
    }
}
