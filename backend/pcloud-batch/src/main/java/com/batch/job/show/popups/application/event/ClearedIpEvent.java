package com.batch.job.show.popups.application.event;

import com.batch.global.common.event.BatchEvent;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ClearedIpEvent extends BatchEvent {

    public ClearedIpEvent(final LocalDateTime eventTime) {
        super(eventTime);
    }
}
