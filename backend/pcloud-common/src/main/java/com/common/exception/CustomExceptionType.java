package com.common.exception;

public interface CustomExceptionType {

    String message();

    String name();

    int httpStatusCode();

    String customCode();
}
