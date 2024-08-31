package com.domain.show.recommend.domain;

import com.domain.show.common.ShowDetails;
import com.domain.show.common.ShowSchedule;
import com.domain.show.common.ShowType;
import com.domain.show.common.Statistic;
import com.domain.show.popups.domain.service.PopularityCalculator;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Recommend {

    private final Long id;
    private final ShowType showType;
    private final ShowDetails showDetails;
    private final ShowSchedule showSchedule;
    private final Statistic statistics;

    public double calculatePopularScore(final PopularityCalculator calculator) {
        return this.statistics.calculatePopularScore(calculator);
    }
}
