package com.domain.show.show.infrastructure;

import com.domain.common.ShowType;
import com.domain.show.common.PublicTag;
import com.domain.show.show.domain.dto.ShowSimpleResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

import static com.domain.show.exhibition.domain.QExhibition.exhibition;
import static com.domain.show.popups.domain.QPopups.popups;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class ShowQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<ShowSimpleResponse> findAllWithPaging(
            final Long showId,
            final Integer pageSize,
            final ShowType showType,
            final List<PublicTag> publicTags,
            final List<String> cities,
            final LocalDateTime startDate,
            final LocalDateTime endDate
    ) {
        if (showType.equals(ShowType.EXHIBITION)) {
            return fetchExhibition(showId, pageSize, publicTags, cities, startDate, endDate);
        }

        return fetchPopups(showId, pageSize, publicTags, cities, startDate, endDate);
    }

    private List<ShowSimpleResponse> fetchExhibition(final Long showId, final Integer pageSize, final List<PublicTag> publicTags, final List<String> cities, final LocalDateTime startDate, final LocalDateTime endDate) {
        return jpaQueryFactory.select(constructor(ShowSimpleResponse.class,
                        exhibition.id,
                        Expressions.constant(ShowType.EXHIBITION),
                        exhibition.publicTag,
                        exhibition.showDetails.title,
                        exhibition.position.location,
                        exhibition.showSchedule.startDate,
                        exhibition.showSchedule.endDate,
                        exhibition.statistic.visitedCount,
                        exhibition.statistic.likedCount
                )).from(exhibition)
                .where(
                        ltExhibitionId(showId),
                        eqPublicTags(publicTags),
                        eqCities(cities),
                        exhibition.showSchedule.endDate.between(startDate, endDate)
                )
                .orderBy(exhibition.id.desc())
                .limit(pageSize)
                .fetch();
    }

    private BooleanExpression ltExhibitionId(final Long exhibitionId) {
        if (exhibitionId == null) {
            return null;
        }

        return exhibition.id.lt(exhibitionId);
    }

    private BooleanExpression eqPublicTags(final List<PublicTag> publicTags) {
        if (publicTags.isEmpty()) {
            return null;
        }

        return exhibition.publicTag.in(publicTags);
    }

    private BooleanExpression eqCities(final List<String> cities) {
        if (cities.isEmpty()) {
            return null;
        }

        return cities.stream()
                .map(exhibition.position.location::startsWith)
                .reduce(BooleanExpression::or)
                .orElse(null);
    }

    private List<ShowSimpleResponse> fetchPopups(final Long showId, final Integer pageSize, final List<PublicTag> publicTags, final List<String> cities, final LocalDateTime startDate, final LocalDateTime endDate) {
        return jpaQueryFactory.select(constructor(ShowSimpleResponse.class,
                        popups.id,
                        Expressions.constant(ShowType.POPUPS),
                        popups.publicTag,
                        popups.showDetails.title,
                        popups.position.location,
                        popups.showSchedule.startDate,
                        popups.showSchedule.endDate,
                        popups.statistic.visitedCount,
                        popups.statistic.likedCount
                )).from(popups)
                .where(
                        ltPopupsId(showId),
                        eqPublicTagsWithPopups(publicTags),
                        eqCitiesWithPopups(cities),
                        popups.showSchedule.endDate.between(startDate, endDate)
                )
                .orderBy(popups.id.desc())
                .limit(pageSize)
                .fetch();
    }

    private BooleanExpression ltPopupsId(final Long popupsId) {
        if (popupsId == null) {
            return null;
        }

        return popups.id.lt(popupsId);
    }

    private BooleanExpression eqPublicTagsWithPopups(final List<PublicTag> publicTags) {
        if (publicTags.isEmpty()) {
            return null;
        }

        return popups.publicTag.in(publicTags);
    }

    private BooleanExpression eqCitiesWithPopups(final List<String> cities) {
        if (cities.isEmpty()) {
            return null;
        }

        return cities.stream()
                .map(popups.position.location::startsWith)
                .reduce(BooleanExpression::or)
                .orElse(null);
    }
}
