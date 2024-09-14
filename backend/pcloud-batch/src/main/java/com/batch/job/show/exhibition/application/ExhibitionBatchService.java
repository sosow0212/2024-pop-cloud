package com.batch.job.show.exhibition.application;

import com.batch.annotation.BatchService;
import com.batch.job.show.exhibition.application.event.ClearedExhibitionIpEvent;
import com.batch.job.show.exhibition.domain.ExhibitionCacheBatchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;

@Slf4j
@RequiredArgsConstructor
@BatchService
public class ExhibitionBatchService {

    private final ExhibitionCacheBatchRepository exhibitionCacheBatchRepository;

    @EventListener(ClearedExhibitionIpEvent.class)
    public void clearExhibitionIpCache(final ClearedExhibitionIpEvent event) {
        log.info("start job: {}, startTime : {} ", "clearExhibitionIpCache", event.getEventTime());
        exhibitionCacheBatchRepository.clearIpCache();
    }
}
