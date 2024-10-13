package com.domain.map.domain;

import com.domain.common.coordinates.Latitude;
import com.domain.common.coordinates.Longitude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class CoordinateRange {

    private Latitude minLatitude;
    private Latitude maxLatitude;
    private Longitude minLongitude;
    private Longitude maxLongitude;

    public static CoordinateRange of(
            final BigDecimal latitude,
            final BigDecimal longitude,
            final BigDecimal latitudeDelta,
            final BigDecimal longitudeDelta
    ) {
        Latitude minLatitude = Latitude.from(latitude.subtract(latitudeDelta));
        Latitude maxLatitude = Latitude.from(latitude.add(latitudeDelta));
        Longitude minLongitude = Longitude.from(longitude.subtract(longitudeDelta));
        Longitude maxLongitude = Longitude.from(longitude.add(longitudeDelta));

        return new CoordinateRange(minLatitude, maxLatitude, minLongitude, maxLongitude);
    }
}
