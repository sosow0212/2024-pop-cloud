package com.domain.show.recommend.domain;

import com.domain.common.ShowType;

import java.time.LocalDateTime;
import java.util.List;

public interface RecommendRepository {

    List<Recommend> findAllFromStartDateToEndDateWithLimitByShowTypes(
            LocalDateTime startDate,
            LocalDateTime endDate,
            List<ShowType> showTypes
    );
}
