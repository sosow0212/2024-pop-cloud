package com.api.show.common.event;

import com.domain.common.ShowType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ImageCreatedEvent(
        ShowType showType,
        Long targetId,
        List<MultipartFile> images
) {

    public static ImageCreatedEvent createdPopupsImages(final Long targetId, final List<MultipartFile> images) {
        return new ImageCreatedEvent(ShowType.POPUPS, targetId, images);
    }

    public static ImageCreatedEvent createdExhibitionImages(final Long targetId, final List<MultipartFile> images) {
        return new ImageCreatedEvent(ShowType.EXHIBITION, targetId, images);
    }
}
