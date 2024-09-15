package com.batch.job.show.exhibition.application;

import com.batch.annotation.BatchPublisher;
import com.batch.job.show.exhibition.application.event.ClearedExhibitionIpEvent;
import com.common.config.event.Events;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;

@Slf4j
@BatchPublisher
public class ExhibitionBatchPublisher {

    private static final String EVERY_FIVE_AM = "0 0 5 * * *";

    @Scheduled(cron = EVERY_FIVE_AM)
    public void clearExhibitionIpCache() {
        Events.raise(new ClearedExhibitionIpEvent(LocalDateTime.now()));
        log.info("배치 작업 완료");
    }
}
