package com.domain.map.infrastrucutre.worker;

import com.domain.map.domain.ShowIdentifiers;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;

public interface PathFinderWorker {

    RecommendType getRecommendType();

    void work(Coordinate myCoordinate, ShowIdentifiers showIdentifiers);
}
