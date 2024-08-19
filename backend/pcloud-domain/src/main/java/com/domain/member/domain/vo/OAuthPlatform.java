package com.domain.member.domain.vo;

import com.domain.member.exception.MemberException;
import com.domain.member.exception.MemberExceptionType;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum OAuthPlatform {

    KAKAO("kakao"),
    GOOGLE("google");

    private final String name;

    OAuthPlatform(final String name) {
        this.name = name;
    }

    public static OAuthPlatform findPlatform(final String name) {
        return Arrays.stream(values())
                .filter(platform -> platform.name.equals(name.toLowerCase()))
                .findFirst()
                .orElseThrow(() -> new MemberException(MemberExceptionType.OAUTH_PLATFORM_NOT_FOUND_EXCEPTION));
    }
}
