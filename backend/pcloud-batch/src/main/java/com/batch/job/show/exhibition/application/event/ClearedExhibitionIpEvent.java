package com.batch.job.show.exhibition.application.event;

import com.batch.global.common.event.BatchEvent;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ClearedExhibitionIpEvent extends BatchEvent {

    public ClearedExhibitionIpEvent(final LocalDateTime eventTime) {
        super(eventTime);
    }
}
