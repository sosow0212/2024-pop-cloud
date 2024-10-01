package com.infrastructure.lock.batch.util;

import com.infrastructure.exception.RetryException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

import static com.infrastructure.exception.RetryExceptionType.RETRY_COUNT_EXCEED_EXCEPTION;

@Slf4j
@RequiredArgsConstructor
@Component
public class RetryHandler {

    private static final int MAX_RETRY_COUNT = 3;

    private final IdempotentManager idEmpotentManager;

    public void retryWithIdempotentLock(
            final ProceedingJoinPoint joinPoint,
            final String keyName,
            final long lockTimeout,
            final TimeUnit timeUnit
    ) throws Throwable {
        for (int tryCount = 1; tryCount <= MAX_RETRY_COUNT; tryCount++) {
            idEmpotentManager.resetIdempotentTimeout(keyName, lockTimeout, timeUnit);

            try {
                log.warn("[1-1.job retry] Batch Server method: {}에서 재시도 작업을 시도합니다. 횟수: {}", keyName, tryCount);
                joinPoint.proceed();
                return;
            } catch (Exception e) {
                log.warn("[1-2.job retry fail] Batch Server method: {}에서 재시도 작업 실패. 횟수: {}", keyName, tryCount);
            }
        }

        throw new RetryException(RETRY_COUNT_EXCEED_EXCEPTION);
    }
}
