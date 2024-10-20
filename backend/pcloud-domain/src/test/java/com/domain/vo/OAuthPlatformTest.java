package com.domain.vo;

import com.domain.member.domain.vo.OAuthPlatform;
import com.domain.member.exception.MemberException;
import com.domain.member.exception.MemberExceptionType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class OAuthPlatformTest {

    @ParameterizedTest
    @ValueSource(strings = {"kakao", "KAKAO"})
    void 대소문자_구분없이_플랫폼을_찾는다(final String given) {
        // when & then
        Assertions.assertDoesNotThrow(() -> OAuthPlatform.findPlatform(given));
    }

    @Test
    void 없는_플랫폼은_예외를_발생한다() {
        // given
        String invalidPlatform = "cacao";

        // when
        assertThatThrownBy(() -> OAuthPlatform.findPlatform(invalidPlatform))
                .isInstanceOf(MemberException.class)
                .hasMessageContaining(MemberExceptionType.OAUTH_PLATFORM_NOT_FOUND_EXCEPTION.message());
    }
}
