package com.api.show.exhibition.presentation;

import com.api.helper.AcceptanceBaseFixture;
import com.api.show.exhibition.application.dto.ExhibitionCreateRequest;
import com.api.show.exhibition.application.dto.ExhibitionUpdateRequest;
import com.api.show.exhibition.presentation.dto.ExhibitionLikedStatusResponse;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.apache.http.HttpHeaders;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전_작성자아이디;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ExhibitionControllerAcceptanceTestFixture extends AcceptanceBaseFixture {

    @Autowired
    protected ExhibitionRepository exhibitionRepository;

    protected ExtractableResponse<Response> 개인전시회_생성_요청(final ExhibitionCreateRequest request) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 관리자_토큰)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post("/exhibitions")
                .then().log().all()
                .extract();
    }

    protected void 개인전시회_생성_요청_검증(final ExtractableResponse<Response> response) {
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
            softly.assertThat(response.header("Location")).isNotBlank();
        });
    }

    protected Exhibition 개인전시회_생성() {
        return exhibitionRepository.save(개인전시회_생성_사진_개인전_작성자아이디(관리자.getId()));
    }

    protected ExtractableResponse<Response> 개인전시회_상세_조회_요청() {
        return RestAssured.given().log().all()
                .when()
                .get("/exhibitions/1")
                .then().log().all()
                .extract();
    }

    protected void 개인전시회_상세_조회_요청_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    protected ExtractableResponse<Response> 개인전시회_업데이트_요청(final ExhibitionUpdateRequest request) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 관리자_토큰)
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .patch("/exhibitions/1")
                .then().log().all()
                .extract();
    }

    protected void 개인전시회_업데이트_요청_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    protected ExtractableResponse<Response> 개인전시회_삭제_요청() {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 관리자_토큰)
                .when()
                .delete("/exhibitions/1")
                .then().log().all()
                .extract();
    }

    protected void 개인전시회_삭제_요청_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    protected ExtractableResponse<Response> 개인전시회_좋아요_처리_요청() {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + 관리자_토큰)
                .when()
                .post("/exhibitions/1/likes")
                .then().log().all()
                .extract();
    }

    protected void 개인전시회_좋아요_처리_요청_검증(final ExtractableResponse<Response> response) {
        ExhibitionLikedStatusResponse exhibitionLikedStatusResponse = response.as(ExhibitionLikedStatusResponse.class);
        assertSoftly(softly -> {
            softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
            softly.assertThat(exhibitionLikedStatusResponse.exhibitionId()).isEqualTo(1L);
            softly.assertThat(exhibitionLikedStatusResponse.isStatusLiked()).isTrue();
        });
    }
}
