package com.api.auth.infrastructure.response;

import jakarta.validation.constraints.NotBlank;

public record MemberOAuthFieldsResponse(
        @NotBlank(message = "이메일 정보가 비었습니다.")
        String email,

        @NotBlank(message = "닉네임 정보가 비었습니다.")
        String name
) {
}
