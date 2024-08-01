package com.common.exception;

public enum AuthExceptionType implements CustomExceptionType {

    EXPIRED_TOKEN_EXCEPTION(401, "토큰이 만료되었습니다."),
    LOGIN_INVALID_EXCEPTION(401, "로그인 정보를 찾을 수 없습니다."),
    SIGNATURE_INVALID_EXCEPTION(401, "토큰의 서명이 잘못 되었습니다."),
    TOKEN_FORM_INVALID_EXCEPTION(400, "토큰의 형식이 올바르지 않습니다."),
    TOKEN_INVALID_EXCEPTION(400, "토큰의 값이 유효하지 않습니다."),
    UNSUPPORTED_TOKEN_EXCEPTION(400, "지원하지 않는 토큰 형식입니다.");

    private final int httpStatusCode;
    private final String message;

    AuthExceptionType(final int httpStatusCode, final String message) {
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
