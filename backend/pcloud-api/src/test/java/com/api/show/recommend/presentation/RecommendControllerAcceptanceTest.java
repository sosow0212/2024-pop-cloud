package com.api.show.recommend.presentation;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class RecommendControllerAcceptanceTest extends RecommendControllerAcceptanceFixture {

    @Test
    void 팝업_혹은_전시회_생성() {
        // given
        팝업_생성();

        // when
        var 인기_팝업_조회_결과 = 인기_쇼케이스_조회_요청();

        // then
        인기_팝업_조회_검증(인기_팝업_조회_결과);
    }
}
