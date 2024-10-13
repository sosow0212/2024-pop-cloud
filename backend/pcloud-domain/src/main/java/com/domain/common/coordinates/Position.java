package com.domain.common.coordinates;

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
public class Position {

    @Column(nullable = false)
    private String location;

    @Embedded
    private Latitude latitude;

    @Embedded
    private Longitude longitude;

    public static Position of(
            final String location,
            final String latitude,
            final String longitude
    ) {
        return Position.builder()
                .location(location)
                .latitude(Latitude.from(latitude))
                .longitude(Longitude.from(longitude))
                .build();
    }

    public static Position of(
            final String location,
            final Latitude latitude,
            final Longitude longitude
    ) {
        return Position.builder()
                .location(location)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
