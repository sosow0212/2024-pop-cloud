package com.api.member.presentation;

import com.api.member.application.MemberService;
import com.api.member.application.request.LoginRequest;
import com.api.member.application.request.SignupRequest;
import com.api.member.presentation.response.TokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<TokenResponse> signup(@RequestBody final SignupRequest signupRequest) {
        String token = memberService.signup(signupRequest);
        return ResponseEntity.ok(new TokenResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody final LoginRequest loginRequest) {
        String token = memberService.login(loginRequest);
        return ResponseEntity.ok(new TokenResponse(token));
    }
}
