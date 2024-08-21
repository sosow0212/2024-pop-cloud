package com.domain.popups.event;

import com.domain.common.CustomTagType;

import java.util.List;

public record PopupsTagsUpdatedEvents(
        Long popupsId,
        List<String> tags,
        CustomTagType type
) {
}