package com.api.auth.application.oauth;

import com.domain.member.domain.Member;
import com.domain.member.domain.vo.OAuthPlatform;

public interface OAuthRequest {

    OAuthPlatform isSupported();

    String getOAuthAccessToken(String permittedOAuthCode);

    Member fetchMember(String oAuthAccessToken);
}
