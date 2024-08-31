package com.domain.show.popups.event;

public record PopupsFoundEvent(
        Long popupsId,
        String clientIp
) {
}
