package com.api.map.application;

import com.domain.map.domain.CoordinateRange;
import com.domain.map.dto.ShowsCoordinateSimpleResponse;

import java.util.List;

import static map.fixture.맵_응답_픽스처.쇼_주변_좌표_응답_픽스처.주변_좌표_응답_생성_용마산;

public class FakeMapRequester implements MapRequester {

    @Override
    public List<ShowsCoordinateSimpleResponse> findShowsAroundLocation(final CoordinateRange coordinateRange) {
        return List.of(
                주변_좌표_응답_생성_용마산()
        );
    }
}
