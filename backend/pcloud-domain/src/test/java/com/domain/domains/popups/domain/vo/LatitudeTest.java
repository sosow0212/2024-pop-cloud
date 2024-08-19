package com.domain.domains.popups.domain.vo;

import com.domain.popups.domain.vo.Latitude;
import com.domain.popups.exception.PopupsException;
import com.domain.popups.exception.PopupsExceptionType;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class LatitudeTest {

    @Test
    void 위도를_생성한다() {
        // given
        BigDecimal value = BigDecimal.valueOf(35);

        // when
        Latitude result = Latitude.from(value);

        // then
        assertThat(result.getValue()).isEqualTo(value);
    }

    @ParameterizedTest
    @ValueSource(strings = {"32", "40"})
    void 한국_범위가_벗어난_위도는_예외를_발생시킨다(final String value) {
        // when & then
        assertThatThrownBy(() -> Latitude.from(value))
                .isInstanceOf(PopupsException.class)
                .hasMessageContaining(PopupsExceptionType.INVALID_LATITUDE.message());
    }
}
