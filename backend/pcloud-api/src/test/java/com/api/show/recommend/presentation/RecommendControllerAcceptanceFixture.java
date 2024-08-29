package com.api.show.recommend.presentation;

import com.api.helper.AcceptanceBaseFixture;
import com.domain.show.popups.domain.Popups;
import com.domain.show.popups.domain.PopupsRepository;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;
import static show.popups.domain.PopupsFixture.일반_팝업_스토어_생성_펫샵_작성자아이디;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RecommendControllerAcceptanceFixture extends AcceptanceBaseFixture {

    @Autowired
    private PopupsRepository popupsRepository;

    protected Popups 팝업_생성() {
        return popupsRepository.save(일반_팝업_스토어_생성_펫샵_작성자아이디(관리자.getId()));
    }

    protected ExtractableResponse<Response> 인기_쇼케이스_조회_요청() {
        return RestAssured.given().log().all()
                .when()
                .param("startDate", "2000-01-01")
                .param("endDate", "2999-12-31")
                .param("limit", 1)
                .param("target", "all")
                .get("/recommends/popularity")
                .then().log().all()
                .extract();
    }

    protected void 인기_팝업_조회_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}
