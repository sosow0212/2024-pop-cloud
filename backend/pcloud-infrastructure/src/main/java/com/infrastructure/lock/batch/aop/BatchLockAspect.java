package com.infrastructure.lock.batch.aop;

import com.common.annotation.BatchLock;
import com.infrastructure.lock.batch.util.IdempotentManager;
import com.infrastructure.lock.batch.util.RetryHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@RequiredArgsConstructor
@Order(1)
@Aspect
@Component
public class BatchLockAspect {

    private static final String LOCK_PREFIX = "BATCH-LOCK:";

    private final IdempotentManager idEmpotentManager;
    private final RetryHandler retryHandler;

    @Around("@annotation(com.common.annotation.BatchLock)")
    public Object lock(final ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        BatchLock batchLock = method.getAnnotation(BatchLock.class);

        String keyName = LOCK_PREFIX + method.getName();

        if (!idEmpotentManager.tryIdempotent(keyName, batchLock.lockUsingTimeout(), batchLock.timeUnit())) {
            log.info("다른 스레드에서 Batch-lock을 획득했습니다. method: {}", method.getName());
            return false;
        }

        try {
            executeWithRetry(joinPoint, keyName, batchLock);
            return true;
        } finally {
            releaseLockSafely(keyName, method.getName());
        }
    }

    private void executeWithRetry(
            final ProceedingJoinPoint joinPoint,
            final String keyName,
            final BatchLock batchLock
    ) throws Throwable {
        try {
            joinPoint.proceed();
        } catch (Exception e) {
            log.warn("[1.job fail] Batch Server method: {}에서 작업을 실패했습니다. 재처리 시도합니다. 예외: {}", keyName, e.getMessage());
            retryHandler.retryWithIdempotentLock(joinPoint, keyName, batchLock.lockUsingTimeout(), batchLock.timeUnit());
        }
    }

    private void releaseLockSafely(final String keyName, final String methodName) {
        try {
            idEmpotentManager.releaseIdempotent(keyName);
        } catch (RedisConnectionFailureException e) {
            log.error("[3. redis connection failure] Batch Server method: {}, Redis 서버에 연결할 수 없습니다 : {}", methodName, e.getMessage());
        }
    }
}
