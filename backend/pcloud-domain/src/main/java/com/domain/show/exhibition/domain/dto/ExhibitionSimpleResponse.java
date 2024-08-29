package com.domain.show.exhibition.domain.dto;

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
