package com.domain.domains.member.domain.vo;

import com.domain.domains.member.exception.MemberException;
import lombok.Getter;

import java.util.Arrays;

import static com.domain.domains.member.exception.MemberExceptionType.OAUTH_PLATFORM_NOT_FOUND_EXCEPTION;

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
                .orElseThrow(() -> new MemberException(OAUTH_PLATFORM_NOT_FOUND_EXCEPTION));
    }
}
