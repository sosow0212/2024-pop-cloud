package com.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface DistributionLock {

    String keyName();

    TimeUnit timeUnit()
            default TimeUnit.SECONDS;

    long lockUsingTimeout()
            default 15L;

    long lockWaitingTimeout()
            default 15L;
}
