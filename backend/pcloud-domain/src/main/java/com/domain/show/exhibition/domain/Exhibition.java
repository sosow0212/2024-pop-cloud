package com.domain.show.exhibition.domain;

import com.common.exception.AuthException;
import com.domain.show.common.ShowRules;
import com.domain.global.domain.BaseEntity;
import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowDetails;
import com.domain.show.common.ShowSchedule;
import com.domain.show.common.Position;
import com.domain.show.common.Statistic;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static com.common.exception.AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Exhibition extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ownerId;

    @Embedded
    private ShowDetails showDetails;

    @Embedded
    private ShowSchedule showSchedule;

    @Embedded
    private Position position;

    @Embedded
    private ShowRules showRules;

    @Embedded
    private Statistic statistic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PublicTag publicTag;

    public static Exhibition of(
            final long memberId,
            final String title,
            final String description,
            final LocalDateTime startDate,
            final LocalDateTime endDate,
            final String openTimes,
            final String location,
            final String latitude,
            final String longitude,
            final boolean isParkingAvailable,
            final boolean isFoodAllowed,
            final boolean isPetAllowed,
            final boolean isKidsZone,
            final boolean isWifiAvailable,
            final int fee,
            final String publicTag
    ) {
        return Exhibition.builder()
                .ownerId(memberId)
                .showDetails(ShowDetails.of(title, description))
                .showSchedule(ShowSchedule.of(
                        startDate,
                        endDate,
                        openTimes
                ))
                .position(Position.of(
                        location,
                        latitude,
                        longitude
                ))
                .showRules(ShowRules.of(
                        isParkingAvailable,
                        isFoodAllowed,
                        isPetAllowed,
                        isKidsZone,
                        isWifiAvailable,
                        fee
                ))
                .statistic(Statistic.createDefault())
                .publicTag(PublicTag.from(publicTag))
                .build();
    }

    public void update(final Exhibition updateExhibition) {
        validateOwnerEquals(updateExhibition.getOwnerId());
        this.showDetails = updateExhibition.getShowDetails();
        this.showSchedule = updateExhibition.getShowSchedule();
        this.position = updateExhibition.getPosition();
        this.showRules = updateExhibition.getShowRules();
        this.statistic = updateExhibition.getStatistic();
        this.publicTag = updateExhibition.getPublicTag();
    }

    public void validateOwnerEquals(final Long ownerId) {
        if (!this.getOwnerId().equals(ownerId)) {
            throw new AuthException(AUTH_NOT_EQUALS_EXCEPTION);
        }
    }

    public void addViewCount() {
        this.statistic.addVisitedCount();
    }

    public void addLikedCount(final boolean canAdd) {
        this.statistic.addLikedCount(canAdd);
    }
}
