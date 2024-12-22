package com.api.show.common.event;

import com.domain.common.ShowType;

public record ImageDeletedEvent(
        ShowType showType,
        Long targetId
) {

    public static ImageDeletedEvent deletedPopupsImages(final Long targetId) {
        return new ImageDeletedEvent(ShowType.POPUPS, targetId);
    }

    public static ImageDeletedEvent deletedExhibitionImages(final Long targetId) {
        return new ImageDeletedEvent(ShowType.EXHIBITION, targetId);
    }
}
