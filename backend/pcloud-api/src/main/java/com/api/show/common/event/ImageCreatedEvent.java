package com.api.show.common.event;

import com.domain.common.ShowType;
import java.util.List;

public record ImageCreatedEvent(
        ShowType showType,
        Long targetId,
        List<String> imageNames
) {
    public static ImageCreatedEvent createdPopupsImages(final Long targetId, final List<String> imageNames) {
        return new ImageCreatedEvent(ShowType.POPUPS, targetId, imageNames);
    }

    public static ImageCreatedEvent createdExhibitionImages(final Long targetId, final List<String> imageNames) {
        return new ImageCreatedEvent(ShowType.EXHIBITION, targetId, imageNames);
    }
}
