package com.domain.show.exhibition.event;

import com.domain.common.CustomTagType;

public record ExhibitionTagsDeletedEvent(
        Long exhibitionId,
        CustomTagType type
) {
}
