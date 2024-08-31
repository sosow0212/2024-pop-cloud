package com.api.global.aop;

import jakarta.persistence.OptimisticLockException;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.hibernate.StaleObjectStateException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Component;

@Order(Ordered.LOWEST_PRECEDENCE - 1)
@Aspect
@Component
public class OptimisticLockRetryAspect {

    private static final int MAX_RETRY_COUNT = 10000;
    private static final int RETRY_DELAY_MS = 100;

    @Pointcut("@annotation(com.domain.annotation.RetryOptimisticLock)")
    public void retry() {
    }

    @Around("retry()")
    public Object retryOptimisticLock(final ProceedingJoinPoint joinPoint) throws Throwable {
        Exception exceptionHolder = null;

        for (int tryCount = 0; tryCount < MAX_RETRY_COUNT; tryCount++) {
            try {
                return joinPoint.proceed();
            } catch (
                    OptimisticLockException |
                    ObjectOptimisticLockingFailureException |
                    StaleObjectStateException exception
            ) {
                exceptionHolder = exception;
                Thread.sleep(RETRY_DELAY_MS);
            }
        }

        throw exceptionHolder;
    }
}
