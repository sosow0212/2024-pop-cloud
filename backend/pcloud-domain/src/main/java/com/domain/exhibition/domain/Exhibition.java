package com.domain.exhibition.domain;

import com.common.exception.AuthException;
import com.domain.common.ShowRules;
import com.domain.global.domain.BaseEntity;
import com.domain.common.PublicTag;
import com.domain.common.ShowDetails;
import com.domain.common.ShowSchedule;
import com.domain.common.Position;
import com.domain.popups.domain.vo.Statistic;
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
            final long ownerId,
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
                .ownerId(ownerId)
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
        validateOwnerEquals(updateExhibition.ownerId);
        this.showDetails = updateExhibition.showDetails;
        this.showSchedule = updateExhibition.showSchedule;
        this.position = updateExhibition.position;
        this.showRules = updateExhibition.showRules;
        this.statistic = updateExhibition.statistic;
        this.publicTag = updateExhibition.publicTag;
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
