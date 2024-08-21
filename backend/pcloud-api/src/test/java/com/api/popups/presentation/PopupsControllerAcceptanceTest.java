package com.api.popups.presentation;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class PopupsControllerAcceptanceTest extends PopupsControllerAcceptanceFixture {

    @Test
    void 팝업스토어_생성() {
        // given
        var 요청서 = 팝업스토어_생성_요청서();

        // when
        var 생성_요청_결과 = 팝업스토어_생성_요청(요청서);

        // then
        생성_요청_결과_검증(생성_요청_결과);
    }

    @Test
    void 팝업스토어_페이징_조회() {
        // given
        팝업_스토어_생성();

        // when
        var 요청_결과 = 팝업스토어_페이징_조회_요청();

        // then
        페이징_조회_결과_검증(요청_결과);
    }

    @Test
    void 팝업스토어_상세_조회() {
        // given
        팝업_스토어_생성();

        // when
        var 요청_결과 = 팝업스토어_업데이트_요청();

        // then
        팝업스토어_상세_조회_결과_검증(요청_결과);
    }

    @Test
    void 팝업스토어_업데이트() {
        // given
        팝업_스토어_생성();
        var 업데이트_요청서 = 팝업스토어_업데이트_요청서();

        // when
        var 요청_결과 = 팝업스토어_업데이트_요청(업데이트_요청서);

        // then
        팝업스토어_업데이트_결과_검증(요청_결과);
    }

    @Test
    void 팝업스토어_좋아요_처리() {
        // given
        팝업_스토어_생성();

        // when
        var 요청_결과 = 팝업스토어_좋아요_요청();

        // then
        팝업스토어_좋아요_결과_검증(요청_결과);
    }
}
