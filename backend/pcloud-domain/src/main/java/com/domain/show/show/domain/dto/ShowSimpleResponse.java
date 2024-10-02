package com.domain.show.show.domain.dto;

import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowType;

import java.time.LocalDateTime;

public record ShowSimpleResponse(
        Long showId,
        ShowType showType,
        String publicTag,
        String title,
        String location,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Integer visitedCount,
        Integer likedCount
) {

    public ShowSimpleResponse(final Long showId, final ShowType showType, final PublicTag publicTag, final String title, final String location, final LocalDateTime startDate, final LocalDateTime endDate, final Integer visitedCount, final Integer likedCount) {
        this(
                showId,
                showType,
                publicTag.getName(),
                title,
                location,
                startDate,
                endDate,
                visitedCount,
                likedCount
        );
    }
}
