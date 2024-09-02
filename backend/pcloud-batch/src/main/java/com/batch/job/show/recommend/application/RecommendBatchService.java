package com.batch.job.show.recommend.application;

import com.batch.annotation.BatchService;
import com.batch.job.show.recommend.application.event.ClearedRecommendEvent;
import com.batch.job.show.recommend.domain.RecommendCacheBatchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;

@Slf4j
@RequiredArgsConstructor
@BatchService
public class RecommendBatchService {

    private final RecommendCacheBatchRepository recommendCacheBatchRepository;

    @EventListener(ClearedRecommendEvent.class)
    public void clearRecommendCache(final ClearedRecommendEvent event) {
        log.info("start job: {}, startTime: {} ", "resetRecommendCache", event.getEventTime());
        recommendCacheBatchRepository.clearRecommendCache();
    }
}
