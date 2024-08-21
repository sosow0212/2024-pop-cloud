package com.domain.exhibition.infrastructure.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ExhibitionSpecificResponse(
        Long exhibitionId,
        Long ownerId,
        String title,
        String description,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String openTimes,
        String location,
        BigDecimal latitude,
        BigDecimal longitude,
        Boolean isParkingAvailable,
        Boolean isFoodAllowed,
        Boolean isPetAllowed,
        Boolean isKidsZone,
        Boolean isWifiAvailable,
        BigDecimal fee,
        String publicTag,
        List<String> tags
) {
}
