package com.domain.domains.popups.domain.vo;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class StatisticTest {

    @Test
    void 방문자_수를_증가한다() {
        // given
        Statistic statistic = Statistic.createDefault();
        Integer defaultCount = statistic.getVisitedCount();

        // when
        statistic.addVisitedCount();

        // then
        assertThat(statistic.getVisitedCount()).isEqualTo(defaultCount + 1);
    }

    @Test
    void 좋아요_수를_증가한다() {
        // given
        Statistic statistic = Statistic.createDefault();
        Integer defaultCount = statistic.getLikedCount();

        // when
        statistic.addLikedCount();

        // then
        assertThat(statistic.getLikedCount()).isEqualTo(defaultCount + 1);
    }
}
