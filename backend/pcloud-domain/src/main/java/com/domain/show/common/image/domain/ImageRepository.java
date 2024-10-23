package com.domain.show.common.image.domain;

import java.util.List;

public interface ImageRepository {

    List<Image> saveAll(List<Image> images);

    List<Image> findAllByIdIn(List<Long> deletedImageIds);

    void deleteAll(List<Image> images);
}
