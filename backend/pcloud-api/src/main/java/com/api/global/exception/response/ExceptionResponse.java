package com.api.global.exception.response;

public record ExceptionResponse(
        String name,
        String customCode,
        String message
) {
}
