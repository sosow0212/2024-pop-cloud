package com.domain.exhibition.infrastructure.dto;

import java.time.LocalDateTime;

public record ExhibitionSimpleResponse(
        Long id,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount
) {
}
