package com.api.global.config.interceptor.auth.support;

import com.common.exception.AuthException;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import java.util.Objects;

import static com.common.exception.AuthExceptionType.LOGIN_INVALID_EXCEPTION;

@RequestScope
@Component
public class AuthenticationContext {

    private static final Long ANONYMOUS_MEMBER = -1L;

    private Long memberId;

    public void setAuthentication(final Long memberId) {
        this.memberId = memberId;
    }

    public Long getPrincipal() {
        if (Objects.isNull(this.memberId)) {
            throw new AuthException(LOGIN_INVALID_EXCEPTION);
        }

        return memberId;
    }

    public void setAnonymous() {
        this.memberId = ANONYMOUS_MEMBER;
    }
}
