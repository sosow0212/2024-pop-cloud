package com.api.member.application.request;

public record SignupRequest(
        String email,
        String password
) {
}
