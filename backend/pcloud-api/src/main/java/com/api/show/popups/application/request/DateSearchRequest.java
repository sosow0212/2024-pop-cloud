package com.api.show.popups.application.request;

import com.domain.show.common.ShowType;

import java.time.LocalDateTime;
import java.util.List;

public record DateSearchRequest(
        int limit,
        LocalDateTime startDate,
        LocalDateTime endDate,
        List<ShowType> target
) {
}
