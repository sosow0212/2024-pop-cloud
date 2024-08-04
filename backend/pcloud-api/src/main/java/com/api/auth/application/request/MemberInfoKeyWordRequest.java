package com.api.auth.application.request;

public record MemberInfoKeyWordRequest(
        String emailKeyWord,
        String nicknameKeyWord
) {
}
