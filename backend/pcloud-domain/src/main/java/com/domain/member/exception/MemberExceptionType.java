package com.domain.member.exception;

import com.common.exception.CustomExceptionType;

public enum MemberExceptionType implements CustomExceptionType {

    MEMBER_ALREADY_EXISTED_EXCEPTION(400, "PC0201", "Member가 이미 존재합니다."),
    MEMBER_NOT_FOUND_EXCEPTION(404, "PC0202", "Member가 존재하지 않습니다."),
    OAUTH_PLATFORM_NOT_FOUND_EXCEPTION(400, "PC0203", "OAuth Platform을 찾을 수 없습니다."),
    ;

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    MemberExceptionType(final int httpStatusCode, final String customCode, final String message) {
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
