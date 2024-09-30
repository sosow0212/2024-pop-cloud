package com.infrastructure.aop;

import com.common.annotation.DistributionLock;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@RequiredArgsConstructor
@Order(1)
@Aspect
@Component
public class DistributionLockAspect {

    private static final String LOCK_PREFIX = "LOCK:";

    private final RedissonClient redissonClient;

    @Around("@annotation(com.common.annotation.DistributionLock)")
    public Object lock(final ProceedingJoinPoint joinPoint) throws Throwable {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        DistributionLock distributionLockAnnotation = method.getAnnotation(DistributionLock.class);

        String keyName = LOCK_PREFIX + method.getName();
        RLock rLock = redissonClient.getLock(keyName);

        try {
            boolean canUseLock = canUseLock(rLock, distributionLockAnnotation);

            if (!canUseLock) {
                return false;
            }

            return joinPoint.proceed();
        } catch (final InterruptedException e) {
            throw new InterruptedException();
        } finally {
            try {
                rLock.unlock();
            } catch (IllegalMonitorStateException e) {
                log.info("분산락이 이미 해제 되었습니다. method: {} : keyName: {}", keyName, keyName);
            }
        }
    }

    private boolean canUseLock(final RLock rLock, final DistributionLock distributionLockAnnotation) throws InterruptedException {
        return rLock.tryLock(
                distributionLockAnnotation.lockWaitingTimeout(),
                distributionLockAnnotation.lockUsingTimeout(),
                distributionLockAnnotation.timeUnit()
        );
    }
}
