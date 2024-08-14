package com.domain.domains.popups.domain.response;

import com.domain.domains.common.PublicTag;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class PopupsSpecificResponse {

    private final Long id;
    private final Long ownerId;
    private final String title;
    private final String description;
    private final String location;
    private final Boolean isParkingAvailable;
    private final BigDecimal fee;
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;
    private final String openTimes;
    private final BigDecimal latitude;
    private final BigDecimal longitude;
    private final String publicTag;
    private final List<String> tags;

    public PopupsSpecificResponse(
            final Long id,
            final Long ownerId,
            final String title,
            final String description,
            final String location,
            final Boolean isParkingAvailable,
            final BigDecimal fee,
            final LocalDateTime startDate,
            final LocalDateTime endDate,
            final String openTimes,
            final BigDecimal latitude,
            final BigDecimal longitude,
            final PublicTag publicTag,
            final List<CustomTagSimpleResponse> tags
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.location = location;
        this.isParkingAvailable = isParkingAvailable;
        this.fee = fee;
        this.startDate = startDate;
        this.endDate = endDate;
        this.openTimes = openTimes;
        this.latitude = latitude;
        this.longitude = longitude;
        this.publicTag = publicTag.getName();
        this.tags = tags.stream()
                .map(CustomTagSimpleResponse::name)
                .toList();
    }
}
