package com.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface BatchJob {

    /**
     * @BatchJob
     * - @BatchJob 어노테이션은 다중 환경에서 중복 Scheduler 작업시 멱등키를 이용해 하나의 스레드만 접근 가능하게 만들어줍니다.
     * - 추가적으로 작업 실패시 재처리 과정을 가집니다.
     */

    String keyName();

    long ttlTime() default 15L;

    TimeUnit timeUnit() default TimeUnit.SECONDS;
}
