package com.api.member.presentation;

import com.api.helper.IntegrationHelper;
import com.api.member.application.request.LoginRequest;
import com.api.member.application.request.SignupRequest;
import com.api.member.presentation.response.TokenResponse;
import com.domain.domains.member.domain.Member;
import com.domain.domains.member.domain.MemberRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import org.springframework.beans.factory.annotation.Autowired;

import static member.fixture.MemberFixture.일반_멤버_생성_id_없음;
import static org.assertj.core.api.Assertions.assertThat;

class MemberControllerAcceptanceFixture extends IntegrationHelper {

    protected static final String 회원가입_url = "/members/signup";
    protected static final String 로그인_url = "/members/login";

    @Autowired
    private MemberRepository memberRepository;

    protected SignupRequest 회원_가입_데이터를_요청한다() {
        return new SignupRequest("email", "password");
    }

    protected Member 회원_생성() {
        return memberRepository.save(일반_멤버_생성_id_없음());
    }

    protected <T> ExtractableResponse 요청한다(final T request, final String url) {
        return RestAssured.given().log().all()
                .body(request)
                .contentType(ContentType.JSON)
                .when()
                .post(url)
                .then().log().all()
                .extract();
    }

    protected void 토큰_생성_검증(final ExtractableResponse actual) {
        var result = actual.as(TokenResponse.class);
        assertThat(result.accessToken()).isNotBlank();
    }

    protected LoginRequest 로그인_데이터를_요청한다(final Member member) {
        return new LoginRequest(member.getEmail(), member.getPassword());
    }
}
