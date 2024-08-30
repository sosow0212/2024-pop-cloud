package com.domain.show.popups.event;

import com.domain.common.CustomTagType;

import java.util.List;

public record PopupsTagsUpdatedEvent(
        Long popupsId,
        List<String> tags,
        CustomTagType type
) {
}
