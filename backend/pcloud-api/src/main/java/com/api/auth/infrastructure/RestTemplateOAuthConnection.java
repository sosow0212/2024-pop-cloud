package com.api.auth.infrastructure;

import com.api.auth.application.OAuthConnectionManager;
import com.api.auth.application.request.OAuthProviderSource;
import com.api.auth.infrastructure.response.KakaoMemberResponse;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.vo.OAuthPlatform;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component
public class RestTemplateOAuthConnection implements OAuthConnectionManager {

    private final RestTemplate restTemplate;

    @Override
    public String getAccessTokenResponse(final OAuthProviderSource oAuthProviderSource, final String code) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String decode = URLDecoder.decode(code, StandardCharsets.UTF_8);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", oAuthProviderSource.clientId());
        params.add("client_secret", oAuthProviderSource.clientSecret());
        params.add("redirect_uri", oAuthProviderSource.redirectUri());
        params.add("code", decode);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, httpHeaders);
        return restTemplate.postForObject(oAuthProviderSource.tokenUri(), requestEntity, String.class);
    }

    @Override
    public Member fetchMember(final String accessToken, final String userInfoUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        // TODO: 아이디도 받게
        ResponseEntity<KakaoMemberResponse> preResult = restTemplate.exchange(
                userInfoUrl,
                HttpMethod.POST,
                requestEntity,
                KakaoMemberResponse.class
        );

        KakaoMemberResponse response = preResult.getBody();

        return Member.createWithOAuth(
                String.valueOf(response.id()),
                OAuthPlatform.KAKAO.getName(),
                response.kakaoAccount().email()
        );
    }
}
