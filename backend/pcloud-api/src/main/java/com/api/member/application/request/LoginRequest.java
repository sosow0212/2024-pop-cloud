package com.api.member.application.request;

public record LoginRequest(
        String email,
        String password
) {
}
