package com.api.auth.infrastructure.oauth.kakao;

import com.api.auth.infrastructure.oauth.kakao.request.KakaoOAuthPropertySource;
import com.api.auth.infrastructure.oauth.kakao.response.KakaoMemberSpecResponse;
import com.api.auth.infrastructure.oauth.kakao.response.KakaoToken;
import com.common.exception.AuthException;
import com.common.exception.AuthExceptionType;
import com.domain.member.domain.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class KakaoOAuthRequestImplTest {

    private RestTemplate restTemplate;
    private KakaoOAuthPropertySource kakaoOAuthPropertySource;
    private KakaoOAuthRequestImpl kakaoOAuthRequest;

    @BeforeEach
    void setup() {
        restTemplate = mock(RestTemplate.class);
        kakaoOAuthPropertySource = mock(KakaoOAuthPropertySource.class);
        kakaoOAuthRequest = new KakaoOAuthRequestImpl(restTemplate, kakaoOAuthPropertySource);
    }

    @Nested
    class OAuth_인증_토큰_받아오기 {

        @Test
        void 정상적인_응답의_경우_토큰을_받아온다() {
            // given
            KakaoToken kakaoToken = new KakaoToken("type", "access", "refresh", 10, "scope");
            when(kakaoOAuthPropertySource.tokenUri()).thenReturn("tokenUri");

            when(restTemplate.exchange(
                    any(String.class),
                    any(HttpMethod.class),
                    any(HttpEntity.class),
                    any(Class.class)
            )).thenReturn(ResponseEntity.ok(kakaoToken));

            // when
            String accessToken = kakaoOAuthRequest.getOAuthAccessToken("test-code");

            // then
            assertThat(accessToken).isEqualTo(kakaoToken.accessToken());
        }

        @Test
        void 결과가_정상이_아니면_예외를_발생한다() {
            // given
            when(kakaoOAuthPropertySource.tokenUri()).thenReturn("tokenUri");

            when(restTemplate.exchange(
                    any(String.class),
                    any(HttpMethod.class),
                    any(HttpEntity.class),
                    any(Class.class)
            )).thenReturn(ResponseEntity.badRequest().build());

            // when & then
            assertThatThrownBy(() -> kakaoOAuthRequest.getOAuthAccessToken("test-code"))
                    .isInstanceOf(AuthException.class)
                    .hasMessageContaining(AuthExceptionType.REQUEST_FAIL_OF_OAUTH_ACCESS_TOKEN.message());
        }
    }

    @Nested
    class 인증토큰으로_유저_정보_받아오기 {

        @Test
        void 정상인_경우_유저의_정보를_성공적으로_받아온다() {
            // given
            KakaoMemberSpecResponse memberResponse = new KakaoMemberSpecResponse(1L, false, null, mock(KakaoMemberSpecResponse.KakaoAccount.class));
            when(kakaoOAuthPropertySource.userInfoUri()).thenReturn("tokenUri");

            when(restTemplate.exchange(
                    any(String.class),
                    any(HttpMethod.class),
                    any(HttpEntity.class),
                    any(Class.class)
            )).thenReturn(ResponseEntity.ok(memberResponse));

            // when
            Member member = kakaoOAuthRequest.fetchMember("test-access-token");

            // then
            assertThat(member.getOauthId().getOauthId()).isEqualTo("1");
        }

        @Test
        void 응답이_비정상적으로_넘어온_경우_예외를_발생시킨다() {
            when(kakaoOAuthPropertySource.userInfoUri()).thenReturn("tokenUri");

            when(restTemplate.exchange(
                    any(String.class),
                    any(HttpMethod.class),
                    any(HttpEntity.class),
                    any(Class.class)
            )).thenReturn(ResponseEntity.badRequest().build());

            // when & then
            assertThatThrownBy(() -> kakaoOAuthRequest.fetchMember("test-access-token"))
                    .isInstanceOf(AuthException.class)
                    .hasMessageContaining(AuthExceptionType.REQUEST_FAIL_OF_OAUTH_MEMBER_INFO.name());
        }
    }
}
