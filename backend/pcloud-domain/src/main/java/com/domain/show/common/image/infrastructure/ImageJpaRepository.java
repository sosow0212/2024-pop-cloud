package com.domain.show.common.image.infrastructure;

import com.domain.common.ShowType;
import com.domain.show.common.image.domain.Image;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageJpaRepository extends JpaRepository<Image, Long> {

    @Override
    <S extends Image> List<S> saveAll(Iterable<S> images);

    @Override
    void deleteAll(Iterable<? extends Image> images);

    void deleteAllByTargetIdAndShowType(Long targetId, ShowType showType);
}
