package com.domain.exhibition.infrastructure.dto;

import java.time.LocalDateTime;

public record ExhibitionSimpleResponse(
        Long exhibitionId,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount
) {
}
