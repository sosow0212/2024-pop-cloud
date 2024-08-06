package com.domain.domains.popups.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Coordinate {

    // 위도
    @Column(nullable = true)
    private BigDecimal latitude;

    // 경도
    @Column(nullable = true)
    private BigDecimal longitude;
}
