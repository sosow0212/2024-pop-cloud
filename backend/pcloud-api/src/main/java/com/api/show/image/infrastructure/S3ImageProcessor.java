package com.api.show.image.infrastructure;

import com.api.show.image.application.ImageProcessor;
import com.domain.show.common.image.exception.ImageException;
import com.domain.show.common.image.exception.ImageExceptionType;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectsRequest;
import software.amazon.awssdk.services.s3.model.ObjectIdentifier;
import software.amazon.awssdk.services.s3.model.S3Exception;

@Component
@RequiredArgsConstructor
public class S3ImageProcessor implements ImageProcessor {

    private static final String IMAGE_PREFIX = "images/";
    private static final String THUMBNAILS_PREFIX = "thumbnails/";

    private final S3Client s3Client;

    @Value("${file.show.upload.location}")
    private String location;

    @Override
    @Async
    public void deleteImagesByUniqueNames(final List<String> uniqueImageNames) {
        if (uniqueImageNames == null || uniqueImageNames.isEmpty()) {
            return;
        }
        try {
            List<ObjectIdentifier> objectIdentifiers = new ArrayList<>();
            uniqueImageNames.forEach(uniqueImageName -> {
                objectIdentifiers.add(createObjectIdentifier(IMAGE_PREFIX, uniqueImageName));
                objectIdentifiers.add(createObjectIdentifier(THUMBNAILS_PREFIX, uniqueImageName));
            });
            DeleteObjectsRequest deleteRequest = DeleteObjectsRequest.builder()
                    .bucket(location)
                    .delete(builder -> builder.objects(objectIdentifiers))
                    .build();
            s3Client.deleteObjects(deleteRequest);
        } catch (S3Exception e) {
            throw new ImageException(ImageExceptionType.FILE_DELETE_FAILURE_EXCEPTION);
        }
    }

    private ObjectIdentifier createObjectIdentifier(final String prefix, final String uniqueImageName) {
        return ObjectIdentifier.builder()
                .key(prefix + uniqueImageName)
                .build();
    }
}
