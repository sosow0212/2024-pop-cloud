package com.api.auth.infrastructure.oauth.kakao;

import com.api.auth.application.oauth.OAuthRequest;
import com.api.auth.infrastructure.oauth.kakao.request.KakaoOAuthSource;
import com.api.auth.infrastructure.oauth.kakao.response.KakaoMemberSpecResponse;
import com.api.auth.infrastructure.oauth.kakao.response.KakaoToken;
import com.common.exception.AuthException;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.vo.OAuthPlatform;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import static com.common.exception.AuthExceptionType.REQUEST_FAIL_OF_OAUTH_ACCESS_TOKEN;
import static com.common.exception.AuthExceptionType.REQUEST_FAIL_OF_OAUTH_MEMBER_INFO;

@Slf4j
@RequiredArgsConstructor
@Component
public class KakaoOAuthRequestImpl implements OAuthRequest {

    private final RestTemplate restTemplate;
    private final KakaoOAuthSource oAuthSource;

    @Override
    public OAuthPlatform isSupported() {
        return OAuthPlatform.KAKAO;
    }

    @Override
    public String getOAuthAccessToken(final String permittedOAuthCode) {
        try {
            KakaoToken kakaoToken = restTemplate.exchange(
                    oAuthSource.tokenUri(),
                    HttpMethod.POST,
                    makeOAuthAccessTokenRequestEntity(permittedOAuthCode),
                    KakaoToken.class
            ).getBody();

            return kakaoToken.accessToken();
        } catch (final Exception e) {
            log.error("카카오 OAuth access-token 발급 실패 : {}", e.getMessage());
            throw new AuthException(REQUEST_FAIL_OF_OAUTH_ACCESS_TOKEN);
        }
    }

    private HttpEntity<MultiValueMap<String, String>> makeOAuthAccessTokenRequestEntity(final String permittedOAuthCode) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", oAuthSource.clientId());
        params.add("client_secret", oAuthSource.clientSecret());
        params.add("redirect_uri", oAuthSource.redirectUri());
        params.add("code", permittedOAuthCode);

        return new HttpEntity<>(params, httpHeaders);
    }

    @Override
    public Member fetchMember(final String oAuthAccessToken) {
        try {
            KakaoMemberSpecResponse response = restTemplate.exchange(
                    oAuthSource.userInfoUri(),
                    HttpMethod.POST,
                    makeOAuthMemberInfoRequestEntity(oAuthAccessToken),
                    KakaoMemberSpecResponse.class
            ).getBody();

            return Member.createWithOAuth(
                    String.valueOf(response.id()),
                    OAuthPlatform.KAKAO.getName(),
                    response.kakaoAccount().email()
            );
        } catch (Exception e) {
            log.error("카카오 OAuth 유저 정보 요청 실패 : {}", e.getMessage());
            throw new AuthException(REQUEST_FAIL_OF_OAUTH_MEMBER_INFO);
        }
    }

    private HttpEntity<Void> makeOAuthMemberInfoRequestEntity(final String oAuthAccessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(oAuthAccessToken);
        return new HttpEntity<>(headers);
    }
}
