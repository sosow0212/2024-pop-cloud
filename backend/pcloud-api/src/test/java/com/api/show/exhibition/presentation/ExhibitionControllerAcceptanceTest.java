package com.api.show.exhibition.presentation;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

import static com.api.show.exhibition.fixture.ExhibitionRequestFixtures.개인전시회_생성_요청_생성;
import static com.api.show.exhibition.fixture.ExhibitionRequestFixtures.개인전시회_업데이트_요청_생성;

@DisplayNameGeneration(ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class ExhibitionControllerAcceptanceTest extends ExhibitionControllerAcceptanceTestFixture {

    @Test
    void 개인전시회를_생성한다() {
        // given
        var 개인전시회_생성_요청서 = 개인전시회_생성_요청_생성();

        // when
        var 개인전시회_생성_요청_결과 = 개인전시회_생성_요청(개인전시회_생성_요청서);

        // then
        개인전시회_생성_요청_검증(개인전시회_생성_요청_결과);
    }

    @Test
    void 개인전시회_상세_조회한다() {
        // given
        개인전시회_생성();

        // when
        var 개인전시회_상세_조회_요청_결과 = 개인전시회_상세_조회_요청();

        // then
        개인전시회_상세_조회_요청_검증(개인전시회_상세_조회_요청_결과);
    }

    @Test
    void 개인전시회를_업데이트한다() {
        // given
        개인전시회_생성();
        var 개인전시회_업데이트_요청서 = 개인전시회_업데이트_요청_생성();

        // when
        var 개인전시회_업데이트_요청_결과 = 개인전시회_업데이트_요청(개인전시회_업데이트_요청서);

        // then
        개인전시회_업데이트_요청_검증(개인전시회_업데이트_요청_결과);
    }

    @Test
    void 개인전시회를_삭제한다() {
        // given
        개인전시회_생성();

        // when
        var 개인전시회_삭제_요청_결과 = 개인전시회_삭제_요청();

        // then
        개인전시회_삭제_요청_검증(개인전시회_삭제_요청_결과);
    }

    @Test
    void 개인전시회_좋아요를_처리한다() {
        // given
        개인전시회_생성();
        
        // when 
        var 개인전시회_좋아요_처리_요청_결과 = 개인전시회_좋아요_처리_요청();
        
        // then
        개인전시회_좋아요_처리_요청_검증(개인전시회_좋아요_처리_요청_결과);
    }
}
