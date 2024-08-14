package com.domain.domains.popups.domain;

import com.common.exception.AuthException;
import com.domain.domains.common.BaseEntity;
import com.domain.domains.common.Price;
import com.domain.domains.common.PublicTag;
import com.domain.domains.popups.domain.vo.AvailableTime;
import com.domain.domains.popups.domain.vo.Latitude;
import com.domain.domains.popups.domain.vo.Longitude;
import com.domain.domains.popups.domain.vo.StoreDetails;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private StoreDetails storeDetails;

    @Embedded
    private AvailableTime availableTime;

    @Embedded
    private Latitude latitude;

    @Embedded
    private Longitude longitude;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PublicTag publicTag;

    public static Popups of(
            final Long memberId,
            final String title,
            final String description,
            final String location,
            final Boolean isParkingAvailable,
            final Integer fee,
            final LocalDateTime startDate,
            final LocalDateTime endDate,
            final String openTimes,
            final String latitude,
            final String longitude,
            final String publicTag
    ) {
        return Popups.builder()
                .ownerId(memberId)
                .storeDetails(StoreDetails.builder()
                        .title(title)
                        .description(description)
                        .location(location)
                        .isParkingAvailable(isParkingAvailable)
                        .fee(Price.from(fee))
                        .build())
                .availableTime(AvailableTime.builder()
                        .startDate(startDate)
                        .endDate(endDate)
                        .openTimes(openTimes)
                        .build())
                .latitude(Latitude.from(latitude))
                .longitude(Longitude.from(longitude))
                .publicTag(PublicTag.from(publicTag))
                .build();
    }

    public void update(final Popups updatedPopups) {
        validateOwnerEquals(updatedPopups.getOwnerId());
        this.storeDetails = updatedPopups.storeDetails;
        this.availableTime = updatedPopups.availableTime;
        this.latitude = updatedPopups.latitude;
        this.longitude = updatedPopups.longitude;
        this.publicTag = updatedPopups.publicTag;
    }

    private void validateOwnerEquals(final Long ownerId) {
        if (!this.getOwnerId().equals(ownerId)) {
            throw new AuthException(AUTH_NOT_EQUALS_EXCEPTION);
        }
    }
}
