package com.api.global.config.interceptor.auth;

import com.api.global.config.interceptor.auth.support.AuthenticationContext;
import com.api.global.config.interceptor.auth.support.AuthenticationExtractor;
import com.common.auth.TokenProvider;
import com.common.exception.AuthException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import static com.common.exception.AuthExceptionType.SIGNATURE_INVALID_EXCEPTION;

@RequiredArgsConstructor
@Component
public class LoginValidCheckerInterceptor implements HandlerInterceptor {

    private final TokenProvider tokenProvider;
    private final AuthenticationContext authenticationContext;

    @Override
    public boolean preHandle(final HttpServletRequest request,
                             final HttpServletResponse response,
                             final Object handler) throws Exception {
        String token = AuthenticationExtractor.extract(request)
                .orElseThrow(() -> new AuthException(SIGNATURE_INVALID_EXCEPTION));

        Long memberId = tokenProvider.extract(token);
        authenticationContext.setAuthentication(memberId);

        return true;
    }
}
