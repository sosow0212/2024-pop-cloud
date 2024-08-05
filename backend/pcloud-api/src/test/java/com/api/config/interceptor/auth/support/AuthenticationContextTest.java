package com.api.config.interceptor.auth.support;

import com.api.global.config.interceptor.auth.support.AuthenticationContext;
import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class AuthenticationContextTest {

    private AuthenticationContext authenticationContext;

    @BeforeEach
    void setup() {
        authenticationContext = new AuthenticationContext();
    }

    @Test
    void member_id를_반환한다() {
        // given
        authenticationContext.setAuthentication(1L);

        // when
        Long result = authenticationContext.getPrincipal();

        // then
        assertThat(result).isEqualTo(1L);
    }

    @Test
    void member_id가_없다면_예외를_발생한다() {
        // given
        authenticationContext.setAuthentication(null);

        // when & then
        assertThatThrownBy(() -> authenticationContext.getPrincipal())
                .isInstanceOf(AuthException.class)
                .hasMessageContaining(AuthExceptionType.LOGIN_INVALID_EXCEPTION.message());
    }

    @Test
    void 미확인_유저로_바꾼다() {
        // given
        authenticationContext.setAnonymous();

        // when
        Long result = authenticationContext.getPrincipal();

        // then
        assertThat(result).isEqualTo(-1L);
    }
}
