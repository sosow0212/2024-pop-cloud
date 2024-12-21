package com.api.show.common.event;

import com.domain.common.ShowType;
import java.util.List;

public record ImageUpdatedEvent(
        ShowType showType,
        Long targetId,
        List<String> imageNames
) {

    public static ImageUpdatedEvent updatedPopupsImages(
            final Long targetId,
            final List<String> imageNames
    ) {
        return new ImageUpdatedEvent(
                ShowType.POPUPS,
                targetId,
                imageNames
        );
    }

    public static ImageUpdatedEvent updatedExhibitionImages(
            final Long targetId,
            final List<String> imageNames
    ) {
        return new ImageUpdatedEvent(
                ShowType.EXHIBITION,
                targetId,
                imageNames
        );
    }
}
