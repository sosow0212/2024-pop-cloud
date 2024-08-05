package com.common.exception;

public abstract class CustomException extends RuntimeException {

    protected CustomException(final CustomExceptionType customExceptionType) {
        super("[%s]: %s".formatted(customExceptionType.name(), customExceptionType.message()));
    }

    public abstract CustomExceptionType getExceptionType();
}
