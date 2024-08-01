package com.domain.domains.member.exception;

public class MemberAlreadyExistedException extends RuntimeException {

    public MemberAlreadyExistedException() {
        super("Member가 이미 존재합니다.");
    }
}
