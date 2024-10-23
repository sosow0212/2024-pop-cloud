package com.api.show.image.infrastructure;

import com.api.show.image.application.ImagePreProcessor;
import com.domain.common.ShowType;
import com.domain.show.common.image.domain.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Component
public class ImagePreProcessorImpl implements ImagePreProcessor {

    @Override
    public List<Image> convertMultipartFileToImage(
            final ShowType showType,
            final Long targetId,
            final List<MultipartFile> imageMultipartFiles
    ) {
        return imageMultipartFiles.stream()
                .map(multipartFile -> convertToImage(showType, targetId, multipartFile))
                .toList();
    }

    private Image convertToImage(
            final ShowType showType,
            final Long targetId,
            final MultipartFile multipartImageFile
    ) {
        String originalFilename = multipartImageFile.getOriginalFilename();
        return Image.of(showType, targetId, originalFilename);
    }
}
