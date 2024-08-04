package com.api.auth.application.oauth;

import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.vo.OAuthPlatform;

public interface OAuthRequest {

    OAuthPlatform isSupported();

    String getOAuthAccessToken(String permittedOAuthCode);

    Member fetchMember(String oAuthAccessToken);
}
