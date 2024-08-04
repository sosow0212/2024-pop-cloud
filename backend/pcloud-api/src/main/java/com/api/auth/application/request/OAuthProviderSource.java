package com.api.auth.application.request;

public record OAuthProviderSource(
        String clientId,
        String clientSecret,
        String redirectUri,
        String tokenUri,
        String userInfoUri,
        MemberInfoKeyWordRequest memberInfoKeyWordRequest
) {
}
