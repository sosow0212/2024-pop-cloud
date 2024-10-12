package com.api.map.presentation;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MapControllerAcceptanceTest extends MapControllerAcceptanceFixture {

    @Test
    void 현재_위치_기준_주변_쇼케이스를_찾는다() {
        // given
        var 나의_위치_요청서 = 용마산_위치와_델타_생성서_요청();

        // when
        var 결과 = 주변_쇼케이스_위치_조회(나의_위치_요청서);

        // then
        결과_검증(결과);
    }

    @Test
    void 추천_경로를_반환한다() {
        // given
        var 요청 = 추천_경로_조회를_위한_요청_생성();

        // when
        var 결과 = 주변_쇼케이스_위치_조회(요청);

        // then
        결과_검증(결과);
    }
}
