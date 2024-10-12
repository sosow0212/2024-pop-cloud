package com.domain.map.exception;

import com.common.exception.CustomExceptionType;

public enum MapExceptionType implements CustomExceptionType {

    RECOMMEND_TYPE_INVALID_EXCEPTION(400, "PC0501", "추천 경로 검색 타입이 일치하지 않습니다. (popular, shortest) 선택");

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    MapExceptionType(final int httpStatusCode, final String customCode, final String message) {
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
