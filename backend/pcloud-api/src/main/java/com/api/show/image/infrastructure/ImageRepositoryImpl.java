package com.api.show.image.infrastructure;

import com.domain.show.common.image.domain.Image;
import com.domain.show.common.image.domain.ImageRepository;
import com.domain.show.common.image.infrastructure.ImageJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ImageRepositoryImpl implements ImageRepository {

    private final ImageJpaRepository imageJpaRepository;

    @Override
    public List<Image> saveAll(final List<Image> images) {
        return imageJpaRepository.saveAll(images);
    }

    @Override
    public List<Image> findAllByIdIn(final List<Long> deletedImageIds) {
        return imageJpaRepository.findAllByIdIn(deletedImageIds);
    }

    @Override
    public void deleteAll(final List<Image> images) {
        imageJpaRepository.deleteAll(images);
    }
}
