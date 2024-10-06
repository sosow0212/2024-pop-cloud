package com.infrastructure.exception;

import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;

public class RetryException extends CustomException {

    private final RetryExceptionType retryExceptionType;

    public RetryException(final RetryExceptionType retryExceptionType) {
        super(retryExceptionType);
        this.retryExceptionType = retryExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return retryExceptionType;
    }
}
