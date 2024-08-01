package com.domain.domains.member.exception;

import com.common.exception.CustomExceptionType;

public enum MemberExceptionType implements CustomExceptionType {

    MEMBER_ALREADY_EXISTED_EXCEPTION(400, "Member가 이미 존재합니다."),
    MEMBER_NOT_FOUND_EXCEPTION(404, "Member가 존재하지 않습니다."),
    PASSWORD_INVALID_EXCEPTION(401, "패스워드가 일치하지 않습니다."),
    ;

    private final int httpStatusCode;
    private final String message;

    MemberExceptionType(final int httpStatusCode, final String message) {
        this.httpStatusCode = httpStatusCode;
        this.message = message;
    }


    @Override
    public String getMessage() {
        return this.message;
    }

    @Override
    public int getHttpStatusCode() {
        return this.httpStatusCode;
    }
}
