package com.api.show.image.infrastructure;

import com.api.show.image.application.ImageUploader;
import com.domain.show.common.image.domain.Image;
import com.domain.show.common.image.exception.ImageException;
import com.domain.show.common.image.exception.ImageExceptionType;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.IntStream;

@Slf4j
@Profile("local")
@RequiredArgsConstructor
@Component
public class ImageLocalUploader implements ImageUploader {

    @Value("${file.show.upload.location}")
    private String location;

    @PostConstruct
    void createSavedDir() {
        File dir = new File(location);
        createDir(dir);
    }

    private void createDir(final File dir) {
        if (!dir.exists()) {
            dir.mkdir();
        }
    }

    @Override
    public void upload(final List<Image> convertedImages, final List<MultipartFile> originImageFiles) {
        IntStream.range(0, convertedImages.size())
                .forEach(index -> saveFile(
                        originImageFiles.get(index),
                        convertedImages.get(index).getUniqueName()
                ));
    }

    private void saveFile(final MultipartFile file, final String fileUniqueName) {
        try {
            file.transferTo(new File(location + fileUniqueName));
            log.info("파일 저장 성공 : " + location + fileUniqueName);
        } catch (IOException e) {
            log.error("파일 저장 실패 위치 {}, 로그 {} : ", location + fileUniqueName, e.getMessage());
            throw new ImageException(ImageExceptionType.FILE_UPLOAD_FAILURE_EXCEPTION);
        }
    }

    @Override
    public void deleteAll(final List<String> deletedImageUniqueNames) {
        deletedImageUniqueNames.forEach(this::deleteImage);
    }

    private void deleteImage(final String fileUniqueName) {
        new File(location + fileUniqueName).delete();
    }
}
