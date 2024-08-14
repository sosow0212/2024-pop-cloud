package com.domain.domains.common;

import com.domain.domains.popups.exception.PopupsException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static com.domain.domains.popups.exception.PopupsExceptionType.PUBLIC_TAB_NOT_FOUNT_EXCEPTION;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PublicCustomTagTest {

    @Test
    void 관심사를_이름으로_가져온다() {
        // given
        String tag = "펫";

        // when
        PublicTag result = PublicTag.from(tag);

        // then
        assertThat(result).isEqualTo(PublicTag.PET);
    }

    @Test
    void 존재하지_않는_관심사가_들어오면_예외를_발생시킨다() {
        // given
        String wrongPublicTag = "잘못된 태그";

        // when & then
        assertThatThrownBy(() -> PublicTag.from(wrongPublicTag))
                .isInstanceOf(PopupsException.class)
                .hasMessageContaining(PUBLIC_TAB_NOT_FOUNT_EXCEPTION.message());
    }
}
