package com.api.auth.application.oauth;

import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.vo.OAuthPlatform;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Set;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.toMap;

@Component
public class OAuthManager {

    private final Map<OAuthPlatform, OAuthRequest> manager;

    public OAuthManager(final Set<OAuthRequest> requesters) {
        this.manager = requesters.stream()
                .collect(toMap(OAuthRequest::isSupported, identity()));
    }

    public String getAccessToken(final OAuthPlatform platform, final String permittedOAuthCode) {
        return manager.get(platform)
                .getOAuthAccessToken(permittedOAuthCode);
    }

    public Member fetchMember(final OAuthPlatform platform, final String oAuthAccessToken) {
        return manager.get(platform)
                .fetchMember(oAuthAccessToken);
    }
}
