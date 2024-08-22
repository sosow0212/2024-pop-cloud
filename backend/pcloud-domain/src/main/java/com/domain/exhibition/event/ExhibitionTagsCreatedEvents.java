package com.domain.exhibition.event;

import com.domain.common.CustomTagType;
import java.util.List;

public record ExhibitionTagsCreatedEvents(
        Long exhibitionId,
        List<String> tags,
        CustomTagType type
) {
}
