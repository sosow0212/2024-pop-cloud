package com.api.auth.infrastructure;

import com.api.auth.application.JsonMapper;
import com.api.auth.application.OAuthConnectionManager;
import com.api.auth.application.OAuthRequester;
import com.api.auth.application.request.OAuthProviderSource;
import com.domain.domains.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OAuthRequesterImpl implements OAuthRequester {

    private static final String KEY = "access_token";

    private final OAuthConnectionManager oAuthConnectionManager;
    private final JsonMapper jsonMapper;

    @Override
    public String getAccessToken(final String code, final OAuthProviderSource provider) {
        String accessTokenResponse = oAuthConnectionManager.getAccessTokenResponse(provider, code);
        return jsonMapper.getValueByKey(accessTokenResponse, KEY);
    }

    @Override
    public Member fetchMember(final String accessToken, final OAuthProviderSource oAuthProviderSource) {
        return oAuthConnectionManager.fetchMember(accessToken, oAuthProviderSource.userInfoUri());
    }
}
