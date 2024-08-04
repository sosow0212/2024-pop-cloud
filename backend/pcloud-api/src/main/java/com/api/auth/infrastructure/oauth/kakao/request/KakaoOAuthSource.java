package com.api.auth.infrastructure.oauth.kakao.request;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth2.properties.kakao")
public record KakaoOAuthSource(
        String clientId,
        String clientSecret,
        String redirectUri,
        String tokenUri,
        String userInfoUri
) {
}
