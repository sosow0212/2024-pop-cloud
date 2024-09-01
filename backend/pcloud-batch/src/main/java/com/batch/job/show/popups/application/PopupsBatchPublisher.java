package com.batch.job.show.popups.application;

import com.batch.annotation.BatchPublisher;
import com.batch.job.show.popups.application.event.ClearedIpEvent;
import com.common.config.event.Events;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDateTime;

@Slf4j
@BatchPublisher
public class PopupsBatchPublisher {

    private static final String EVERY_FIVE_AM = "0 0 5 * * *";

    @Scheduled(cron = EVERY_FIVE_AM)
    public void clearPopupIpCache() {
        Events.raise(new ClearedIpEvent(LocalDateTime.now()));
        log.info("배치 작업 완료");
    }
}
