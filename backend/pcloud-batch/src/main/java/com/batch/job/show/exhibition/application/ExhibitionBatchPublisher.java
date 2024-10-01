package com.batch.job.show.exhibition.application;

import com.batch.annotation.BatchPublisher;
import com.batch.job.show.exhibition.application.event.ClearedExhibitionIpEvent;
import com.common.annotation.BatchJob;
import com.common.config.event.Events;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@Slf4j
@BatchPublisher
public class ExhibitionBatchPublisher {

    private static final String EVERY_FIVE_AM = "0 0 5 * * *";

    @BatchJob(keyName = "clearExhibitionIpCache")
    @Scheduled(cron = EVERY_FIVE_AM)
    public void clearExhibitionIpCache() {
        Events.raise(new ClearedExhibitionIpEvent(LocalDateTime.now()));
        log.info("배치 작업 완료");
    }
}
