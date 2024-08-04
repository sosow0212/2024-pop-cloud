package com.domain.domains.member.domain.vo;

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
                .filter(platform -> name.equals(platform.name))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("플랫폼이 없습니다."));
    }
}
