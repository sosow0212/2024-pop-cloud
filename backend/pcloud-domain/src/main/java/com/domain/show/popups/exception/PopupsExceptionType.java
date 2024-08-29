package com.domain.show.popups.exception;

import com.common.exception.CustomExceptionType;

public enum PopupsExceptionType implements CustomExceptionType {

    POPUPS_NOT_FOUND_EXCEPTION(404, "PC0301", "팝업스토어가 존재하지 않습니다."),
    PUBLIC_TAG_NOT_FOUND_EXCEPTION(404, "PC0302", "퍼블릭 태그가 존재하지 않습니다."),
    INVALID_LATITUDE(400, "PC0303", "유효하지 않는 위도입니다."),
    INVALID_LONGITUDE(400, "PC0304", "유효하지 않는 경도입니다."),
    INVALID_PRICE(400, "PC0305", "유효하지 않는 금액입니다");

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    PopupsExceptionType(
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
