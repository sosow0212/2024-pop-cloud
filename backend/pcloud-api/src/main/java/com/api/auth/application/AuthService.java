package com.api.auth.application;

import com.api.auth.application.oauth.OAuthManager;
import com.common.auth.TokenProvider;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import com.domain.domains.member.domain.vo.OAuthPlatform;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final OAuthManager oAuthManager;

    @Transactional
    public String loginWithOAuth(final OAuthPlatform platform, final String oAuthPermittedCode) {
        String oAuthAccessToken = oAuthManager.getAccessToken(platform, oAuthPermittedCode);
        Member member = oAuthManager.fetchMember(platform, oAuthAccessToken);

        Long memberId = memberRepository.findByOauthId(member.getOauthId())
                .orElseGet(() -> signup(member))
                .getId();

        return tokenProvider.create(memberId);
    }

    private Member signup(final Member member) {
        return memberRepository.save(member);
    }
}
