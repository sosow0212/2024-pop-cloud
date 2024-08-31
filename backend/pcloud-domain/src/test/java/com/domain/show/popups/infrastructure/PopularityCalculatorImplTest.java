package com.domain.show.popups.infrastructure;

import com.domain.show.popups.domain.service.PopularityCalculator;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopularityCalculatorImplTest {

    private PopularityCalculator popularityCalculator = new PopularityCalculatorImpl();

    @Test
    void 방문자수와_좋아요_수로_인기카운팅을_한다() {
        // given
        int viewCount = 10;
        int visitedCount = 100;

        // when
        double result = popularityCalculator.calculatePopularity(viewCount, visitedCount);

        // then
        assertThat(result).isEqualTo(103);
    }
}
