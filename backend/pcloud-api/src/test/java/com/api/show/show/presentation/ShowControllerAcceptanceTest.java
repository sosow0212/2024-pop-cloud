package com.api.show.show.presentation;

import org.junit.jupiter.api.Test;

class ShowControllerAcceptanceTest extends ShowControllerAcceptanceFixture {

    @Test
    void show_페이징_조회한다() {
        // given
        개인전시회_생성();

        // when
        var 개인전시회_페이징_조회_요청_결과 = 페이징_조회_요청();

        // then
        페이징_조회_요청_검증(개인전시회_페이징_조회_요청_결과);
    }
}
