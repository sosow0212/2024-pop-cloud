package com.domain.map.dto;

import com.domain.common.coordinates.Position;
import com.domain.map.domain.vo.SearchTarget;

import java.time.LocalDateTime;

public record ShowsCoordinateSimpleResponse(
        SearchTarget searchTarget,
        Long id,
        String title,
        Position position,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount
) {
}
