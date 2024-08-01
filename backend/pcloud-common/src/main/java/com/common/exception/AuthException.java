package com.common.exception;

public class AuthException extends CustomException {

    private final AuthExceptionType authException;

    public AuthException(final AuthExceptionType authException) {
        super(authException);
        this.authException = authException;
    }

    @Override
    public AuthExceptionType getExceptionType() {
        return authException;
    }
}
