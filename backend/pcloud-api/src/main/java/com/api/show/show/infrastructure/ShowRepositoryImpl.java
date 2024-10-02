package com.api.show.show.infrastructure;

import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowType;
import com.domain.show.show.domain.ShowRepository;
import com.domain.show.show.domain.dto.ShowSimpleResponse;
import com.domain.show.show.infrastructure.ShowQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ShowRepositoryImpl implements ShowRepository {

    private final ShowQueryRepository showQueryRepository;

    @Override
    public List<ShowSimpleResponse> findAll(final Long showId, final Integer PageSize, final ShowType showType, final List<PublicTag> publicTags, final List<String> cities) {
        return showQueryRepository.findAllWithPaging(showId, PageSize, showType, publicTags, cities);
    }
}
