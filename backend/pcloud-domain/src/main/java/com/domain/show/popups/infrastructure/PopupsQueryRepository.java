package com.domain.show.popups.infrastructure;

import com.domain.common.CustomTagType;
import com.domain.show.popups.domain.response.PopupsSimpleResponse;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.domain.customtag.domain.QCustomTag.customTag;
import static com.domain.show.popups.domain.QPopups.popups;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class PopupsQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Optional<PopupsSpecificResponse> findSpecificById(final Long popupsId) {
        List<PopupsSpecificResponse> result = jpaQueryFactory.selectFrom(popups)
                .where(popups.id.eq(popupsId))
                .leftJoin(customTag).on(
                        customTag.targetId.eq(popupsId),
                        customTag.type.eq(CustomTagType.POPUPS)
                ).transform(groupBy(popups.id)
                        .list(Projections.constructor(PopupsSpecificResponse.class,
                                        popups.id,
                                        popups.ownerId,
                                        popups.showDetails.title,
                                        popups.showDetails.description,
                                        popups.showSchedule.startDate,
                                        popups.showSchedule.endDate,
                                        popups.showSchedule.openTimes,
                                        popups.position.location,
                                        popups.position.latitude.value,
                                        popups.position.longitude.value,
                                        popups.showRules.isParkingAvailable,
                                        popups.showRules.isFoodAllowed,
                                        popups.showRules.isPetAllowed,
                                        popups.showRules.isKidsZone,
                                        popups.showRules.isWifiAvailable,
                                        popups.showRules.fee.value,
                                        popups.publicTag,
                                        popups.statistic.visitedCount,
                                        popups.statistic.likedCount,
                                        list(customTag.name)
                                )
                        ));

        if (result.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(result.get(0));
    }

    public List<PopupsSimpleResponse> findAllWithPaging(final Long popupsId, final Integer pageSize) {
        return jpaQueryFactory.select(constructor(PopupsSimpleResponse.class,
                        popups.id,
                        popups.showDetails.title,
                        popups.position.location,
                        popups.showSchedule.startDate,
                        popups.showSchedule.endDate,
                        popups.statistic.visitedCount,
                        popups.statistic.likedCount
                )).from(popups)
                .where(ltPopupsId(popupsId))
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
}
