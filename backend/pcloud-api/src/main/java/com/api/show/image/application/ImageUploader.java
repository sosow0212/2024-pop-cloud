package com.api.show.image.application;

import com.domain.show.common.image.domain.Image;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImageUploader {

    void upload(List<Image> convertedImages, List<MultipartFile> originImageFiles);

    void deleteAll(List<String> deletedImageUniqueNames);
}
