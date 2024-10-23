package com.domain.show.common.image.domain;

import com.domain.common.ShowType;
import com.domain.global.domain.BaseEntity;
import com.domain.show.common.image.exception.ImageException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

import static com.domain.show.common.image.exception.ImageExceptionType.UNSUPPORTED_IMAGE_FORMAT_EXCEPTION;

@Getter
@Builder
@EqualsAndHashCode(of = "id", callSuper = false)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
public class Image extends BaseEntity {

    private static final List<String> supportedExtensions = List.of("jpg", "jpeg", "gif", "bmp", "png");
    private static final String SEPARATOR = ".";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private ShowType showType;

    @Column(nullable = false)
    private Long targetId;

    @Column(nullable = false)
    private String originName;

    @Column(nullable = false)
    private String uniqueName;

    public static Image of(
            final ShowType showType,
            final Long targetId,
            final String originName
    ) {
        return Image.builder()
                .showType(showType)
                .targetId(targetId)
                .originName(originName)
                .uniqueName(generateUniqueName(originName))
                .build();
    }

    private static String generateUniqueName(final String originImageFileName) {
        String extension = getExtension(originImageFileName);
        return UUID.randomUUID() + SEPARATOR + extension;
    }

    private static String getExtension(final String originImageFileName) {
        String extension = originImageFileName.substring(originImageFileName.lastIndexOf(SEPARATOR) + 1);
        validateSupportedExtension(extension);
        return extension;
    }

    private static void validateSupportedExtension(final String extension) {
        boolean supported = supportedExtensions.stream()
                .anyMatch(supportedExtension -> supportedExtension.equalsIgnoreCase(extension));

        if (!supported) {
            throw new ImageException(UNSUPPORTED_IMAGE_FORMAT_EXCEPTION);
        }
    }
}
