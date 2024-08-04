package com.api.auth.application;

import com.api.auth.application.request.OAuthProviderSource;
import com.domain.domains.member.domain.Member;

public interface OAuthRequester {

    String getAccessToken(String code, OAuthProviderSource provider);

    Member fetchMember(String accessToken, OAuthProviderSource oAuthProviderSource);
}
