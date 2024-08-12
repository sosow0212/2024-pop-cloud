package com.common.exception;

public enum AuthExceptionType implements CustomExceptionType {

    EXPIRED_TOKEN_EXCEPTION(401, "PC0101", "토큰이 만료되었습니다."),
    LOGIN_INVALID_EXCEPTION(401, "PC0102", "로그인 정보를 찾을 수 없습니다."),
    SIGNATURE_INVALID_EXCEPTION(401, "PC0103", "토큰의 서명이 잘못 되었습니다."),
    TOKEN_FORM_INVALID_EXCEPTION(400, "PC0104", "토큰의 형식이 올바르지 않습니다."),
    TOKEN_INVALID_EXCEPTION(400, "PC0105", "토큰의 값이 유효하지 않습니다."),
    UNSUPPORTED_TOKEN_EXCEPTION(400, "PC0106", "지원하지 않는 토큰 형식입니다."),
    REQUEST_FAIL_OF_OAUTH_ACCESS_TOKEN(400, "PC0107", "OAuth 인증 Access-token 발급에 실패하였습니다."),
    REQUEST_FAIL_OF_OAUTH_MEMBER_INFO(400, "PC0108", "OAuth 유저 정보 조회에 실패하였습니다."),
    FORBIDDEN_AUTH_LEVEL(403, "PC0109", "접근 권한이 존재하지 않습니다.");

    private final int httpStatusCode;
    private final String customCode;
    private final String message;

    AuthExceptionType(final int httpStatusCode, final String customCode, final String message) {
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
