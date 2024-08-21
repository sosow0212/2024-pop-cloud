package com.api.popups.presentation;

import com.api.helper.AcceptanceBaseFixture;
import com.api.popups.application.request.PopupsCreateRequest;
import com.api.popups.application.request.PopupsUpdateRequest;
import com.api.popups.fixture.request.PopupsRequestFixtures;
import com.api.popups.presentation.response.PopupLikedStatusResponse;
import com.domain.popups.domain.Popups;
import com.domain.popups.domain.PopupsRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.apache.http.HttpHeaders;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsControllerAcceptanceFixture extends AcceptanceBaseFixture {

    @Autowired
    protected PopupsRepository popupsRepository;

    protected PopupsCreateRequest 팝업스토어_생성_요청서() {
        return PopupsRequestFixtures.팝업스토어_생성_요청();
    }

    protected ExtractableResponse<Response> 팝업스토어_생성_요청(final PopupsCreateRequest request) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 관리자_토큰)
                .contentType(ContentType.JSON)
                .body(request)
                .post("/popups")
                .then().log().all()
                .extract();
    }

    protected void 생성_요청_결과_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }

    protected Popups 팝업_스토어_생성() {
        return popupsRepository.save(일반_팝업_스토어_생성_뷰티());
    }

    protected ExtractableResponse<Response> 팝업스토어_페이징_조회_요청() {
        return RestAssured.given().log().all()
                .when()
                .get("/popups?pageSize=1")
                .then().log().all()
                .extract();
    }

    protected void 페이징_조회_결과_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    protected ExtractableResponse<Response> 팝업스토어_업데이트_요청() {
        return RestAssured.given().log().all()
                .when()
                .get("/popups/1")
                .then().log().all()
                .extract();
    }

    protected void 팝업스토어_상세_조회_결과_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    protected PopupsUpdateRequest 팝업스토어_업데이트_요청서() {
        return PopupsRequestFixtures.팝업스토어_업데이트_요청();
    }

    protected ExtractableResponse<Response> 팝업스토어_업데이트_요청(final PopupsUpdateRequest updateRequest) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 일반_유저_토큰)
                .contentType(ContentType.JSON)
                .body(updateRequest)
                .when()
                .patch("/popups/1")
                .then().log().all()
                .extract();
    }

    protected void 팝업스토어_업데이트_결과_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    protected ExtractableResponse<Response> 팝업스토어_좋아요_요청() {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 일반_유저_토큰)
                .when()
                .post("/popups/1/likes")
                .then().log().all()
                .extract();
    }

    protected void 팝업스토어_좋아요_결과_검증(final ExtractableResponse<Response> response) {
        PopupLikedStatusResponse responseBody = response.as(PopupLikedStatusResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat(responseBody.popupsId()).isEqualTo(1L);
            softly.assertThat(responseBody.isStatusLiked()).isTrue();
        });
    }
}
