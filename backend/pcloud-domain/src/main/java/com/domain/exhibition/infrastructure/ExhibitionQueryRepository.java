package com.domain.exhibition.infrastructure;

import com.domain.common.CustomTagType;
import com.domain.exhibition.infrastructure.dto.ExhibitionSimpleResponse;
import com.domain.exhibition.infrastructure.dto.ExhibitionSpecificResponse;
import com.domain.popups.domain.response.CustomTagSimpleResponse;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.domain.customtag.domain.QCustomTag.customTag;
import static com.domain.exhibition.domain.QExhibition.exhibition;
import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
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
                ).transform(groupBy(exhibition.id)
                        .list(constructor(ExhibitionSpecificResponse.class,
                                exhibition.id,
                                exhibition.ownerId,
                                exhibition.exhibitionDetails.title,
                                exhibition.exhibitionDetails.description,
                                exhibition.exhibitionSchedule.startDate,
                                exhibition.exhibitionSchedule.endDate,
                                exhibition.exhibitionSchedule.openTimes,
                                exhibition.position.location,
                                exhibition.position.latitude.value,
                                exhibition.position.longitude.value,
                                exhibition.exhibitionRules.isParkingAvailable,
                                exhibition.exhibitionRules.isFoodAllowed,
                                exhibition.exhibitionRules.isPetAllowed,
                                exhibition.exhibitionRules.isKidsZone,
                                exhibition.exhibitionRules.isWifiAvailable,
                                exhibition.exhibitionRules.fee.value,
                                exhibition.statistic.visitedCount,
                                exhibition.statistic.likedCount,
                                exhibition.publicTag,
                                list(constructor(CustomTagSimpleResponse.class,
                                        customTag.name))
                        ))
                );

        if (result.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(result.get(0));
    }

    public List<ExhibitionSimpleResponse> findAllWithPaging(final Long exhibitionId, final Integer pageSize) {
        return jpaQueryFactory.select(constructor(ExhibitionSimpleResponse.class,
                        exhibition.id,
                        exhibition.exhibitionDetails.title,
                        exhibition.exhibitionDetails.description,
                        exhibition.exhibitionSchedule.startDate,
                        exhibition.exhibitionSchedule.endDate,
                        exhibition.statistic.visitedCount,
                        exhibition.statistic.likedCount
                )).from(exhibition)
                .where(ltExhibitionId(exhibitionId))
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

}
