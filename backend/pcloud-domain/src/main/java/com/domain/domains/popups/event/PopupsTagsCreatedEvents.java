package com.domain.domains.popups.event;

import com.domain.domains.common.CustomTagType;

import java.util.List;

public record PopupsTagsCreatedEvents(
        Long popupsId,
        List<String> tags,
        CustomTagType type
) {
}
