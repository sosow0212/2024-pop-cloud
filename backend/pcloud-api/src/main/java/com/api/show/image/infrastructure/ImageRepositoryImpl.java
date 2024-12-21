package com.api.show.image.infrastructure;

import com.domain.common.ShowType;
import com.domain.show.common.image.domain.Image;
import com.domain.show.common.image.domain.ImageRepository;
import com.domain.show.common.image.infrastructure.ImageJpaRepository;
import com.domain.show.common.image.infrastructure.ImageQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ImageRepositoryImpl implements ImageRepository {

    private final ImageJpaRepository imageJpaRepository;
    private final ImageQueryRepository imageQueryRepository;

    @Override
    public List<Image> saveAll(final List<Image> images) {
        return imageJpaRepository.saveAll(images);
    }

    @Override
    public List<String> findImageNamesByTargetIdAndShowType(final Long targetId, final ShowType showType) {
        return imageQueryRepository.findImageNamesByTargetIdAndShowType(targetId, showType);
    }

    @Override
    public void deleteAllByTargetIdAndShowType(final Long targetId, final ShowType showType) {
        imageJpaRepository.deleteAllByTargetIdAndShowType(targetId, showType);
    }
}
