package com.common.exception;

public class LoginInvalidException extends RuntimeException {

    public LoginInvalidException() {
        super("로그인 정보를 찾을 수 없습니다.");
    }
}
