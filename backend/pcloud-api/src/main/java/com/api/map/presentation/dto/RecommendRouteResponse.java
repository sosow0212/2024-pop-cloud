package com.api.map.presentation.dto;

import com.domain.common.coordinates.Position;
import com.domain.map.domain.RouteSelector;
import com.domain.map.domain.vo.SearchTarget;

import java.time.LocalDateTime;
import java.util.List;

public record RecommendRouteResponse(
        Long id,
        SearchTarget searchTarget,
        String title,
        Position position,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount
) {
    public static List<RecommendRouteResponse> from(final RouteSelector routeSelector) {
        return routeSelector.getShowIdentifiers().getShowIdentifiers().stream()
                .map(it -> new RecommendRouteResponse(
                        it.getId(),
                        it.getSearchTarget(),
                        it.getTitle(),
                        Position.of(
                                it.getLocation(),
                                it.getCoordinate().getLatitude(),
                                it.getCoordinate().getLongitude()
                        ),
                        it.getStartDate(),
                        it.getEndDate(),
                        it.getVisitedCount(),
                        it.getLikedCount()
                )).toList();
    }
}
