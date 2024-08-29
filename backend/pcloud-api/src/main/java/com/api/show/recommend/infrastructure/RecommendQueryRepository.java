package com.api.show.recommend.infrastructure;

import com.domain.show.common.ShowType;
import com.domain.show.recommend.domain.Recommend;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.domain.show.exhibition.domain.QExhibition.exhibition;
import static com.domain.show.popups.domain.QPopups.popups;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class RecommendQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<Recommend> findAllFromStartDateToEndDateWithLimitByShowTypes(LocalDateTime startDate, LocalDateTime endDate, final List<ShowType> showTypes) {
        List<Recommend> result = new ArrayList<>();

        startDate = startDate.toLocalDate().atTime(LocalTime.MIN);
        endDate = endDate.toLocalDate().atTime(LocalTime.MAX);

        if (showTypes.contains(ShowType.ALL)) {
            result.addAll(getPopups(startDate, endDate));
            result.addAll(getExhibition(startDate, endDate));
            return result;
        }

        for (ShowType showType : showTypes) {
            if (showType.equals(ShowType.POPUPS)) {
                result.addAll(getPopups(startDate, endDate));
            }

            if (showType.equals(ShowType.EXHIBITION)) {
                result.addAll(getExhibition(startDate, endDate));
            }
        }

        return result;
    }

    private List<Recommend> getPopups(final LocalDateTime startDate, final LocalDateTime endDate) {
        return jpaQueryFactory.select(constructor(Recommend.class,
                        popups.id,
                        Expressions.constant(ShowType.POPUPS),
                        popups.showDetails,
                        popups.showSchedule,
                        popups.statistic
                )).from(popups)
                .where(popups.createdAt.between(startDate, endDate))
                .fetch();
    }

    private List<Recommend> getExhibition(final LocalDateTime startDate, final LocalDateTime endDate) {
        return jpaQueryFactory.select(constructor(Recommend.class,
                        exhibition.id,
                        Expressions.constant(ShowType.EXHIBITION),
                        exhibition.showDetails,
                        exhibition.showSchedule,
                        exhibition.statistic
                )).from(exhibition)
                .where(exhibition.createdAt.between(startDate, endDate))
                .fetch();
    }
}
