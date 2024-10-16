package com.domain.map.domain.vo;

import com.domain.common.coordinates.Latitude;
import com.domain.common.coordinates.Longitude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class Coordinate {

    private final Latitude latitude;
    private final Longitude longitude;

    public static Coordinate of(final BigDecimal latitude, final BigDecimal longitude) {
        return new Coordinate(Latitude.from(latitude), Longitude.from(longitude));
    }
}
