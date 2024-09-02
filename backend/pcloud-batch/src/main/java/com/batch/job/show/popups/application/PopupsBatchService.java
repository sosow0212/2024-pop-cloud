package com.batch.job.show.popups.application;

import com.batch.annotation.BatchService;
import com.batch.job.show.popups.application.event.ClearedIpEvent;
import com.batch.job.show.popups.domain.PopupsCacheBatchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;

@Slf4j
@RequiredArgsConstructor
@BatchService
public class PopupsBatchService {

    private final PopupsCacheBatchRepository popupsCacheBatchRepository;

    @EventListener(ClearedIpEvent.class)
    public void clearPopupsIpCache(final ClearedIpEvent event) {
        log.info("start job: {}, startTime: {} ", "clearPopupsIpCache", event.getEventTime());
        popupsCacheBatchRepository.clearIpCache();
    }
}
