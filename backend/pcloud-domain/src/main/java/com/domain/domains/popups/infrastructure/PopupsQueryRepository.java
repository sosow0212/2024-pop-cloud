package com.domain.domains.popups.infrastructure;

import com.domain.domains.popups.domain.response.PopupsSimpleResponse;
import com.domain.domains.popups.domain.response.PopupsSpecificResponse;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.domain.domains.popups.domain.QPopups.popups;
import static com.querydsl.core.types.Projections.constructor;

@RequiredArgsConstructor
@Repository
public class PopupsQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public Optional<PopupsSpecificResponse> findSpecificById(final Long popupsId) {
        return Optional.ofNullable(
                jpaQueryFactory.select(
                                constructor(PopupsSpecificResponse.class,
                                        popups.id,
                                        popups.ownerId,
                                        popups.storeDetails.title,
                                        popups.storeDetails.description,
                                        popups.storeDetails.location,
                                        popups.storeDetails.isParkingAvailable,
                                        popups.storeDetails.fee.value,
                                        popups.availableTime.startDate,
                                        popups.availableTime.endDate,
                                        popups.availableTime.openTimes,
                                        popups.latitude.value,
                                        popups.longitude.value,
                                        popups.publicTag
                                )).from(popups)
                        .where(popups.id.eq(popupsId))
                        .fetchOne()
        );
    }

    public List<PopupsSimpleResponse> findAllWithPaging(final Long popupsId, final Integer pageSize) {
        return jpaQueryFactory.select(Projections.constructor(PopupsSimpleResponse.class,
                        popups.id,
                        popups.storeDetails.title,
                        popups.storeDetails.location,
                        popups.availableTime.startDate,
                        popups.availableTime.endDate
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
