package com.api.map.infrastructure;

import com.domain.map.domain.CoordinateRange;
import com.domain.map.domain.vo.SearchTarget;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.domain.show.exhibition.domain.QExhibition.exhibition;
import static com.domain.show.popups.domain.QPopups.popups;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class MapQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<ShowsCoordinateSimpleResponse> findShowsAroundLocation(final CoordinateRange coordinateRange) {
        List<ShowsCoordinateSimpleResponse> popups = findPopups(coordinateRange);
        List<ShowsCoordinateSimpleResponse> exhibitions = findExhibitions(coordinateRange);
        return mergeShows(popups, exhibitions);
    }

    private List<ShowsCoordinateSimpleResponse> findPopups(final CoordinateRange coordinateRange) {
        return jpaQueryFactory.select(constructor(ShowsCoordinateSimpleResponse.class,
                        Expressions.constant(SearchTarget.POPUPS),
                        popups.id,
                        popups.showDetails.title,
                        popups.position,
                        popups.showSchedule.startDate,
                        popups.showSchedule.endDate,
                        popups.statistic.visitedCount,
                        popups.statistic.likedCount
                )).from(popups)
                .where(popups.position.latitude.value.between(coordinateRange.getMinLatitude().getValue(), coordinateRange.getMaxLatitude().getValue())
                        .and(popups.position.longitude.value.between(coordinateRange.getMinLongitude().getValue(), coordinateRange.getMaxLongitude().getValue())))
                .fetch();
    }

    private List<ShowsCoordinateSimpleResponse> findExhibitions(final CoordinateRange coordinateRange) {
        return jpaQueryFactory.select(constructor(ShowsCoordinateSimpleResponse.class,
                        Expressions.constant(SearchTarget.EXHIBITION),
                        exhibition.id,
                        exhibition.showDetails.title,
                        exhibition.position,
                        exhibition.showSchedule.startDate,
                        exhibition.showSchedule.endDate,
                        exhibition.statistic.visitedCount,
                        exhibition.statistic.likedCount
                )).from(exhibition)
                .where(exhibition.position.latitude.value.between(coordinateRange.getMinLatitude().getValue(), coordinateRange.getMaxLatitude().getValue())
                        .and(exhibition.position.longitude.value.between(coordinateRange.getMinLongitude().getValue(), coordinateRange.getMaxLongitude().getValue())))
                .fetch();
    }

    private List<ShowsCoordinateSimpleResponse> mergeShows(final List<ShowsCoordinateSimpleResponse> popups, final List<ShowsCoordinateSimpleResponse> exhibitions) {
        List<ShowsCoordinateSimpleResponse> mergedShows = new ArrayList<>();
        mergedShows.addAll(popups);
        mergedShows.addAll(exhibitions);
        return mergedShows;
    }
}
