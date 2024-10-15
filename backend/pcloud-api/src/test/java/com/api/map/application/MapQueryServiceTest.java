package com.api.map.application;

import com.api.map.application.request.MyCoordinateRequestWithDelta;
import com.api.map.application.request.ShowsCoordinateRequest;
import com.domain.map.domain.RouteSelector;
import com.domain.map.domain.service.PathFinder;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.util.List;

import static map.fixture.맵_응답_픽스처.쇼_주변_좌표_응답_픽스처.주변_좌표_응답_생성_용마산;
import static map.맵_요청_픽스처.내_위치와_델타_요청_픽스처.용마산_위치와_델타_생성;
import static map.맵_요청_픽스처.추천_경로_생성_픽스처.추천_경로_요청_생성;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@SuppressWarnings("NonAsciiCharacters")
class MapQueryServiceTest {

    private MapQueryService mapQueryService;

    @BeforeEach
    void setup() {
        MapRequester mapRequester = new FakeMapRequester();
        PathFinder pathFinder = new FakePathFinder();
        mapQueryService = new MapQueryService(mapRequester, pathFinder);
    }

    @Test
    void 현재_기준_주변_좌표를_찾는다() {
        // given
        MyCoordinateRequestWithDelta myPosition = 용마산_위치와_델타_생성();

        // when
        List<ShowsCoordinateSimpleResponse> response = mapQueryService.findShowsAroundLocation(myPosition);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response).hasSize(1);
            softly.assertThat(response.get(0))
                    .usingRecursiveComparison()
                    .isEqualTo(주변_좌표_응답_생성_용마산());
        });
    }

    @Test
    void 현재_위치_기준으로_추천_경로를_찾는다() {
        // given
        ShowsCoordinateRequest request = 추천_경로_요청_생성();

        // when
        RouteSelector response = mapQueryService.findShowsByRouteRecommendation(request);

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.getShowIdentifiers().getShowIdentifiers()).hasSize(1);
            softly.assertThat(response.getShowIdentifiers().getShowIdentifiers().get(0).getTitle()).isEqualTo("용마산");
        });
     }
}
