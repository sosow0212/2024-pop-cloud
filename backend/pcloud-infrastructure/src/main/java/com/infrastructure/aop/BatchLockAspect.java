package com.infrastructure.aop;

import com.common.annotation.BatchLock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@RequiredArgsConstructor
@Order(1)
@Aspect
@Component
public class BatchLockAspect {

    private static final String LOCK_PREFIX = "BATCH-LOCK:";
    private static final String LOCKED_VALUE = "LOCKED";

    private final RedisTemplate redisTemplate;

    @Around("@annotation(com.common.annotation.BatchLock)")
    public Object lock(final ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        BatchLock batchLock = method.getAnnotation(BatchLock.class);

        String keyName = LOCK_PREFIX + method.getName();
        boolean canUseLock = canUseLock(keyName, batchLock);

        if (!canUseLock) {
            log.warn("다른 스레드에서 Batch-lock을 획득했습니다. method: {}", method.getName());
            return false;
        }

        joinPoint.proceed();
        return redisTemplate.delete(keyName);
    }

    private boolean canUseLock(final String keyName, final BatchLock batchLock) {
        Boolean lockAcquired = redisTemplate.opsForValue()
                .setIfAbsent(
                        keyName,
                        LOCKED_VALUE,
                        batchLock.lockUsingTimeout(),
                        batchLock.timeUnit()
                );

        return Boolean.TRUE
                .equals(lockAcquired);
    }
}
