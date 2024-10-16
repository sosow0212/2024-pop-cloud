package com.api.show.recommend.application;

import com.api.show.popups.application.request.DateSearchRequest;
import com.domain.show.popups.domain.service.PopularityCalculator;
import com.domain.show.recommend.domain.Recommend;
import com.domain.show.recommend.domain.RecommendRepository;
import com.domain.show.recommend.domain.Recommends;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RecommendService {

    private final RecommendRepository recommendRepository;
    private final PopularityCalculator popularityCalculator;

    @Transactional(readOnly = true)
    @Cacheable(cacheNames = "popularShowsCache", key = "#dateSearchRequest.toString()", cacheManager = "contentCacheManager")
    public Recommends findPopularShowsWithinDateRange(final DateSearchRequest dateSearchRequest) {
        List<Recommend> foundRecommend = recommendRepository.findAllFromStartDateToEndDateWithLimitByShowTypes(
                dateSearchRequest.startDate(),
                dateSearchRequest.endDate(),
                dateSearchRequest.target()
        );

        Recommends recommends = Recommends.from(foundRecommend);
        return recommends.findPopularityShows(popularityCalculator, dateSearchRequest.limit());
    }
}
