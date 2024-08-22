package com.domain.member.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class OauthId {

    @Column(nullable = true, name = "oauth_id")
    private String oauthId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true, name = "oauth_platform")
    private OAuthPlatform oAuthPlatform;

    public OauthId(final String oauthId, final String oauthPlatform) {
        this.oauthId = oauthId;
        this.oAuthPlatform = OAuthPlatform.findPlatform(oauthPlatform);
    }
}
