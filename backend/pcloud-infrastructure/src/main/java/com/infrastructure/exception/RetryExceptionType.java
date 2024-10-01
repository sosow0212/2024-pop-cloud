package com.infrastructure.exception;

import com.common.exception.CustomExceptionType;

public enum RetryExceptionType implements CustomExceptionType {

    RETRY_COUNT_EXCEED_EXCEPTION(503, "RETRY001", "작업 처리 실패 후 재시도 작업 횟수를 초과했습니다."),
    ;

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    RetryExceptionType(final int httpStatusCode, final String customCode, final String message) {
        this.httpStatusCode = httpStatusCode;
        this.customCode = customCode;
        this.message = message;
    }

    @Override
    public String message() {
        return this.message;
    }

    @Override
    public int httpStatusCode() {
        return this.httpStatusCode;
    }

    @Override
    public String customCode() {
        return this.customCode;
    }
}
