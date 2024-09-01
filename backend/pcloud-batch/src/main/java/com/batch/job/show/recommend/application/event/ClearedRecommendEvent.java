package com.batch.job.show.recommend.application.event;

import com.batch.global.common.event.BatchEvent;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ClearedRecommendEvent extends BatchEvent {

    public ClearedRecommendEvent(final LocalDateTime eventTime) {
        super(eventTime);
    }
}
