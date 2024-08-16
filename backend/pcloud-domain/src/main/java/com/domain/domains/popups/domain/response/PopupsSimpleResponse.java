package com.domain.domains.popups.domain.response;

import java.time.LocalDateTime;

public record PopupsSimpleResponse(
        Long id,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount
) {
}
