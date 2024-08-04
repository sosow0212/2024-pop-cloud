package com.api.auth.application;

import com.api.auth.application.request.OAuthProviderSource;
import com.common.auth.TokenProvider;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final OAuthRequester oAuthRequester;

    @Transactional
    public String loginWithOAuth(
            final String platform,
            final String oAuthPermittedCode,
            final OAuthProviderSource provider
    ) {
        String oAuthAccessToken = oAuthRequester.getAccessToken(oAuthPermittedCode, provider);
        Member member = oAuthRequester.fetchMember(oAuthAccessToken, provider);

        Long memberId = memberRepository.findByOauthId(member.getOauthId())
                .orElseGet(() -> signup(member))
                .getId();

        return tokenProvider.create(memberId);
    }

    private Member signup(final Member member) {
        return memberRepository.save(member);
    }
}
