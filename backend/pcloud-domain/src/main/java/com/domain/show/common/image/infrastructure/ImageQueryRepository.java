package com.domain.show.common.image.infrastructure;

import com.domain.common.ShowType;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.domain.show.common.image.domain.QImage.image;

@RequiredArgsConstructor
@Repository
public class ImageQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public List<String> findImageNamesByTargetIdAndShowType(final Long targetId, final ShowType showType) {
        return jpaQueryFactory.select(image.name)
                .from(image)
                .where(image.targetId.eq(targetId), image.showType.eq(showType))
                .fetch();
    }
}
