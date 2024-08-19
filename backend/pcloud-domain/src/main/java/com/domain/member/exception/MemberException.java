package com.domain.member.exception;

import com.common.exception.CustomException;
import com.common.exception.CustomExceptionType;

public class MemberException extends CustomException {

    private final MemberExceptionType memberExceptionType;

    public MemberException(final MemberExceptionType memberExceptionType) {
        super(memberExceptionType);
        this.memberExceptionType = memberExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return memberExceptionType;
    }
}
