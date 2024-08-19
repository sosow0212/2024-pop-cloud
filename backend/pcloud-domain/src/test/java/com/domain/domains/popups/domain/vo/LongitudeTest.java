package com.domain.domains.popups.domain.vo;

import com.domain.popups.domain.vo.Longitude;
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
class LongitudeTest {

    @Test
    void 경도를_생성한다() {
        // given
        BigDecimal value = BigDecimal.valueOf(130);

        // when
        Longitude result = Longitude.from(value);

        // then
        assertThat(result.getValue()).isEqualTo(value);
    }

    @ParameterizedTest
    @ValueSource(strings = {"124", "133"})
    void 한국_범위가_벗어난_경도는_예외를_발생시킨다(final String value) {
        // when & then
        assertThatThrownBy(() -> Longitude.from(value))
                .isInstanceOf(PopupsException.class)
                .hasMessageContaining(PopupsExceptionType.INVALID_LONGITUDE.message());
    }
}
