package com.api.popups.presentation;

import com.api.popups.application.request.PopupsCreateRequest;
import com.api.popups.application.request.PopupsUpdateRequest;
import com.domain.domains.popups.domain.Popups;
import com.domain.domains.popups.domain.PopupsRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.apache.http.HttpHeaders;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static com.api.popups.fixture.request.PopupsRequestFixtures.팝업스토어_생성_요청;
import static com.api.popups.fixture.request.PopupsRequestFixtures.팝업스토어_업데이트_요청;
import static org.assertj.core.api.Assertions.assertThat;
import static popups.fixture.PopupsFixture.일반_팝업_스토어_생성_뷰티;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsControllerAcceptanceTest extends PopupsControllerAcceptanceFixture {

    @Autowired
    private PopupsRepository popupsRepository;

    @Test
    void 팝업스토어_생성() {
        // given
        PopupsCreateRequest request = 팝업스토어_생성_요청();

        // when
        ExtractableResponse<Response> response = RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 관리자_토큰)
                .contentType(ContentType.JSON)
                .body(request)
                .post("/popups")
                .then().log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
    }

    @Test
    void 팝업스토어_페이징_조회() {
        // given
        Popups savedPopups = popupsRepository.save(일반_팝업_스토어_생성_뷰티());

        // when
        ExtractableResponse<Response> response = RestAssured.given().log().all()
                .when()
                .get("/popups?pageSize=1")
                .then().log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void 팝업스토어_상세_조회() {
        // given
        Popups savedPopups = popupsRepository.save(일반_팝업_스토어_생성_뷰티());

        // when
        ExtractableResponse<Response> response = RestAssured.given().log().all()
                .when()
                .get("/popups/1")
                .then().log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    void 팝업스토어_업데이트() {
        // given
        Popups savedPopups = popupsRepository.save(일반_팝업_스토어_생성_뷰티());
        PopupsUpdateRequest updatedRequest = 팝업스토어_업데이트_요청();

        // when
        ExtractableResponse<Response> response = RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 일반_유저_토큰)
                .contentType(ContentType.JSON)
                .body(updatedRequest)
                .when()
                .patch("/popups/1")
                .then().log().all()
                .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
