package com.domain.show.popups.domain.response;

import com.domain.common.ShowType;

import java.time.LocalDateTime;

public record PopupsSimpleResponse(
        Long id,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount,
        ShowType showType
) {

    public PopupsSimpleResponse(final Long id, final String title, final String location, final LocalDateTime startDate, final LocalDateTime endDate, final Integer visitedCount, final Integer likedCount) {
        this(id, title, location, startDate, endDate, visitedCount, likedCount, ShowType.POPUPS);
    }
}
