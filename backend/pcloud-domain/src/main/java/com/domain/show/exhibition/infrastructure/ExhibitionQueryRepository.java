package com.domain.show.exhibition.infrastructure;

import com.domain.common.CustomTagType;
import com.domain.common.ShowType;
import com.domain.show.exhibition.domain.dto.ExhibitionSpecificResponse;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.domain.customtag.domain.QCustomTag.customTag;
import static com.domain.show.common.image.domain.QImage.image;
import static com.domain.show.exhibition.domain.QExhibition.exhibition;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.set;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class ExhibitionQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Optional<ExhibitionSpecificResponse> findSpecificById(final Long exhibitionId) {
        List<ExhibitionSpecificResponse> result = jpaQueryFactory.selectFrom(exhibition)
                .where(exhibition.id.eq(exhibitionId))
                .leftJoin(customTag).on(
                        customTag.targetId.eq(exhibitionId),
                        customTag.type.eq(CustomTagType.PERSONAL_EXHIBITION)
                )
                .leftJoin(image).on(
                        image.targetId.eq(exhibitionId),
                        image.showType.eq(ShowType.EXHIBITION)
                )
                .transform(groupBy(exhibition.id)
                        .list(constructor(ExhibitionSpecificResponse.class,
                                exhibition.id,
                                exhibition.ownerId,
                                exhibition.showDetails.title,
                                exhibition.showDetails.description,
                                exhibition.showSchedule.startDate,
                                exhibition.showSchedule.endDate,
                                exhibition.showSchedule.openTimes,
                                exhibition.position.location,
                                exhibition.position.latitude.value,
                                exhibition.position.longitude.value,
                                exhibition.showRules.isParkingAvailable,
                                exhibition.showRules.isFoodAllowed,
                                exhibition.showRules.isPetAllowed,
                                exhibition.showRules.isKidsZone,
                                exhibition.showRules.isWifiAvailable,
                                exhibition.showRules.fee.value,
                                exhibition.publicTag,
                                exhibition.statistic.visitedCount,
                                exhibition.statistic.likedCount,
                                set(customTag.name),
                                set(image.name)
                        ))
                );

        if (result.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(result.get(0));
    }
}
