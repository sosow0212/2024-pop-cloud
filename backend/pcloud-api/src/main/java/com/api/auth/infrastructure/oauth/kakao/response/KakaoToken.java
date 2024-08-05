package com.api.auth.infrastructure.oauth.kakao.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record KakaoToken(
        String tokenType,
        String accessToken,
        String refreshToken,
        Integer expiresIn,
        String scope
) {
}
