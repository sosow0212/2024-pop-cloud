package com.api.auth.presentation;

import com.api.auth.application.AuthService;
import com.api.auth.application.request.OAuthProviderSource;
import com.api.auth.presentation.support.OAuthAuthority;
import com.api.member.presentation.response.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login/oauth/{platform}")
    public ResponseEntity<TokenResponse> loginWithOAuth(
            @RequestHeader(name = "OAuthPermittedCode") final String oAuthPermittedCode,
            @PathVariable final String platform,
            @OAuthAuthority final OAuthProviderSource oAuthProviderSource
    ) {
        String token = authService.loginWithOAuth(platform, oAuthPermittedCode, oAuthProviderSource);
        return ResponseEntity.ok(new TokenResponse(token));
    }
}
