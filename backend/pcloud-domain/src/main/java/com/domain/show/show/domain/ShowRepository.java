package com.domain.show.show.domain;

import com.domain.show.common.PublicTag;
import com.domain.show.common.ShowType;
import com.domain.show.show.domain.dto.ShowSimpleResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowRepository {

    List<ShowSimpleResponse> findAll(Long showId, Integer PageSize, ShowType showType, List<PublicTag> publicTags, List<String> cities, LocalDateTime startDate, LocalDateTime endDate);
}
