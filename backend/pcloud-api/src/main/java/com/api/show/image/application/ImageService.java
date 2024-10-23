package com.api.show.image.application;

import com.api.show.common.event.ImageCreatedEvent;
import com.api.show.common.event.ImageUpdatedEvent;
import com.domain.common.ShowType;
import com.domain.show.common.image.domain.Image;
import com.domain.show.common.image.domain.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class ImageService {

    private final ImagePreProcessor imagePreProcessor;
    private final ImageUploader imageUploader;
    private final ImageRepository imageRepository;

    @Transactional
    @EventListener(value = ImageCreatedEvent.class)
    public void createImages(final ImageCreatedEvent event) {
        List<Image> images = saveAddedImages(
                event.showType(),
                event.targetId(),
                event.images()
        );

        handleImage(images, event);
    }

    private List<Image> saveAddedImages(
            final ShowType showType,
            final Long targetId,
            final List<MultipartFile> addedImages
    ) {
        if (Objects.isNull(addedImages) || addedImages.isEmpty()) {
            return Collections.emptyList();
        }

        List<Image> convertedAddedImages = imagePreProcessor.convertMultipartFileToImage(
                showType,
                targetId,
                addedImages
        );
        imageRepository.saveAll(convertedAddedImages);
        return convertedAddedImages;
    }

    @Async
    public void handleImage(final List<Image> images, final ImageCreatedEvent event) {
        imageUploader.upload(images, event.images());
    }

    @Transactional
    @EventListener(value = ImageUpdatedEvent.class)
    public void updateImages(final ImageUpdatedEvent event) {
        List<String> deletedImageUniqueNames = deleteImages(event.deletedImageIds());

        List<Image> convertedAddedImages = saveAddedImages(
                event.showType(),
                event.targetId(),
                event.addedImages()
        );

        updateImages(deletedImageUniqueNames, event.addedImages(), convertedAddedImages);
    }

    private List<String> deleteImages(final List<Long> deletedImageIds) {
        List<Image> foundDeletedImages = imageRepository.findAllByIdIn(deletedImageIds);
        List<String> deletedImageUniqueNames = foundDeletedImages.stream()
                .map(Image::getUniqueName)
                .toList();
        imageRepository.deleteAll(foundDeletedImages);
        return deletedImageUniqueNames;
    }

    @Async
    public void updateImages(
            final List<String> deletedImageUniqueNames,
            final List<MultipartFile> addedImages,
            final List<Image> convertedAddedImages
    ) {
        imageUploader.deleteAll(deletedImageUniqueNames);
        imageUploader.upload(convertedAddedImages, addedImages);
    }
}
