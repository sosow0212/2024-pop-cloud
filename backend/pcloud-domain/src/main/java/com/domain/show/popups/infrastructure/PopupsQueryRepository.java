package com.domain.show.popups.infrastructure;

import com.domain.common.CustomTagType;
import com.domain.common.ShowType;
import com.domain.show.popups.domain.response.PopupsSpecificResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.domain.customtag.domain.QCustomTag.customTag;
import static com.domain.show.common.image.domain.QImage.image;
import static com.domain.show.popups.domain.QPopups.popups;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.set;

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
                )
                .leftJoin(image).on(
                        image.targetId.eq(popupsId),
                        image.showType.eq(ShowType.POPUPS)
                )
                .transform(groupBy(popups.id)
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
                                        set(customTag.name),
                                        set(image.name)
                                )
                        ));

        if (result.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(result.get(0));
    }
}
