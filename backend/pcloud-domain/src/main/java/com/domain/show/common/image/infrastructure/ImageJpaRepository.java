package com.domain.show.common.image.infrastructure;

import com.domain.show.common.image.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageJpaRepository extends JpaRepository<Image, Long> {

    @Override
    <S extends Image> List<S> saveAll(Iterable<S> images);

    List<Image> findAllByIdIn(Iterable<Long> ids);

    @Override
    void deleteAll(Iterable<? extends Image> images);
}
