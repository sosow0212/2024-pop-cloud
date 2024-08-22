package com.domain.common;

import com.domain.common.Price;
import com.domain.popups.exception.PopupsException;
import com.domain.popups.exception.PopupsExceptionType;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PriceTest {

    @Test
    void 금액을_정상_생성한다() {
        // given
        int price = 1000;

        // when
        Price result = Price.from(price);

        // then
        assertThat(result.getValue().intValue()).isEqualTo(price);
    }

    @Test
    void 금액은_0원보다_커야한다() {
        // given
        int price = -1;

        // when & then
        assertThatThrownBy(() -> Price.from(price))
                .isInstanceOf(PopupsException.class)
                .hasMessageContaining(PopupsExceptionType.INVALID_PRICE.message());
    }
}
