package com.domain.map.domain;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class CoordinateRangeTest {

    @Test
    void 델타_값을_기준으로_계산된_위도경도_값이_범위_이외라면_범위값으로_자동_조절해서_나온다() {
        // when
        CoordinateRange result = CoordinateRange.of(
                BigDecimal.valueOf(36),
                BigDecimal.valueOf(126),
                BigDecimal.valueOf(100),
                BigDecimal.valueOf(100)
        );

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.getMinLatitude().getValue()).isEqualTo(BigDecimal.valueOf(33));
            softly.assertThat(result.getMaxLatitude().getValue()).isEqualTo(BigDecimal.valueOf(39));
            softly.assertThat(result.getMinLongitude().getValue()).isEqualTo(BigDecimal.valueOf(125));
            softly.assertThat(result.getMaxLongitude().getValue()).isEqualTo(BigDecimal.valueOf(132));
        });
    }
}
