package com.infrastructure.lock.batch.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Component
public class IdempotentManager {

    private final RedisTemplate<String, Object> redisTemplate;

    public boolean tryIdempotent(
            final String keyName,
            final long timeout,
            final TimeUnit timeUnit
    ) {
        Boolean idempotentAcquired = redisTemplate.opsForValue()
                .setIfAbsent(keyName, "LOCKED", timeout, timeUnit);

        return Boolean.TRUE
                .equals(idempotentAcquired);
    }

    public void resetIdempotentTimeout(
            final String keyName,
            final long timeout,
            final TimeUnit timeUnit
    ) {
        redisTemplate.expire(keyName, timeout, timeUnit);
    }

    public void releaseIdempotent(final String keyName) {
        redisTemplate.delete(keyName);
    }
}
