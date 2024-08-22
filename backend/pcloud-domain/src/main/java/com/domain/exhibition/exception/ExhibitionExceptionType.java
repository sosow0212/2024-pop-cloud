package com.domain.exhibition.exception;

import com.common.exception.CustomExceptionType;

public enum ExhibitionExceptionType implements CustomExceptionType {

    EXHIBITION_NOT_FOUND_EXCEPTION(404, "PC0401", "개인전시회가 존재하지 않습니다.");

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    ExhibitionExceptionType(
            final int httpStatusCode,
            final String customCode,
            final String message
    ) {
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
