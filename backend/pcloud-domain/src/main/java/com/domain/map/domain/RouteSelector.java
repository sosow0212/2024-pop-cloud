package com.domain.map.domain;

import com.domain.map.domain.service.PathFinder;
import com.domain.map.domain.vo.Coordinate;
import com.domain.map.domain.vo.RecommendType;
import com.domain.map.domain.vo.ShowIdentifier;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class RouteSelector {

    private final RecommendType recommendType;
    private final Coordinate myCoordinate;
    private final ShowIdentifiers showIdentifiers;

    public static RouteSelector of(
            final RecommendType recommendType,
            final BigDecimal myLatitude,
            final BigDecimal myLongitude,
            final List<ShowIdentifier> showIdentifiers
    ) {
        return new RouteSelector(
                recommendType,
                Coordinate.of(myLatitude, myLongitude),
                ShowIdentifiers.from(showIdentifiers)
        );
    }

    public void sortByStrategy(final PathFinder pathFinder) {
        pathFinder.work(
                recommendType,
                myCoordinate,
                showIdentifiers
        );
    }
}
