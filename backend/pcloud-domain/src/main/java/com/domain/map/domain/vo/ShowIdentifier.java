package com.domain.map.domain.vo;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@EqualsAndHashCode(of = {"id", "searchTarget"})
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ShowIdentifier {

    private final Long id;
    private final SearchTarget searchTarget;
    private final String title;
    private final String location;
    private final Coordinate coordinate;
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;
    private final Integer visitedCount;
    private final Integer likedCount;

    public static ShowIdentifier of(
            final Long id,
            final SearchTarget searchTarget,
            final String title,
            final String location,
            final BigDecimal latitude,
            final BigDecimal longitude,
            final LocalDateTime startDate,
            final LocalDateTime endDate,
            final Integer visitedCount,
            final Integer likedCount
    ) {
        return new ShowIdentifier(
                id,
                searchTarget,
                title,
                location,
                Coordinate.of(latitude, longitude),
                startDate,
                endDate,
                visitedCount,
                likedCount
        );
    }
}
