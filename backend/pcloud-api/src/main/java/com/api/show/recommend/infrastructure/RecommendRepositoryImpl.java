package com.api.show.recommend.infrastructure;

import com.domain.show.common.ShowType;
import com.domain.show.recommend.domain.Recommend;
import com.domain.show.recommend.domain.RecommendRepository;
import com.domain.show.recommend.infrastructure.RecommendQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class RecommendRepositoryImpl implements RecommendRepository {

    private final RecommendQueryRepository recommendQueryRepository;

    @Override
    public List<Recommend> findAllFromStartDateToEndDateWithLimitByShowTypes(final LocalDateTime startDate, final LocalDateTime endDate, final List<ShowType> showTypes) {
        return recommendQueryRepository.findAllFromStartDateToEndDateWithLimitByShowTypes(startDate, endDate, showTypes);
    }
}
