package com.api.map.application;

import com.domain.map.domain.ShowIdentifiers;
import com.domain.map.domain.service.PathFinder;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;

public class FakePathFinder implements PathFinder {

    @Override
    public void work(
            final RecommendType recommendType,
            final Coordinate myCoordinate,
            final ShowIdentifiers showIdentifiers
    ) {
        showIdentifiers.getShowIdentifiers().sort(
                (o1, o2) -> o2.getLikedCount() - o1.getLikedCount()
        );
    }
}
