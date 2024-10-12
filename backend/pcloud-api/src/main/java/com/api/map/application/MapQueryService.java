package com.api.map.application;

import com.api.map.application.request.MyCoordinateRequestWithDelta;
import com.api.map.application.request.ShowsCoordinateRequest;
import com.domain.map.domain.CoordinateRange;
import com.domain.map.domain.RouteSelector;
import com.domain.map.domain.service.PathFinder;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MapQueryService {

    private final MapRequester mapRequester;
    private final PathFinder pathFinder;

    public List<ShowsCoordinateSimpleResponse> findShowsAroundLocation(final MyCoordinateRequestWithDelta request) {
        CoordinateRange coordinateRange = findCoordinateSearchRange(request);
        return mapRequester.findShowsAroundLocation(coordinateRange);
    }

    private CoordinateRange findCoordinateSearchRange(final MyCoordinateRequestWithDelta request) {
        return CoordinateRange.of(
                request.latitude(),
                request.longitude(),
                request.latitudeDelta(),
                request.longitudeDelta()
        );
    }

    public RouteSelector findShowsByRouteRecommendation(final ShowsCoordinateRequest request) {
        RouteSelector routeSelector = request.toDomain();
        routeSelector.sortByStrategy(pathFinder);
        return routeSelector;
    }
}
