package com.api.auth.application.request;

import jakarta.validation.constraints.NotBlank;

public record OAuthLoginRequest(
        @NotBlank(message = "인증 서버가 정해지지 않았습니다.")
        String platform,

        @NotBlank(message = "인증 코드가 비었습니다.")
        String code
) {
}
