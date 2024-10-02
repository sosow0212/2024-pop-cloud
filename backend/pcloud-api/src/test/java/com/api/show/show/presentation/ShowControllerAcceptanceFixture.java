package com.api.show.show.presentation;

import com.api.helper.AcceptanceBaseFixture;
import com.domain.show.exhibition.domain.Exhibition;
import com.domain.show.exhibition.domain.ExhibitionRepository;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;
import static show.exhibition.domain.ExhibitionFixture.개인전시회_생성_사진_개인전_작성자아이디;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
public class ShowControllerAcceptanceFixture extends AcceptanceBaseFixture {

    @Autowired
    private ExhibitionRepository exhibitionRepository;

    protected Exhibition 개인전시회_생성() {
        return exhibitionRepository.save(개인전시회_생성_사진_개인전_작성자아이디(관리자.getId()));
    }

    protected ExtractableResponse<Response> 페이징_조회_요청() {
        return RestAssured.given().log().all()
                .when()
                .get("/shows?pageSize=1&showType=exhibition")
                .then().log().all()
                .extract();
    }

    protected void 페이징_조회_요청_검증(final ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }
}
