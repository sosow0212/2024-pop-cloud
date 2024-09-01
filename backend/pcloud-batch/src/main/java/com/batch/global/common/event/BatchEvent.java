package com.batch.global.common.event;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class BatchEvent {

    private final LocalDateTime eventTime;
}
