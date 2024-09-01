package com.batch.global.config;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.AppenderBase;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

public class SlackAppender extends AppenderBase<ILoggingEvent> {

    private static final String WEBHOOK_URL = System.getenv("SLACK_WEBHOOK_URL");

    @Override
    protected void append(final ILoggingEvent eventObject) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> body = createSlackErrorBody(eventObject);
        restTemplate.postForEntity(WEBHOOK_URL, body, String.class);
    }

    private Map<String, Object> createSlackErrorBody(final ILoggingEvent eventObject) {
        String message = createMessage(eventObject);
        return Map.of("channel", "#에러-발생",
                "fallback", "Batch 서버에서 요청을 실패했어요 :cry:",
                "color", "#2eb886",
                "pretext", "Batch 서버에서 에러가 발생했어요 확인해주세요 :cry:",
                "author_name", "pop-cloud",
                "text", message,
                "fields",
                List.of(
                        Map.of(
                                "title", "로그 레벨",
                                "value", eventObject.getLevel().levelStr,
                                "short", false
                        ),
                        "timestamp", eventObject.getTimeStamp()
                )
        );
    }

    private String createMessage(final ILoggingEvent eventObject) {
        String baseMessage = "에러가 발생했습니다.\n";
        String pattern = baseMessage + "```%s %s %s [%s] - %s```";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        return String.format(pattern,
                simpleDateFormat.format(eventObject.getTimeStamp()),
                eventObject.getLevel(),
                eventObject.getThreadName(),
                eventObject.getLoggerName(),
                eventObject.getFormattedMessage());
    }
}

