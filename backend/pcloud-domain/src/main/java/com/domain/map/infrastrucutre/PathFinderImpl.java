package com.domain.map.infrastrucutre;

import com.domain.annotation.DomainService;
import com.domain.map.domain.ShowIdentifiers;
import com.domain.map.domain.service.PathFinder;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;
import com.domain.map.infrastrucutre.worker.PathFinderWorker;

import java.util.Map;
import java.util.Set;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

@DomainService
public class PathFinderImpl implements PathFinder {

    private final Map<RecommendType, PathFinderWorker> strategy;

    public PathFinderImpl(final Set<PathFinderWorker> workers) {
        strategy = workers.stream()
                .collect(toMap(PathFinderWorker::getRecommendType, identity()));
    }

    @Override
    public void work(
            final RecommendType recommendType,
            final Coordinate myCoordinate,
            final ShowIdentifiers showIdentifiers
    ) {
        strategy.get(recommendType)
                .work(myCoordinate, showIdentifiers);
    }
}
