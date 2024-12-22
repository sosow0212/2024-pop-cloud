package com.api.show.image.application;

import com.api.show.common.event.ImageCreatedEvent;
import com.api.show.common.event.ImageDeletedEvent;
import com.api.show.common.event.ImageUpdatedEvent;
import com.domain.common.ShowType;
import com.domain.show.common.image.domain.Image;
import com.domain.show.common.image.domain.ImageRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ImageService {

    private final ImageRepository imageRepository;
    private final ImageProcessor imageProcessor;

    @Transactional
    @EventListener(value = ImageCreatedEvent.class)
    public void createImages(final ImageCreatedEvent event) {
        List<Image> images = generateImages(
                event.targetId(),
                event.showType(),
                event.imageNames()
        );
        saveNewImages(images);
    }

    private List<Image> generateImages(
            final Long targetId,
            final ShowType showType,
            final List<String> imageNames
    ) {
        return imageNames.stream()
                .map(imageName -> Image.of(targetId, showType, imageName)).toList();
    }

    private void saveNewImages(final List<Image> images) {
        if (images != null && !images.isEmpty()) {
            imageRepository.saveAll(images);
        }
    }

    @Transactional
    @EventListener(value = ImageUpdatedEvent.class)
    public void updateImages(final ImageUpdatedEvent event) {
        List<Image> images = generateImages(
                event.targetId(),
                event.showType(),
                event.imageNames()
        );
        deleteOldImages(event.targetId(), event.showType());
        saveNewImages(images);
    }

    private void deleteOldImages(final Long targetId, final ShowType showType) {
        deleteUploadedOldImages(targetId, showType);
        deleteSavedOldImages(targetId, showType);
    }

    private void deleteUploadedOldImages(final Long targetId, final ShowType showType) {
        List<String> uniqueImageNamesToDelete = imageRepository.findImageNamesByTargetIdAndShowType(
                targetId,
                showType
        );
        imageProcessor.deleteImagesByUniqueNames(uniqueImageNamesToDelete);
    }

    private void deleteSavedOldImages(final Long targetId, final ShowType showType) {
        imageRepository.deleteAllByTargetIdAndShowType(targetId, showType);
    }

    @Transactional
    @EventListener(value = ImageDeletedEvent.class)
    public void deleteOldImages(final ImageDeletedEvent event) {
        deleteOldImages(event.targetId(), event.showType());
    }
}
