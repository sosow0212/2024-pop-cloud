package com.api.auth.presentation;

import com.api.auth.application.AuthService;
import com.api.auth.infrastructure.oauth.kakao.request.KakaoOAuthSource;
import com.api.member.presentation.response.TokenResponse;
import com.domain.domains.member.domain.vo.OAuthPlatform;
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
    private final KakaoOAuthSource oAuthSource;

    @PostMapping("/login/oauth/{platform}")
    public ResponseEntity<TokenResponse> loginWithOAuth(
            @RequestHeader(name = "OAuthPermittedCode") final String oAuthPermittedCode,
            @PathVariable final OAuthPlatform platform
    ) {
        String token = authService.loginWithOAuth(platform, oAuthPermittedCode);
        return ResponseEntity.ok(new TokenResponse(token));
    }
}
