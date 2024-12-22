package com.domain.show.popups.event;

import com.domain.common.CustomTagType;

public record PopupsTagsDeletedEvent (
        Long popupsId,
        CustomTagType type
) {
}
