package com.domain.domains.popups.domain.vo;

import com.domain.domains.common.Price;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Embedded;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class StoreDetails {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Boolean isParkingAvailable;

    @Embedded
    @AttributeOverride(name = "price", column = @Column(name = "fee", nullable = false))
    private Price fee;
}
