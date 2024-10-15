package com.domain.map.domain.service;

import com.domain.map.domain.ShowIdentifiers;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;

public interface PathFinder {
    void work(
            RecommendType recommendType,
            Coordinate myCoordinate,
            ShowIdentifiers showIdentifiers
    );
}
