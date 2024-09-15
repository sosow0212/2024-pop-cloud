package com.domain.show.exhibition.event;

public record ExhibitionFoundEvent(
        Long exhibitionId,
        String clientIp
) {
}
