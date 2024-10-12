package com.domain.map.infrastrucutre.worker;

import com.domain.map.domain.ShowIdentifiers;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class PopularWorker implements PathFinderWorker {

    private static final double VIEW_COUNT_POPULAR_SCORE = 0.2;

    @Override
    public RecommendType getRecommendType() {
        return RecommendType.POPULAR;
    }

    @Override
    public void work(final Coordinate myCoordinate, final ShowIdentifiers showIdentifiers) {
        Collections.sort(showIdentifiers.getShowIdentifiers(), (primary, secondary) -> {
            double primaryScore = getPopularScore(primary.getVisitedCount(), primary.getLikedCount());
            double secondaryScore = getPopularScore(secondary.getVisitedCount(), secondary.getLikedCount());
            return Double.compare(secondaryScore, primaryScore);
        });
    }

    private double getPopularScore(final Integer visitedCount, final Integer likedCount) {
        return visitedCount * VIEW_COUNT_POPULAR_SCORE
                + likedCount;
    }
}
