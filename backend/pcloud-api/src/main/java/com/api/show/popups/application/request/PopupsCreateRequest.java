package com.api.show.popups.application.request;

import com.domain.show.popups.domain.Popups;
import java.time.LocalDateTime;
import java.util.List;

public record PopupsCreateRequest(
        String title,
        String description,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String openTimes,
        String location,
        String latitude,
        String longitude,
        Boolean isParkingAvailable,
        Boolean isFoodAllowed,
        Boolean isPetAllowed,
        Boolean isKidsZone,
        Boolean isWifiAvailable,
        Integer fee,
        String publicTag,
        List<String> tags
) {

    public Popups toDomain(final Long memberId) {
        return Popups.of(
                memberId,
                title,
                description,
                startDate,
                endDate,
                openTimes,
                location,
                latitude,
                longitude,
                isParkingAvailable,
                isFoodAllowed,
                isPetAllowed,
                isKidsZone,
                isWifiAvailable,
                fee,
                publicTag
        );
    }
}
