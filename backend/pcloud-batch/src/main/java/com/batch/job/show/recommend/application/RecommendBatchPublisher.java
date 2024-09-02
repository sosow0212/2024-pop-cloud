package com.batch.job.show.recommend.application;

import com.batch.annotation.BatchPublisher;
import com.batch.job.show.recommend.application.event.ClearedRecommendEvent;
import com.common.config.event.Events;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@Slf4j
@BatchPublisher
public class RecommendBatchPublisher {

    private static final String EVERY_SIX_AM = "0 0 6 * * *";

    @Scheduled(cron = EVERY_SIX_AM)
    public void clearRecommendCache() {
        Events.raise(new ClearedRecommendEvent(LocalDateTime.now()));
        log.info("배치 작업 완료");
    }
}
