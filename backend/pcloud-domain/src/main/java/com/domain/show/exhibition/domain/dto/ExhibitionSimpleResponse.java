package com.domain.show.exhibition.domain.dto;

import com.domain.show.common.ShowType;

import java.time.LocalDateTime;

public record ExhibitionSimpleResponse(
        Long exhibitionId,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount,
        ShowType showType
) {

    public ExhibitionSimpleResponse(final Long exhibitionId, final String title, final String location, final LocalDateTime startDate, final LocalDateTime endDate, final Integer visitedCount, final Integer likedCount) {
        this(exhibitionId, title, location, startDate, endDate, visitedCount, likedCount, ShowType.EXHIBITION);
    }
}
