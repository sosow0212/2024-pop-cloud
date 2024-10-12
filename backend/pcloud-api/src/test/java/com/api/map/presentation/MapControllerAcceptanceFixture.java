package com.api.map.presentation;

import com.api.helper.AcceptanceBaseFixture;
import com.api.map.application.request.MyCoordinateRequestWithDelta;
import com.api.map.application.request.ShowsCoordinateRequest;
import com.domain.map.domain.vo.RecommendType;
import com.domain.show.popups.infrastructure.PopupsJpaRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import show.popups.domain.PopupsFixture;

import java.util.List;

import static map.맵_요청_픽스처.내_위치와_델타_요청_픽스처.용마산_위치와_델타_생성;
import static map.맵_요청_픽스처.추천_경로_생성_픽스처.나의_위치_요청_생성;
import static map.맵_요청_픽스처.추천_경로_생성_픽스처.주변_쇼의_위치_생성;
import static org.assertj.core.api.Assertions.assertThat;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MapControllerAcceptanceFixture extends AcceptanceBaseFixture {

    @Autowired
    private PopupsJpaRepository popupsJpaRepository;

    protected MyCoordinateRequestWithDelta 용마산_위치와_델타_생성서_요청() {
        popupsJpaRepository.save(PopupsFixture.용마산_팝업_스토어_생성_펫샵_작성자아이디(관리자.getId()));
        return 용마산_위치와_델타_생성();
    }

    protected ExtractableResponse<Response> 주변_쇼케이스_위치_조회(final MyCoordinateRequestWithDelta myCoordinate) {
        return RestAssured.given().log().all()
                .param("latitude", myCoordinate.latitude())
                .param("longitude", myCoordinate.longitude())
                .param("latitudeDelta", myCoordinate.latitudeDelta())
                .param("longitudeDelta", myCoordinate.longitude())
                .when()
                .get("/maps/recommendation-location")
                .then().log().all()
                .extract();
    }

    protected void 결과_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    protected ShowsCoordinateRequest 추천_경로_조회를_위한_요청_생성() {
        return new ShowsCoordinateRequest(
                RecommendType.POPULAR.getName(),
                나의_위치_요청_생성(),
                List.of(주변_쇼의_위치_생성())
        );
    }

    protected ExtractableResponse<Response> 주변_쇼케이스_위치_조회(final ShowsCoordinateRequest request) {
        return RestAssured.given().log().all()
                .body(request)
                .contentType(ContentType.JSON)
                .when()
                .get("/maps/recommendation-route")
                .then().log().all()
                .extract();
    }
}
