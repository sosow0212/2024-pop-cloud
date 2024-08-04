package com.api.auth.application;

import com.api.auth.application.request.OAuthProviderSource;
import com.domain.domains.member.domain.Member;

public interface OAuthConnectionManager {

    String getAccessTokenResponse(OAuthProviderSource oAuthProviderSource, String code);

    Member fetchMember(String accessToken, String userInfoUrl);
}
