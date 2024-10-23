package com.api.show.common.event;

import com.domain.common.ShowType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ImageUpdatedEvent(
        ShowType showType,
        Long targetId,
        List<MultipartFile> addedImages,
        List<Long> deletedImageIds
) {

    public static ImageUpdatedEvent updatedPopupsImages(
            final Long targetId,
            final List<MultipartFile> addedImages,
            final List<Long> deletedImageIds
    ) {
        return new ImageUpdatedEvent(ShowType.POPUPS, targetId, addedImages, deletedImageIds);
    }

    public static ImageUpdatedEvent updatedExhibitionImages(
            final Long targetId,
            final List<MultipartFile> addedImages,
            final List<Long> deletedImageIds
    ) {
        return new ImageUpdatedEvent(ShowType.EXHIBITION, targetId, addedImages, deletedImageIds);
    }
}
