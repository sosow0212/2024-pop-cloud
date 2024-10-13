package com.domain.show.popups.domain;

import com.common.exception.AuthException;
import com.domain.common.coordinates.Position;
import com.domain.global.domain.BaseEntity;
import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowDetails;
import com.domain.show.common.ShowRules;
import com.domain.show.common.ShowSchedule;
import com.domain.show.common.Statistic;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static com.common.exception.AuthExceptionType.AUTH_NOT_EQUALS_EXCEPTION;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Popups extends BaseEntity {

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

    @Version
    private Long version;

    public static Popups of(
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
        return Popups.builder()
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

    public void update(final Popups updatedPopups) {
        validateOwnerEquals(updatedPopups.getOwnerId());
        this.showDetails = updatedPopups.getShowDetails();
        this.showSchedule = updatedPopups.getShowSchedule();
        this.position = updatedPopups.getPosition();
        this.showRules = updatedPopups.getShowRules();
        this.statistic = updatedPopups.getStatistic();
        this.publicTag = updatedPopups.getPublicTag();
    }

    private void validateOwnerEquals(final Long ownerId) {
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
