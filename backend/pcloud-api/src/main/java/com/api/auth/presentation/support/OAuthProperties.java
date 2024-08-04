package com.api.auth.presentation.support;

import com.api.auth.application.request.OAuthProviderSource;
import com.domain.domains.member.domain.vo.OAuthPlatform;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.Map;

@Getter
@AllArgsConstructor
@ConfigurationProperties(prefix = "oauth2")
public class OAuthProperties {

    private final Map<OAuthPlatform, OAuthProviderSource> properties;

    public OAuthProviderSource findByProviderName(final String name) {
        return properties.get(OAuthPlatform.findPlatform(name));
    }
}
