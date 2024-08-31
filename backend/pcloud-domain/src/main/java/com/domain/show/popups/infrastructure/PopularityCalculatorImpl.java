package com.domain.show.popups.infrastructure;

import com.domain.annotation.DomainService;
import com.domain.show.popups.domain.service.PopularityCalculator;

@DomainService
public class PopularityCalculatorImpl implements PopularityCalculator {

    private static final double VIEW_COUNT_MULTIPLY_VALUE = 0.3;

    @Override
    public double calculatePopularity(final int viewCount, final int likedCount) {
        return viewCount * VIEW_COUNT_MULTIPLY_VALUE + likedCount;
    }
}
