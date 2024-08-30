package com.domain.show.common;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ShowTypeTest {

    @Test
    void 이름을_기준으로_찾는다() {
        // given
        String given = "popups";

        // when
        ShowType result = ShowType.from(given);

        // then
        assertThat(result).isEqualTo(ShowType.POPUPS);
    }

    @Test
    void 해당사항이_없다면_all을_반환한다() {
        // given
        String invalidValue = "invalid";

        // when
        ShowType result = ShowType.from(invalidValue);

        // then
        assertThat(result).isEqualTo(ShowType.ALL);
    }
}
