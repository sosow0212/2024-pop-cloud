package com.api.show.image.application;

import com.domain.common.ShowType;
import com.domain.show.common.image.domain.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImagePreProcessor {

    List<Image> convertMultipartFileToImage(
            ShowType showType,
            Long targetId,
            List<MultipartFile> imageFiles);
}
