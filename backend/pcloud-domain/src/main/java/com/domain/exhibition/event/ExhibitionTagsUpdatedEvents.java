package com.domain.exhibition.event;

import com.domain.common.CustomTagType;
import java.util.List;

public record ExhibitionTagsUpdatedEvents(
        Long exhibitionId,
        List<String> tags,
        CustomTagType type
) {
}
