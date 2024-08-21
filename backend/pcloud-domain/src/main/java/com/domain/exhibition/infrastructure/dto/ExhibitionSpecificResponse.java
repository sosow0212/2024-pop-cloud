package com.domain.exhibition.infrastructure.dto;

import com.domain.common.PublicTag;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;

@Getter
public class ExhibitionSpecificResponse {

    private final Long exhibitionId;
    private final Long ownerId;
    private final String title;
    private final String description;
    private final LocalDateTime startDate;
    private final LocalDateTime endDate;
    private final String openTimes;
    private final String location;
    private final BigDecimal latitude;
    private final BigDecimal longitude;
    private final Boolean isParkingAvailable;
    private final Boolean isFoodAllowed;
    private final Boolean isPetAllowed;
    private final Boolean isKidsZone;
    private final Boolean isWifiAvailable;
    private final BigDecimal fee;
    private final String publicTag;
    private final Integer visitedCount;
    private final Integer likedCount;
    private final List<String> tags;

    public ExhibitionSpecificResponse(
            final Long exhibitionId,
            final Long ownerId,
            final String title,
            final String description,
            final LocalDateTime startDate,
            final LocalDateTime endDate,
            final String openTimes,
            final String location,
            final BigDecimal latitude,
            final BigDecimal longitude,
            final Boolean isParkingAvailable,
            final Boolean isFoodAllowed,
            final Boolean isPetAllowed,
            final Boolean isKidsZone,
            final Boolean isWifiAvailable,
            final BigDecimal fee,
            final PublicTag publicTag,
            final Integer visitedCount,
            final Integer likedCount,
            final List<String> tags
    ) {
        this.exhibitionId = exhibitionId;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.openTimes = openTimes;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isParkingAvailable = isParkingAvailable;
        this.isFoodAllowed = isFoodAllowed;
        this.isPetAllowed = isPetAllowed;
        this.isKidsZone = isKidsZone;
        this.isWifiAvailable = isWifiAvailable;
        this.fee = fee;
        this.publicTag = publicTag.getName();
        this.visitedCount = visitedCount;
        this.likedCount = likedCount;
        this.tags = tags;
    }
}
