package com.domain.show.common;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Embeddable
public class ShowRules {

    @Column(nullable = false)
    private Boolean isParkingAvailable;

    @Column(nullable = false)
    private Boolean isFoodAllowed;

    @Column(nullable = false)
    private Boolean isPetAllowed;

    @Column(nullable = false)
    private Boolean isKidsZone;

    @Column(nullable = false)
    private Boolean isWifiAvailable;

    @Embedded
    @AttributeOverride(name = "value", column = @Column(name = "fee", nullable = false))
    private Price fee;

    public static ShowRules of(
            final boolean isParkingAvailable,
            final boolean isFoodAllowed,
            final boolean isPetAllowed,
            final boolean isKidsZone,
            final boolean isWifiAvailable,
            final int fee
    ) {
        return ShowRules.builder()
                .isParkingAvailable(isParkingAvailable)
                .isFoodAllowed(isFoodAllowed)
                .isPetAllowed(isPetAllowed)
                .isKidsZone(isKidsZone)
                .isWifiAvailable(isWifiAvailable)
                .fee(Price.from(fee))
                .build();
    }
}
