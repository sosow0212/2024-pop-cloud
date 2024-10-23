package com.api.show.image.infrastructure;

import com.api.show.image.application.ImageUploader;
import com.domain.show.common.image.domain.Image;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Profile("prod")
@RequiredArgsConstructor
@Component
public class ImageProdUploader implements ImageUploader {

    // TODO : S3 추가시 작업

    @Override
    public void upload(final List<Image> convertedImages, final List<MultipartFile> originImageFiles) {

    }

    @Override
    public void deleteAll(final List<String> deletedImageUniqueNames) {

    }
}
