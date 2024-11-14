package com.api.show.image.infrastructure;

import com.api.show.image.application.ImageUploader;
import com.domain.show.common.image.domain.Image;
import com.domain.show.common.image.exception.ImageException;
import com.domain.show.common.image.exception.ImageExceptionType;
import java.io.InputStream;
import java.util.List;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Slf4j
@Profile("prod")
@RequiredArgsConstructor
@Component
public class ImageProdUploader implements ImageUploader {

    private static final int START_INDEX = 0;
    private static final String IMAGE_PREFIX = "images/";

    @Value("${file.show.upload.location}")
    private String location;

    private final S3Client s3Client;

    @Override
    public void upload(final List<Image> convertedImages, final List<MultipartFile> originImageFiles) {
        IntStream.range(START_INDEX, convertedImages.size())
                .forEach(index -> uploadImage(convertedImages.get(index), originImageFiles.get(index)));
    }

    private void uploadImage(final Image image, final MultipartFile file) {
        try (InputStream inputStream = file.getInputStream()) {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(location)
                    .key(IMAGE_PREFIX + image.getUniqueName())
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));
            log.info("파일 저장 성공 : {}", image.getUniqueName());
        } catch (Exception e) {
            log.error("파일 저장 실패: {}, 로그 {} : ", image.getUniqueName(), e.getMessage());
            throw new ImageException(ImageExceptionType.FILE_UPLOAD_FAILURE_EXCEPTION);
        }
    }

    @Override
    public void deleteAll(final List<String> deletedImageUniqueNames) {
        deletedImageUniqueNames.forEach(this::deleteImage);
    }

    private void deleteImage(final String imageName) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(location)
                    .key(IMAGE_PREFIX + imageName)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            log.info("파일 삭제 성공 : {}", imageName);
        } catch (Exception e) {
            log.error("파일 삭제 실패: {}, 로그 {} : ", imageName, e.getMessage());
            throw new ImageException(ImageExceptionType.FILE_DELETE_FAILURE_EXCEPTION);
        }
    }
}
