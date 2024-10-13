package com.domain.show.recommend.domain;

import com.domain.common.ShowType;
import com.domain.show.common.ShowDetails;
import com.domain.show.common.ShowSchedule;
import com.domain.show.common.Statistic;
import com.domain.show.popups.domain.service.PopularityCalculator;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recommend {

    private Long id;
    private ShowType showType;
    private ShowDetails showDetails;
    private ShowSchedule showSchedule;
    private Statistic statistics;

    public double calculatePopularScore(final PopularityCalculator calculator) {
        return this.statistics.calculatePopularScore(calculator);
    }
}
