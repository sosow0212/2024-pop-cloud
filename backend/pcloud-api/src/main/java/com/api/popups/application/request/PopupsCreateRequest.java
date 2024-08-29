package com.api.popups.application.request;

import com.domain.show.popups.domain.Popups;

import java.time.LocalDateTime;
import java.util.List;

public record PopupsCreateRequest(
        String title,
        String description,
        String location,
        Boolean isParkingAvailable,
        Integer fee,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String openTimes,
        String latitude,
        String longitude,
        String publicTag,
        List<String> tags
) {

    public Popups toDomain(final Long memberId) {
        return Popups.of(
                memberId,
                title,
                description,
                location,
                isParkingAvailable,
                fee,
                startDate,
                endDate,
                openTimes,
                latitude,
                longitude,
                publicTag
        );
    }
}
