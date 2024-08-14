package com.api.auth.application;

import auth.FakeTokenProvider;
import com.api.auth.application.oauth.OAuthManager;
import com.common.auth.TokenProvider;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import com.domain.domains.member.domain.vo.OAuthPlatform;
import com.domain.domains.member.domain.vo.OauthId;
import member.FakeMemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static member.fixture.MemberFixture.일반_멤버_생성_id_없음_kakao_oauth_가입;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class AuthServiceTest {

    private AuthService authService;
    private MemberRepository memberRepository;
    private TokenProvider tokenProvider;
    private OAuthManager oAuthManager;

    @BeforeEach
    void setup() {
        memberRepository = new FakeMemberRepository();
        tokenProvider = new FakeTokenProvider();
        oAuthManager = mock(OAuthManager.class);
        authService = new AuthService(memberRepository, tokenProvider, oAuthManager);
    }

    @Test
    void oauth_로그인_및_회원가입을_진행한다() {
        // given
        Member member = 일반_멤버_생성_id_없음_kakao_oauth_가입();
        OAuthPlatform platform = OAuthPlatform.KAKAO;
        String oAuthPermittedCode = "permitted_code";
        String oAuthAccessToken = "accessToken";

        when(oAuthManager.getAccessToken(platform, oAuthPermittedCode))
                .thenReturn(oAuthAccessToken);

        when(oAuthManager.fetchMember(platform, oAuthAccessToken))
                .thenReturn(member);

        // when
        String token = authService.loginWithOAuth(platform, oAuthPermittedCode);

        // then
        Optional<Member> savedMember = memberRepository.findByOauthId(new OauthId("1", "KAKAO"));
        assertSoftly(softly -> {
            softly.assertThat(token).isEqualTo("token");
            softly.assertThat(savedMember).isPresent();
            softly.assertThat(savedMember.get().getId()).isNotNull();
            softly.assertThat(savedMember.get().getOauthId().getOauthId()).isEqualTo("1");
        });
    }
}
