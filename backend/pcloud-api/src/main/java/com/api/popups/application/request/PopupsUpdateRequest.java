package com.api.popups.application.request;

import com.domain.domains.common.Price;
import com.domain.domains.common.PublicTag;
import com.domain.domains.popups.domain.Popups;
import com.domain.domains.popups.domain.Tag;
import com.domain.domains.popups.domain.vo.AvailableTime;
import com.domain.domains.popups.domain.vo.Latitude;
import com.domain.domains.popups.domain.vo.Longitude;
import com.domain.domains.popups.domain.vo.StoreDetails;

import java.time.LocalDateTime;
import java.util.List;

public record PopupsUpdateRequest(
        String title,
        String description,
        String location,
        Boolean isParkingAvailable,
        int fee,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String openTimes,
        String latitude,
        String longitude,
        String publicTag,
        List<String> tags
) {

    public Popups toDomain(final Long memberId) {
        return Popups.builder()
                .ownerId(memberId)
                .storeDetails(StoreDetails.builder()
                        .title(title)
                        .description(description)
                        .location(location)
                        .isParkingAvailable(isParkingAvailable)
                        .fee(Price.from(fee))
                        .build())
                .availableTime(AvailableTime.builder()
                        .startDate(startDate)
                        .endDate(endDate)
                        .openTimes(openTimes)
                        .build())
                .latitude(Latitude.from(latitude))
                .longitude(Longitude.from(longitude))
                .publicTag(PublicTag.from(publicTag))
                .tags(makeTags(tags))
                .build();
    }

    public List<Tag> makeTags(final List<String> tags) {
        return tags.stream()
                .map(tag -> Tag.builder()
                        .name(tag)
                        .build()
                ).toList();
    }
}
