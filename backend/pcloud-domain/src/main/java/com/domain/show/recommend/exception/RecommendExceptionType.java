package com.domain.show.recommend.exception;

import com.common.exception.CustomExceptionType;

public enum RecommendExceptionType implements CustomExceptionType {

    START_PARAM_DATE_NULL_EXCEPTION(400, "PARAM0001", "startDate param은 필수입니다."),
    START_DATE_AFTER_END_DATE_EXCEPTION(400, "PARAM0002", "시작날짜가 종료날짜보다 앞설 수 없습니다."),
    LIMIT_PARAM_NOT_NUMBER_EXCEPTION(400, "PARAM0003", "limit에 숫자를 입력해주세요."),
    DATE_FORMAT_INVALID_EXCEPTION(400, "PARAM0004", "날짜 형식을 맞춰주세요. yyyy-MM-dd"),
    ;

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    RecommendExceptionType(
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
